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
                // single goals use one progress cell (columnIndex - 2)
                // composite goals also use the cell to its left (columnIndex - 3)
                // we can just pretend conditions[] is not condition | [condition, condition] :loamer:
                const progressColumns = Array.isArray(goal.conditions)
                    ? [coordinates.columnIndex - 2, coordinates.columnIndex - 3]
                    : [coordinates.columnIndex - 2];

                for (const columnIndex of progressColumns) {
                    batchUpdateRequests.push({
                        updateCells: {
                            rows: [{ values: [{}] }],
                            fields: "userEnteredValue",
                            start: {
                                sheetId,
                                rowIndex: coordinates.rowIndex,
                                columnIndex,
                            },
                        },
                    });
                }
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
 * Evaluate a single goal condition (a `{ charts, criteria }` pair) against the user's PBs.
 *
 * @param {ChartDocument[]} charts All chart documents.
 * @param {Condition} condition
 * @param {PersonalBest[]} pbs All of the user's PBs.
 * @param {Map<string, PersonalBest>} pbByChartId PBs indexed by chart id.
 * @returns {{ met: boolean; progress: string; progressColor: string | null; isSingleGoal: boolean; count: number; requiredCount: number; } | null}
 *   The evaluation result, or null if the criteria mode is unknown.
 */
function evaluateCondition(charts, condition, pbs, pbByChartId) {
    const criteria = condition.criteria;
    const relevantCharts = filterRelevantCharts(charts, condition);

    if (criteria.mode === "overpower") {
        const { achievedMicro, maxMicro } = computeOverpower(relevantCharts, pbByChartId, criteria.aggregate);
        const ratio = maxMicro > 0 ? achievedMicro / maxMicro : 0;
        const thresholdBp = Math.round(criteria.value * 10000);

        const met = maxMicro > 0 && achievedMicro * 10000 >= thresholdBp * maxMicro;
        const progress = `${(ratio * 100).toFixed(2)} / ${thresholdBp / 100}`;

        return { met, progress, progressColor: null, isSingleGoal: false, count: 0, requiredCount: 0 };
    }

    if (criteria.mode !== "absolute" && criteria.mode !== "proportion") {
        Logger.log(`Unknown goal criteria mode: ${criteria.mode}`);
        return null;
    }

    const isSingleGoal = criteria.mode === "absolute" && criteria.countNum === 1;

    Logger.log(`Found ${relevantCharts.length} relevant charts for chart condition ${JSON.stringify(condition.charts)}`);

    const relevantChartIDs = new Set(relevantCharts.map((c) => c.id));
    const relevantPBs = pbs.filter((pb) => relevantChartIDs.has(pb.chartID));

    Logger.log(`Found ${relevantPBs.length} relevant PBs for chart condition ${JSON.stringify(condition.charts)}`);

    const count = relevantPBs.reduce(
        (acc, pb) => acc + Number(_getValue(pb, criteria.key) >= criteria.value),
        0,
    );
    let requiredCount = 0;

    if (criteria.mode === "absolute") {
        requiredCount = criteria.countNum;
    } else if (criteria.mode === "proportion") {
        requiredCount = Math.floor(relevantCharts.length * criteria.countNum);
    }

    const met = count >= requiredCount;

    /** @type {string} */
    let progress;
    /** @type {string | null} */
    let progressColor = null;

    if (isSingleGoal) {
        /** @type {PersonalBest | undefined} */
        let bestPB;

        if (relevantCharts.length === 1) {
            // goal on a single chart
            bestPB = relevantPBs[0];
        } else {
            // goal on any chart
            const maxProgress = Math.max(...relevantPBs.map((pb) => _getValue(pb, criteria.key)));

            bestPB = relevantPBs.find((pb) => _getValue(pb, criteria.key) === maxProgress);
        }

        progress = humanizeGoalProgress(criteria.key, criteria.value, bestPB);

        if (bestPB) {
            progressColor = criteria.key === "scoreData.enumIndexes.grade"
                ? getProgressColorFromScore(bestPB.scoreData.score)
                : getProgressColor(_getValue(bestPB, criteria.key) / criteria.value);
        }
    } else {
        progress = `${count} / ${requiredCount}`;
        progressColor = getProgressColor(count / requiredCount);
    }

    return { met, progress, progressColor, isSingleGoal, count, requiredCount };
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

    /** @type {Map<string, PersonalBest>} */
    const pbByChartId = new Map(data.body.pbs.map((pb) => [pb.chartID, pb]));

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
            const coordinates = convertA1ToRowColumn(goal.cell);
            const isChecklist = isObjectiveChecklistCell(questline.sheet, coordinates);
            const isComposite = Array.isArray(goal.conditions);

            /** @type {Condition[]} */
            const conditions = isComposite
                ? goal.conditions
                : [{ charts: goal.charts, criteria: goal.criteria }];

            /** @type {ReturnType<typeof evaluateCondition>[]} */
            const results = [];
            let validGoal = true;

            for (const condition of conditions) {
                const result = evaluateCondition(charts, condition, data.body.pbs, pbByChartId);

                if (result === null) {
                    validGoal = false;
                    break;
                }

                results.push(result);
            }

            if (!validGoal) {
                continue;
            }

            const goalMet = results.every((r) => r.met);

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

            if (isComposite) {
                // again we pretend to support more than 2 conditions
                if (isChecklist) {
                    const leftProgress = results.slice(1).map((r) => r.progress).join(" | ");

                    batchUpdateRequests.push({
                        updateCells: {
                            rows: [{ values: [{ userEnteredValue: { stringValue: results[0].progress } }] }],
                            fields: "userEnteredValue",
                            start: {
                                sheetId,
                                rowIndex: coordinates.rowIndex,
                                columnIndex: coordinates.columnIndex - 2,
                            },
                        },
                    });
                    batchUpdateRequests.push({
                        updateCells: {
                            rows: [{ values: [{ userEnteredValue: { stringValue: leftProgress } }] }],
                            fields: "userEnteredValue",
                            start: {
                                sheetId,
                                rowIndex: coordinates.rowIndex,
                                columnIndex: coordinates.columnIndex - 3,
                            },
                        },
                    });
                } else {
                    cellData.note = results.map((r) => r.progress).join(" | ");
                    fields.push("note");
                }
            } else {
                const result = results[0];
                const progress = result.progress;
                progressColor = result.progressColor;

                // Write the progress in the previous cells if it's an objective checklist goal and
                // is not a single goal.
                if (progress && isChecklist && !result.isSingleGoal) {
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
                    if (isChecklist) {
                        batchUpdateRequests.push({
                            updateCells: {
                                rows: [
                                    {
                                        values: [
                                            { userEnteredValue: { stringValue: `${result.count} / ${result.requiredCount}` } },
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
            }

            if (goalMet) {
                Logger.log(`Goal met: ${questline.sheet}!${goal.cell}`);

                cellData.userEnteredValue = {
                    boolValue: true
                };
                fields.push("userEnteredValue");
            }

            if (!isChecklist) {
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
