// SPDX-License-Identifier: MIT
/**
 * Kamaitachi Questline Tracker
 * 
 * Created by beerpsi on 2025-05-27.
 * 
 * Changelog:
 * - 2025-05-28: Fixed the conditions for 99AJ goals
 * - 2025-05-30: Added goal progress indicator, PB notes for chart goals, feature flags support, and checkbox colors for chart goals (by triple_sigma)
 * - 2025-06-01: Reworked goal progress indicator system
 * - 2026-05-28: Updated for Tachi v3
 * 
 * You can now contribute to the code by making a pull request on GitHub at
 *     https://github.com/beer-psi/kamaitachi-chunithm-questline-tracker
 * 
 * Licensed under the MIT license. You can use this as a base for another questline tracker,
 * but please leave the credits intact.
 *  
 */
const CURRENT_CHUNITHM_VERSION = "xverse";
const CONFIG_CELLS = {
    USERNAME: "Home!C18",
    ENABLE_GRADE_COLORS: "Home!K53",
};

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

    const songsResp = UrlFetchApp.fetch("https://raw.githubusercontent.com/zkrising/Tachi/main/db/seeds/songs-chunithm.json");
    /** @type {Array<SongDocument>} */
    const songs = JSON.parse(songsResp.getContentText());
    const songsByTitle = new Map(songs.map((s) => [s.title, s]));

    const chartsResp = UrlFetchApp.fetch("https://raw.githubusercontent.com/zkrising/Tachi/main/db/seeds/charts-chunithm.json");
    /** @type {Array<ChartDocument>} */
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
                        "id": tachiChart.id,
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
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    /**
     * @type {GoogleAppsScript.Sheets.Schema.Request[]}
     */
    const batchUpdateRequests = [];

    for (const questline of QUESTLINES) {
        const sheet = spreadsheet.getSheetByName(questline.sheet);

        if (sheet === null) {
            Logger.log(`Could not get sheet for questline ${questline.sheet}`);
            continue;
        }

        const sheetId = sheet.getSheetId();

        for (const goal of questline.goals) {
            const coordinates = convertA1ToRowColumn(goal.cell);

            batchUpdateRequests.push({
                updateCells: {
                    rows: [
                        {
                            values: [
                                {
                                    userEnteredValue: {
                                        boolValue: false,
                                    },
                                    userEnteredFormat: {
                                        backgroundColorStyle: {
                                            rgbColor: convertHexColor(getCellDefaultColor(questline.sheet, coordinates)),
                                        },
                                    },
                                }
                            ],
                        },
                    ],
                    fields: "userEnteredValue,note,userEnteredFormat.backgroundColorStyle",
                    start: {
                        sheetId,
                        ...coordinates,
                    }
                }
            });

            if (isObjectiveChecklistCell(questline.sheet, coordinates)) {
                batchUpdateRequests.push({
                    updateCells: {
                        rows: [{ values: [{}] }],
                        fields: "userEnteredValue",
                        start: {
                            sheetId,
                            rowIndex: coordinates.rowIndex,
                            columnIndex: coordinates.columnIndex - 2,
                        },
                    },
                });
            }
        }
    }
    
    Sheets.Spreadsheets.batchUpdate(
        {
            requests: batchUpdateRequests,
        },
        spreadsheet.getId()
    );
}

/**
 * Check if the user has reached goals. Check Data.gs for the goal data format.
 */
function checkGoals() {
    const chartsResp = UrlFetchApp.fetch("https://raw.githubusercontent.com/zkrising/Tachi/refs/heads/main/db/seeds/charts-chunithm.json");

    /** @type {Array<ChartDocument>} */
    const charts = JSON.parse(chartsResp.getContentText());

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const username = Sheets.Spreadsheets.Values.get(spreadsheet.getId(), CONFIG_CELLS.USERNAME)["values"][0][0];
    const enableColors = Sheets.Spreadsheets.Values.get(spreadsheet.getId(), CONFIG_CELLS.ENABLE_GRADE_COLORS)["values"][0][0] == "TRUE";

    Logger.log("Configuration:");
    Logger.log(`- Username: ${username}`);
    Logger.log(`- Checkbox colors: ${enableColors}`);

    Logger.log(`Getting PBs for ${username}`);

    const pbResp = UrlFetchApp.fetch(`https://kamai.tachi.ac/api/v1/users/${username}/games/chunithm/pbs/all`);

    /**
     * @type {KamaitachiAPIResponse<{ pbs: PersonalBest[] }>}
     */
    const data = JSON.parse(pbResp.getContentText());

    if (!data.success) {
        throw new Error(`Fetching PBs from Tachi failed: ${data.description}`);
    }

    // Note that we do not interfere with manually checked goals; we will check a goal as completed
    // if it is completed on Tachi, but that's it.

    /**
     * @type {GoogleAppsScript.Sheets.Schema.Request[]}
     */
    const batchUpdateRequests = [];

    for (const questline of QUESTLINES) {
        Logger.log(`Checking goals for questline ${questline.sheet}`);

        const sheet = spreadsheet.getSheetByName(questline.sheet);

        if (sheet === null) {
            Logger.log(`Could not get sheet for questline ${questline.sheet}`);
            continue;
        }

        const sheetId = sheet.getSheetId();

        for (const goal of questline.goals) {
            if (!["absolute", "proportion"].includes(goal.criteria.mode)) {
                Logger.log(`Unknown goal criteria mode: ${goal.criteria.mode}`);
                continue;
            }

            const coordinates = convertA1ToRowColumn(goal.cell);
            const isSingleGoal = goal.criteria.mode === "absolute" && goal.criteria.countNum === 1;
            const relevantCharts = filterRelevantCharts(charts, goal);

            Logger.log(`Found ${relevantCharts.length} relevant charts for chart condition ${JSON.stringify(goal.charts)}`);

            const relevantChartIDs = new Set(relevantCharts.map((c) => c.id));
            const relevantPBs = data.body.pbs.filter((pb) => relevantChartIDs.has(pb.chartID));

            Logger.log(`Found ${relevantPBs.length} relevant PBs for chart condition ${JSON.stringify(goal.charts)}`);

            const count = relevantPBs.reduce(
                (acc, pb) => acc + Number(_getValue(pb, goal.criteria.key) >= goal.criteria.value),
                0,
            );            
            let requiredCount = 0;

            if (goal.criteria.mode === "absolute") {
                requiredCount = goal.criteria.countNum;
            } else if (goal.criteria.mode === "proportion") {
                requiredCount = Math.floor(relevantCharts.length * goal.criteria.countNum);
            }
            
            const goalMet = count >= requiredCount;

            /**
             * @type {GoogleAppsScript.Sheets.Schema.CellData}
             */
            const cellData = {};

            /**
             * @type {string[]}
             */
            const fields = [];

            /**
             * @type {string | null}
             */
            let progressColor = null;

            /**
             * @type {string | null}
             */
            let progress = null;

            if (isSingleGoal) {
                /**
                 * @type {PersonalBest | undefined}
                 */
                let bestPB;

                if (relevantCharts.length === 1) {
                    // goal on a single chart
                    bestPB = relevantPBs[0];
                } else {
                    // goal on any chart
                    const maxProgress = Math.max(...relevantPBs.map((pb) => _getValue(pb, goal.criteria.key)));

                    bestPB = relevantPBs.find((pb) => _getValue(pb, goal.criteria.key) === maxProgress);
                }

                progress = humanizeGoalProgress(goal.criteria.key, goal.criteria.value, bestPB);

                if (bestPB) {
                    progressColor = goal.criteria.key === "scoreData.enumIndexes.grade"
                        ? getProgressColorFromScore(bestPB.scoreData.score)
                        : getProgressColor(_getValue(bestPB, goal.criteria.key) / goal.criteria.value);
                }
            } else {
                progress = `${count} / ${requiredCount}`;
                progressColor = getProgressColor(count / requiredCount);
            }

            // Write the progress in the previous cells if it's an objective checklist goal and
            // is not a single goal.
            if (progress && isObjectiveChecklistCell(questline.sheet, coordinates) && !isSingleGoal) {
                batchUpdateRequests.push({
                    updateCells: {
                        rows: [
                            {
                                values: [
                                    { userEnteredValue: { stringValue: progress } },
                                ],
                            },
                        ],
                        fields: "userEnteredValue",
                        start: {
                            sheetId,
                            rowIndex: coordinates.rowIndex,
                            columnIndex: coordinates.columnIndex - 2,
                        },
                    },
                });
            } else if (progress) {
                // Is a single goal, but is an objective checklist goal
                // (e.g. ALL JUSTICE any chart...)
                if (isObjectiveChecklistCell(questline.sheet, coordinates)) {
                    batchUpdateRequests.push({
                        updateCells: {
                            rows: [
                                {
                                    values: [
                                        { userEnteredValue: { stringValue: `${count} / ${requiredCount}` } },
                                    ],
                                },
                            ],
                            fields: "userEnteredValue",
                            start: {
                                sheetId,
                                rowIndex: coordinates.rowIndex,
                                columnIndex: coordinates.columnIndex - 2,
                            },
                        },
                    });
                }
                
                cellData.note = progress;
                fields.push("note");
            }

            if (goalMet) {
                Logger.log(`Goal met: ${questline.sheet}!${goal.cell}`);

                cellData.userEnteredValue = {
                    boolValue: true
                };
                fields.push("userEnteredValue");
            }

            if (!isObjectiveChecklistCell(questline.sheet, coordinates)) {
                if (enableColors && progressColor) {
                    cellData.userEnteredFormat = {
                        backgroundColorStyle: {
                            rgbColor: convertHexColor(progressColor),
                        },
                    };
                    fields.push("userEnteredFormat.backgroundColorStyle");
                } else if (!enableColors) {
                    cellData.userEnteredFormat = {
                        backgroundColorStyle: {
                            rgbColor: convertHexColor(getCellDefaultColor(questline.sheet, coordinates)),
                        },
                    };
                    
                    fields.push("userEnteredFormat.backgroundColorStyle");
                }
            }

            if (fields.length !== 0) {
                /**
                 * @type {GoogleAppsScript.Sheets.Schema.Request}
                 */
                const batchUpdateRequest = {
                    updateCells: {
                        rows: [{ values: [cellData] }],
                        fields: fields.join(","),
                        start: {
                            sheetId,
                            ...coordinates,
                        }
                    }
                }

                batchUpdateRequests.push(batchUpdateRequest);
            }
        }
    }

    Sheets.Spreadsheets.batchUpdate(
        {
            requests: batchUpdateRequests,
        },
        spreadsheet.getId()
    );
}
