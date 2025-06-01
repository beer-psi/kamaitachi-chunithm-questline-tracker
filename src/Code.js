// SPDX-License-Identifier: MIT
/**
 * Kamaitachi Questline Tracker
 * 
 * Created by beerpsi on 2025-05-27
 * Changelog:
 * - 2025-05-28: Fixed the conditions for 99AJ goals
 * 
 * Licensed under the MIT license. You can use this as a base for another questline tracker,
 * but please credit me (putting just a note in the script is okay).
 * 
 * You can now contribute to the code by making a pull request on GitHub at
 *     https://github.com/beer-psi/kamaitachi-chunithm-questline-tracker
 * 
 * For future maintainers (could just be me), functions that start with _ should not be run directly.
 */
const CURRENT_CHUNITHM_VERSION = "verse";

/**
 * Gets a key from the given object. It accepts deep traversal using dot notation
 * (e.g. "parent.child")
 */
function _getValue(obj, key) {
    const path = key.split(".");
    let value = obj;

    for (const p of path) {
        if (value && typeof value === "object" && p in value) {
            value = value[p];
        } else {
            return undefined;
        }
    }

    return value;
}

/**
 * Convert task tracks from the spreadsheet into goal objects.
 * This doesn't convert into actual goal objects, but something very close, for later postprocessing:
 * - Replace /"title": "(.+?)",/ with "// $1"
 * - Unquote value enums (e.g. `"GRADES.SSS"` -> `GRADES.SSS`)
 * 
 * The JSONs are outputted into the "For tluo" sheet, just because.
 */
function calculateChartGoals() {
    const MANUAL_TITLE_MAPPING = {
        "少女幻葬戦慄曲 ～ Necro Fantasia": "少女幻葬戦慄曲　～　Necro Fantasia",
        "札付きのワル ～マイケルのうた～": "札付きのワル　～マイケルのうた～",
        "ÅMARA(大未来電脳)": "ÅMARA (大未来電脳)",
    };

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    const songsResp = UrlFetchApp.fetch("https://raw.githubusercontent.com/zkrising/Tachi/main/seeds/collections/songs-chunithm.json");
    const songs = JSON.parse(songsResp.getContentText());
    const songsByTitle = new Map(songs.map((s) => [s.title, s]));

    const chartsResp = UrlFetchApp.fetch("https://raw.githubusercontent.com/zkrising/Tachi/main/seeds/collections/charts-chunithm.json");
    const charts = JSON.parse(chartsResp.getContentText());
    const chartsBySongDifficulty = new Map(charts.map((c) => [`${c.songID}-${c.difficulty}`, c]));

    const questlineChartGoals = [];

    for (const questline of QUESTLINES) {
        const goals = [];

        if (questline.sheet === "Purple" || questline.sheet === "Bronze" || questline.sheet === "Endgame") {
            // These questlines do not have chart goals
            continue;
        }

        const sheet = spreadsheet.getSheetByName(questline.sheet);

        if (sheet === null) {
            Logger.log(`Missing sheet for ${questline.sheet}`);
            continue;
        }

        // Rainbow questlines have overpower goals, so that shifts the starting row down a bit
        const startingRow = questline.sheet.includes("Rainbow") ? 30 : 24;

        for (const checkboxColumn of ["F", "K", "P", "U", "AA"]) {
            for (let i = startingRow; ; i += 2) {
                const checkboxRange = sheet.getRange(`${checkboxColumn}${i}`);

                if (checkboxRange === null) {
                    break;
                }

                const hasCheckbox = checkboxRange
                    .getDataValidations()
                    .every((r) =>
                        r.every((c) =>
                            c && c.getCriteriaType() === SpreadsheetApp.DataValidationCriteria.CHECKBOX
                        )
                    );

                if (!hasCheckbox) {
                    break;
                }

                const songTitleColumn = checkboxColumn === "AA" ? "X" : String.fromCharCode(checkboxColumn.charCodeAt(0) - 3);
                const songTitleRange = sheet.getRange(`${songTitleColumn}${i - 1}:${checkboxColumn}${i - 1}`);
                let songTitle = songTitleRange.getValue().toString().replace("\n", " ").trim();

                if (MANUAL_TITLE_MAPPING[songTitle]) {
                    songTitle = MANUAL_TITLE_MAPPING[songTitle];
                }

                let difficulty = "MASTER";

                if (songTitle.endsWith(" [ULT]")) {
                    difficulty = "ULTIMA";
                    songTitle = songTitle.substring(0, songTitle.length - 6);
                } else if (songTitle.endsWith(" [EXP]")) {
                    difficulty = "EXPERT";
                    songTitle = songTitle.substring(0, songTitle.length - 6);
                } else if (songTitle.endsWith(" [ADV]")) {
                    difficulty = "ADVANCED";
                    songTitle = songTitle.substring(0, songTitle.length - 6);
                }

                const tachiSong = songsByTitle.get(songTitle);

                if (!tachiSong) {
                    console.warn(`Could not get Tachi song for ${songTitle}.`);
                    continue;
                }

                const tachiChart = chartsBySongDifficulty.get(`${tachiSong.id}-${difficulty}`);

                if (!tachiChart) {
                    console.warn(`Could not get Tachi chart for ${songTitle} [${difficulty}].`);
                    continue;
                }

                const goal = {
                    // we don't actually use the title but this is for postprocessing
                    // i.e. transforming the title into a comment, similar to the large
                    // QUESTLINE object above.
                    "title": `${tachiSong.title} [${tachiChart.difficulty}]`,
                    "cell": checkboxRange.getA1Notation(),
                    "charts": {
                        "chartID": tachiChart.chartID,
                    },
                    "criteria": {
                        "mode": "absolute",
                        "countNum": 1,
                    }
                };

                if (checkboxColumn === "AA") {
                    goal.criteria.key = "scoreData.enumIndexes.clearLamp";
                    goal.criteria.value = "CLEAR_LAMPS.CLEAR";
                } else {
                    goal.criteria.key = "scoreData.enumIndexes.grade";
                    goal.criteria.value = "GRADES.SSS";
                }

                goals.push(goal);
            }
        }

        questlineChartGoals.push({ sheet: questline.sheet, goals: goals });
    }

    let row = 40;
    const batchWriteRequest = {
        valueInputOption: "USER_ENTERED",
        data: [],
    }
    for (const item of questlineChartGoals) {
        const data = JSON.stringify(item.goals, null, 4);

        batchWriteRequest.data.push({
            range: `For tluo!A${row}:B${row}`,
            majorDimension: "ROWS",
            values: [[item.sheet, data.substring(1, data.length - 1)]],
        });
        row++;
    }

    Sheets.Spreadsheets.Values.batchUpdate(
        batchWriteRequest,
        spreadsheet.getId(),
    );
}

/**
 * Clear all goal checkmarks.
 */
function clearGoals() {
    const batchWriteRequest = {
        valueInputOption: "USER_ENTERED",
        data: [],
    };

    for (const questline of QUESTLINES) {
        for (const goal of questline.goals) {
            batchWriteRequest.data.push({
                range: `${questline.sheet}!${goal.cell}`,
                majorDimension: "ROWS",
                values: [[false]],
            });
        }
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    Sheets.Spreadsheets.Values.batchUpdate(batchWriteRequest, spreadsheet.getId());
}

/**
 * Check if the user has reached goals. Check Data.gs for the goal data format.
 */
function checkGoals() {
    const chartsResp = UrlFetchApp.fetch("https://raw.githubusercontent.com/zkrising/Tachi/refs/heads/main/seeds/collections/charts-chunithm.json");
    const charts = JSON.parse(chartsResp.getContentText());

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const username = Sheets.Spreadsheets.Values.get(spreadsheet.getId(), "Home!C18")["values"][0][0];

    Logger.log(`Getting PBs for ${username}`);
    const pbResp = UrlFetchApp.fetch(`https://kamai.tachi.ac/api/v1/users/${username}/games/chunithm/Single/pbs/all`);
    const data = JSON.parse(pbResp.getContentText());

    if (!data.success) {
        throw new Error(`Fetching PBs from Tachi failed: ${data.description}`);
    }

    // Note that we do not interfere with manually checked goals; we will check a goal as completed
    // if it is completed on Tachi, but that's it.

    const batchWriteRequest = {
        valueInputOption: "USER_ENTERED",
        data: [],
    };

    for (const questline of QUESTLINES) {
        Logger.log(`Checking goals for questline ${questline.sheet}`);

        for (const goal of questline.goals) {
            const relevantCharts = charts.filter((c) => {
                // disregard all charts that are not in the current version
                if (!c.versions.includes(CURRENT_CHUNITHM_VERSION)) {
                    return false;
                }

                return Object.entries(goal.charts).every(([key, value]) => {
                    if (Array.isArray(c[key]) && Array.isArray(value)) {
                        // if both are arrays, check if they have any common elements
                        return c[key].some((v) => value.includes(v));
                    }

                    if (Array.isArray(c[key]) && !Array.isArray(value)) {
                        // if the chart has an array and the goal has a single value, check if the chart's array includes that value
                        return c[key].includes(value);
                    }

                    if (!Array.isArray(c[key]) && Array.isArray(value)) {
                        // if the chart has a single value and the goal has an array, check if the chart's value is in the goal's array
                        return value.includes(c[key]);
                    }

                    // otherwise, just check for equality
                    return c[key] === value;
                });
            });

            Logger.log(`Found ${relevantCharts.length} relevant charts for chart condition ${JSON.stringify(goal.charts)}`);

            const relevantChartIDs = new Set(relevantCharts.map((c) => c.chartID));
            const relevantPBs = data.body.pbs.filter((pb) => relevantChartIDs.has(pb.chartID));

            Logger.log(`Found ${relevantPBs.length} relevant PBs for chart condition ${JSON.stringify(goal.charts)}`);

            const count = relevantPBs.reduce(
                (acc, pb) => acc + Number(_getValue(pb, goal.criteria.key) >= goal.criteria.value),
                0,
            );
            let goalMet = false;

            if (goal.criteria.mode === "absolute") {
                goalMet = count >= goal.criteria.countNum;
            } else if (goal.criteria.mode === "proportion") {
                goalMet = count / relevantCharts.length >= goal.criteria.countNum;
            }

            if (goalMet) {
                Logger.log(`Goal met: ${questline.sheet}!${goal.cell}`)
                batchWriteRequest.data.push({
                    range: `${questline.sheet}!${goal.cell}`,
                    majorDimension: "ROWS",
                    values: [[true]],
                })
            }
        }
    }

    Sheets.Spreadsheets.Values.batchUpdate(batchWriteRequest, spreadsheet.getId());
}
