// SPDX-License-Identifier: MIT
const CLEAR_LAMPS = {
    FAILED: 0,
    CLEAR: 1,
    HARD: 2,
    BRAVE: 3,
    ABSOLUTE: 4,
    CATASTROPHY: 5,
};
const COMBO_LAMPS = {
    NONE: 0,
    FULL_COMBO: 1,
    ALL_JUSTICE: 2,
    ALL_JUSTICE_CRITICAL: 3,
};
const GRADES = {
    D: 0,
    C: 1,
    B: 2,
    BB: 3,
    BBB: 4,
    A: 5,
    AA: 6,
    AAA: 7,
    S: 8,
    S_PLUS: 9,
    SS: 10,
    SS_PLUS: 11,
    SSS: 12,
    SSS_PLUS: 13,
};
const GRADE_BOUNDARIES = [
    { name: "D", lowerBound: 0 },
    { name: "C", lowerBound: 500000 },
    { name: "B", lowerBound: 600000 },
    { name: "BB", lowerBound: 700000 },
    { name: "BBB", lowerBound: 800000 },
    { name: "A", lowerBound: 900000 },
    { name: "AA", lowerBound: 925000 },
    { name: "AAA", lowerBound: 950000 },
    { name: "S", lowerBound: 975000 },
    { name: "S+", lowerBound: 990000 },
    { name: "SS", lowerBound: 1000000 },
    { name: "SS+", lowerBound: 1005000 },
    { name: "SSS", lowerBound: 1007500 },
    { name: "SSS+", lowerBound: 1009000 },
];

/**
 * An object defining a goal.
 * - cell: The cell containing the checkbox that will be ticked when the goal is reached.
 * - charts: Criteria for the charts in this goal. See [charts-chunithm.json] for items that are in the chart.
 * It supports MongoDB-esque syntax:
 *   - `key: object`: The chart document must have a `key` and its value must be equal to the given value.
 *   - `key: object[]`: The chart document must have a `key` and its value must be one of the given values.
 * 
 * ```js
 * // Select MASTER charts
 * {
 *   difficulty: "MASTER"
 * }
 * 
 * // Select MASTER or ULTIMA charts
 * {
 *   difficulty: ["MASTER", "ULTIMA"]
 * }
 * ```
 * - criteria: Criteria for the goal.
 *   - key: The key in the PB document.
 *   - value: The value that the given key must meet or exceed.
 *   - countNum: Depends on the value of `mode`:
 *     - `absolute`: countNum is the number of charts to satisfy the criteria before the goal is met.
 *     - `proportion`: countNum is the proportion of charts (out of 1) to satisfy the criteria before the goal is met (e.g. 0.7 = 70%)
 * 
 * [charts-chunithm.json]: https://raw.githubusercontent.com/zkrising/Tachi/refs/heads/main/seeds/collections/charts-chunithm.json
 * 
 * @typedef {{
 *  cell: string;
 *  charts: object;
 *  criteria: {
 *    mode: "absolute" | "proportion";
 *    key: string;
 *    value: number;
 *    countNum: number;
 *  }
 * }} Goal
 */
/**
 * An object defining a questline.
 * @typedef {{
 *  sheet: string;
 *  goals: Goal[];
 * }} Questline
 */
/**
 * @type {Questline[]}
 */
const QUESTLINES = [
    {
        "sheet": "Purple",
        "goals": [
            {
                // Clear 20 charts of MASTER difficulty
                "cell": "U7",
                "charts": {
                    "difficulty": ["MASTER"]
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR,
                    "countNum": 20
                }
            },
            {
                // SS 15 charts in the level 10 folder
                "cell": "U8",
                "charts": {
                    "level": ["10"]
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SS,
                    "countNum": 15,
                }
            },
            {
                // S 10 charts in the Level 12 folder
                "cell": "U9",
                "charts": {
                    "level": ["12"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.S,
                    "countNum": 10,
                }
            },
            {
                // ALL JUSTICE any charts of ADVANCED difficulty
                "cell": "U13",
                "charts": {
                    "difficulty": ["ADVANCED"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 1,
                },
            },
            {
                // S+ 10 charts of MASTER difficulty
                "cell": "U14",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.S_PLUS,
                    "countNum": 10,
                },
            },
            {
                // SSS 5 charts of EXPERT difficulty
                "cell": "U15",
                "charts": {
                    "difficulty": ["EXPERT"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS,
                    "countNum": 5,
                },
            }
        ]
    },
    {
        "sheet": "Bronze",
        "goals": [
            {
                // Clear 50 charts of MASTER difficulty
                "cell": "U7",
                "charts": {
                    "difficulty": ["MASTER"]
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR,
                    "countNum": 50
                }
            },
            {
                // S+ 30 charts of the MASTER difficulty
                "cell": "U8",
                "charts": {
                    "difficulty": ["MASTER"]
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.S_PLUS,
                    "countNum": 30
                }
            },
            {
                // SS 10 charts in the level 12 folder
                "cell": "U9",
                "charts": {
                    "level": ["12"]
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SS,
                    "countNum": 10
                }
            },
            {
                // S 15 charts in the level 13 folder
                "cell": "U10",
                "charts": {
                    "level": ["13"]
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.S,
                    "countNum": 15
                }
            },
            {
                // ALL JUSTICE any charts of EXPERT difficulty
                "cell": "U13",
                "charts": {
                    "difficulty": ["EXPERT"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 1,
                },
            },
            {
                // SSS any charts of MASTER difficulty
                "cell": "U14",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS,
                    "countNum": 1,
                },
            },
            {
                // SS 15 charts of MASTER difficulty
                "cell": "U15",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SS,
                    "countNum": 15,
                },
            },
            {
                // SSS 20 charts of EXPERT difficulty
                "cell": "U16",
                "charts": {
                    "difficulty": ["EXPERT"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SS,
                    "countNum": 20,
                },
            },
        ]
    },
    {
        "sheet": "Silver",
        "goals": [
            {
                // CLEAR 75 charts of MASTER difficulty
                "cell": "Z7",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR,
                    "countNum": 75,
                },
            },
            {
                // S+ 50 charts of MASTER difficulty
                "cell": "Z8",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.S_PLUS,
                    "countNum": 50,
                },
            },
            {
                // SS 10 charts in the Level 13 folder
                "cell": "Z9",
                "charts": {
                    "level": ["13"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SS,
                    "countNum": 10,
                },
            },
            {
                // S 15 charts in the Level 14 folder
                "cell": "Z10",
                "charts": {
                    "level": ["14"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.S,
                    "countNum": 15,
                },
            },
            {
                // ALL JUSTICE any chart of MASTER difficulty
                "cell": "Z13",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 1,
                },
            },
            {
                // SSS 10 charts chart of MASTER difficulty
                "cell": "Z14",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS,
                    "countNum": 10,
                },
            },
            {
                // SS 30 charts of MASTER difficulty
                "cell": "Z15",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SS,
                    "countNum": 30,
                },
            },
            {
                // ユクエシレズ [MASTER]
                "cell": "F24",
                "charts": {
                    "chartID": "5227a50c62f840a57907a9403c3770d7d75951b8"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 幽闇に目醒めしは [MASTER]
                "cell": "F26",
                "charts": {
                    "chartID": "91fdcc56bf1f148f8c4d563446a3b9b504a71606"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // エンドマークに希望と涙を添えて [EXPERT]
                "cell": "F28",
                "charts": {
                    "chartID": "37562290c1f5f42ac7bc9d04a0f2edfbc6a6e2f7"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 人生攻略☆Tips [MASTER]
                "cell": "F30",
                "charts": {
                    "chartID": "2aa7967bcee91d36e5846546bfed09677923e213"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 幾四音-Ixion- [MASTER]
                "cell": "F32",
                "charts": {
                    "chartID": "8e3776807f628371235a3f273149053f1574f215"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // NewStartでReadyGo! [MASTER]
                "cell": "F34",
                "charts": {
                    "chartID": "05a73768319da980a9411e482434c5ead18b8713"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Yet Another ”drizzly rain” [MASTER]
                "cell": "F36",
                "charts": {
                    "chartID": "e7075a28449316d2bef9f34b30c8ec7522d947d6"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // felys -final remix- [EXPERT]
                "cell": "F38",
                "charts": {
                    "chartID": "e41bbe8dc912fbb449cee2848870e3dc27a947f6"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 幻想即興曲 [EXPERT]
                "cell": "F40",
                "charts": {
                    "chartID": "64b0937e387172793b1de32bac8de6b153469d8d"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // スン(マイル)フラワー～Sun(Mile)Flower [MASTER]
                "cell": "F42",
                "charts": {
                    "chartID": "18e24827448154847ca2548b9bf6b8289f23c27e"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // プリズム [MASTER]
                "cell": "K24",
                "charts": {
                    "chartID": "d6586fdc065d866879441fdc68db98105b1ce220"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // スイートマジック [MASTER]
                "cell": "K26",
                "charts": {
                    "chartID": "c7d14849914b8939bbb115bfb191d4117c5290d0"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // リモコン [MASTER]
                "cell": "K28",
                "charts": {
                    "chartID": "18851253f675b033cdcb449f782122dd3c705389"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 3倍！Sun Shine！カーニバル！ [MASTER]
                "cell": "K30",
                "charts": {
                    "chartID": "5a43c465b3001f3fc9f3177e3388e77d694e3d53"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // シンデレラ [MASTER]
                "cell": "K32",
                "charts": {
                    "chartID": "f96e9e8de9ad1a8cca496d12bb3a86b52650a832"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // FEEL the BEATS [MASTER]
                "cell": "K34",
                "charts": {
                    "chartID": "5b5f0d8c12cf0a58683ca75e75d4767782b15cd3"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 三妖精SAY YA!!! [MASTER]
                "cell": "K36",
                "charts": {
                    "chartID": "4903c4fda7ee1111a1ce7ebe1103474c53af1418"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ちょっとあざとい [MASTER]
                "cell": "K38",
                "charts": {
                    "chartID": "e87a30ca33f0eb9cea3cec032bc1ece6852bdaeb"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ポジティブ・パレード [MASTER]
                "cell": "K40",
                "charts": {
                    "chartID": "2f16e7a2917fa1a6c84d6f36ce528a0d56f2fdf7"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // おいでよ！ 高須らいむランド [MASTER]
                "cell": "K42",
                "charts": {
                    "chartID": "d15366c74bdfb3d9c526096cca888b085731cd81"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 幽霊東京 [MASTER]
                "cell": "P24",
                "charts": {
                    "chartID": "2f0f660f75f0d7b58bc2f98173e7967284888fc9"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ハルシナイト [MASTER]
                "cell": "P26",
                "charts": {
                    "chartID": "9de6153e69cc29698042d69a9ea320ef8cc8f003"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // CYCLES [MASTER]
                "cell": "P28",
                "charts": {
                    "chartID": "c9d49788a6727e6f03b8ee99126e3c76bd26fe59"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Jump for Joy [MASTER]
                "cell": "P30",
                "charts": {
                    "chartID": "0644a1d7afc1a94fed808f5b420c7a6dc9772c07"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Magic [MASTER]
                "cell": "P32",
                "charts": {
                    "chartID": "8f9038135c9e3b6dd8f8a3ffe6e893694c9ff871"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 響 [MASTER]
                "cell": "P34",
                "charts": {
                    "chartID": "21b08869640ac3f1d34e6f592c593b77b29572da"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 夕暮れワンルーム [MASTER]
                "cell": "P36",
                "charts": {
                    "chartID": "af706278c13a2828855656b4ad06c2f6d6cd1a8e"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ドーナドーナのうた [MASTER]
                "cell": "P38",
                "charts": {
                    "chartID": "45ccb374c2cf636c11728b39f6969d0cc8650f9b"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ハウリング [MASTER]
                "cell": "P40",
                "charts": {
                    "chartID": "6020147bf739e6ae72d43c53708ba24f592d3e94"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Palette [MASTER]
                "cell": "P42",
                "charts": {
                    "chartID": "40eb634e8590bb2881e6d17b5ea7b343fc3ca2a0"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 大天使ユリア★降臨! [EXPERT]
                "cell": "U24",
                "charts": {
                    "chartID": "fad89ea3e530a95525989f84cf44dbcadb0e36e2"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // PUPA [EXPERT]
                "cell": "U26",
                "charts": {
                    "chartID": "325200bed3a0df077c7a8c49fb45a97ad82334cc"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // アマツキツネ [MASTER]
                "cell": "U28",
                "charts": {
                    "chartID": "7a91765f0fef65f0baab7044fa57821ec62b05ab"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // To：Be Continued [ADVANCED]
                "cell": "U30",
                "charts": {
                    "chartID": "2b327741f8705a36fdd9e38ca760b93460894215"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // MAXRAGE [EXPERT]
                "cell": "U32",
                "charts": {
                    "chartID": "f84237655b0dc683bf9e3546133482736776fc09"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // MuseDashを作っているPeroPeroGamesさんが倒産しちゃったよ～ [EXPERT]
                "cell": "U34",
                "charts": {
                    "chartID": "db6eba97d2f4e562dab24898e5ad6980944dd518"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // CITRUS MONSTER [EXPERT]
                "cell": "U36",
                "charts": {
                    "chartID": "4c5515bd07507e490490c4c6d65f783339f6483e"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Walzer für das Nichts [EXPERT]
                "cell": "U38",
                "charts": {
                    "chartID": "42782b8ca6f8b39cb78e5e8a5f802b6f0dfc8261"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 光線チューニング [MASTER]
                "cell": "U40",
                "charts": {
                    "chartID": "2ed7d6da3d56689775c4baefb810b44be0e09ebe"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // イカサマライフゲイム [MASTER]
                "cell": "U42",
                "charts": {
                    "chartID": "2be8d310633629a1c3283ba36155eaa416d55cc2"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Bad Apple!! feat.nomico [MASTER]
                "cell": "AA24",
                "charts": {
                    "chartID": "fe46ff4f0caf125e5747b44d14f3a995a09629a6"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // ラグトレイン [MASTER]
                "cell": "AA26",
                "charts": {
                    "chartID": "69c26a53dc58bfaa3e7cf5de7150c80402770fad"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // Breakthrough [EXPERT]
                "cell": "AA28",
                "charts": {
                    "chartID": "b6eedd16d0a08369d83b95a3885f570d3040f36c"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // 願い星 [MASTER]
                "cell": "AA30",
                "charts": {
                    "chartID": "280a3043058b139eefc96e4f9e9be471a786e927"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // DETARAME ROCK&ROLL THEORY [MASTER]
                "cell": "AA32",
                "charts": {
                    "chartID": "da7a9dfde955095d0b9f882c60c2d251715b866b"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // どこにもいかない [MASTER]
                "cell": "AA34",
                "charts": {
                    "chartID": "b67df5fc76f6edfc3240989fff4db90f9b9c38ee"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // シリョクケンサ [MASTER]
                "cell": "AA36",
                "charts": {
                    "chartID": "6efe7db334051eed0a2d8cac6b6770619c8888f8"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // 帝国少女 [MASTER]
                "cell": "AA38",
                "charts": {
                    "chartID": "6b4a725385470128afe15ab4bfa6475ceebec076"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // 天樂 [MASTER]
                "cell": "AA40",
                "charts": {
                    "chartID": "4b8fb1c332d5087b643c2a43946855222d34b21d"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // いろは唄 [MASTER]
                "cell": "AA42",
                "charts": {
                    "chartID": "a1fd826323c1a522d777b0b3d43c6aa40a37e1a1"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
        ]
    },
    {
        "sheet": "Gold",
        "goals": [
            {
                // CLEAR 125 charts of MASTER difficulty
                "cell": "Z7",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR,
                    "countNum": 125,
                },
            },
            {
                // SSS 10 charts in the Level 13 folder
                "cell": "Z8",
                "charts": {
                    "level": ["13"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS,
                    "countNum": 10,
                },
            },
            {
                // SS 5 charts in the Level 14 folder
                "cell": "Z9",
                "charts": {
                    "level": ["14"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SS,
                    "countNum": 5,
                },
            },
            {
                // S+ 30 charts in the Level 14 folder
                "cell": "Z10",
                "charts": {
                    "level": ["14"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.S_PLUS,
                    "countNum": 30,
                },
            },
            {
                // S 10 charts in the Level 14+ folder
                "cell": "Z11",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.S,
                    "countNum": 10,
                },
            },
            {
                // Get a score of 1,009,900 ("99 AJ") on any chart of EXPERT difficulty
                "cell": "Z13",
                "charts": {
                    "difficulty": ["EXPERT"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.score",
                    "value": 1009900,
                    "countNum": 1,
                },
            },
            {
                // ALL JUSTICE 5 charts of MASTER difficulty
                "cell": "Z14",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 5,
                },
            },
            {
                // SSS 30 charts of MASTER difficulty
                "cell": "Z15",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS,
                    "countNum": 30,
                },
            },
            {
                // SS 50 charts of MASTER difficulty
                "cell": "Z16",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SS,
                    "countNum": 50,
                },
            },
            {
                // Blessed Rain [EXPERT]
                "cell": "F24",
                "charts": {
                    "chartID": "3de5b63a829272e39cf1ea2999e3039476e9508a"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // What color... [MASTER]
                "cell": "F26",
                "charts": {
                    "chartID": "9e7e16ab47c258c0924499b046e464bd2f86735c"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 《理想》 ～ Cloudland [MASTER]
                "cell": "F28",
                "charts": {
                    "chartID": "89f3660f88162f4c9cef223b19e6e3d9445a5f06"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ルナティックレッドアイズ [MASTER]
                "cell": "F30",
                "charts": {
                    "chartID": "9fcdacb99ee847aa5940b3b7f521d191568a0daf"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // FLOWER [MASTER]
                "cell": "F32",
                "charts": {
                    "chartID": "a40bda588514d8e99d5adc181ca8a3d7932b3258"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 生きる [MASTER]
                "cell": "F34",
                "charts": {
                    "chartID": "ad4ba7d7bfc0dc8b16230512cacf8e40b5646749"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // After the rain [ULTIMA]
                "cell": "F36",
                "charts": {
                    "chartID": "ad297771b32c9b0e03e84d5e8ebd45863236fe87"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 2DVenture [MASTER]
                "cell": "F38",
                "charts": {
                    "chartID": "769e2c023962ba69fdb73aa288df35677b8f038d"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // シル・ヴ・プレジデント [MASTER]
                "cell": "K24",
                "charts": {
                    "chartID": "7936e3231fddf47c1df9bba455def4b1a3277d81"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // トランスダンスアナーキー [MASTER]
                "cell": "K26",
                "charts": {
                    "chartID": "3bcd1cc3fd5ddbb4effcf8494306afee388985c8"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ユックリ feat.餅千歳 [MASTER]
                "cell": "K28",
                "charts": {
                    "chartID": "cff24a12c2e8147d2e9d3b1e5d548dfb059dfe12"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // カレシのジュード [MASTER]
                "cell": "K30",
                "charts": {
                    "chartID": "bbecb0fa6b7ccc72ebbbb8a337b58cc340c24a03"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // みずいろレインドロップ [MASTER]
                "cell": "K32",
                "charts": {
                    "chartID": "e97cfe471c87155d07bf7bd4fbdf9d9c4a01db40"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Solstånd [MASTER]
                "cell": "K34",
                "charts": {
                    "chartID": "2c3daf232f0fb5e6aca336bb4a2289a30cc54d9d"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ヴィラン [MASTER]
                "cell": "K36",
                "charts": {
                    "chartID": "2b0176c76e0c0689955cc569b072420215e341f1"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ケ・セラ・セラ奇想曲 [MASTER]
                "cell": "K38",
                "charts": {
                    "chartID": "674c1d46c1eb46b22dfff8d1703a26ca2c642c41"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // カリスマ煉獄天神 [MASTER]
                "cell": "P24",
                "charts": {
                    "chartID": "ca47e962f534f5f510a7f6cbd8d48e371718435c"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // クレイジー・ビート [MASTER]
                "cell": "P26",
                "charts": {
                    "chartID": "dda6e6dda986f630fb208a81e54b51b2f8ce6c0d"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Cosmic Magic Shooter [MASTER]
                "cell": "P28",
                "charts": {
                    "chartID": "0917e1480ee7c479ce832e8db26195c9f39d4c72"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Tattoo [MASTER]
                "cell": "P30",
                "charts": {
                    "chartID": "9f566140217ffc5c0f779f58fe016b7dbf87d926"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Limits [MASTER]
                "cell": "P32",
                "charts": {
                    "chartID": "c04560016de5c45b86cca1d35fdff49420005080"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Anemone [ULTIMA]
                "cell": "P34",
                "charts": {
                    "chartID": "be42a128709e213cd03e2d628770608f099a9f20"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ボッカデラベリタ [MASTER]
                "cell": "P36",
                "charts": {
                    "chartID": "3d9f815cb31910971979ff3b416990346b0b2a11"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // リンカーネイション [MASTER]
                "cell": "P38",
                "charts": {
                    "chartID": "b3a500c0c322f97d4c7735aa8ed0885fc5430d69"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 進捗どうですか？ [MASTER]
                "cell": "U24",
                "charts": {
                    "chartID": "87725c80b96aed3768abfc4d61a3ef3eb6359e5c"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // マチガイサガシ [MASTER]
                "cell": "U26",
                "charts": {
                    "chartID": "9d4ea3b54f897cfa79ea76be7daa59aa5928ae41"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 咲キ誇レ常世ノ華 [MASTER]
                "cell": "U28",
                "charts": {
                    "chartID": "9e78bdd5c37f4c1ff65baefcb303832151c23a3e"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // パズルリボン [MASTER]
                "cell": "U30",
                "charts": {
                    "chartID": "27f787d2b207b655b85b045b37c432bfc4009e74"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 夢花火 [MASTER]
                "cell": "U32",
                "charts": {
                    "chartID": "fc8a259954d4ec3f4898e242b2bc475aa3ed56e4"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // アイロニック [MASTER]
                "cell": "U34",
                "charts": {
                    "chartID": "7bb197a9fbaa036d515e9cbe7d660859cc263586"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 儚きもの人間 [MASTER]
                "cell": "U36",
                "charts": {
                    "chartID": "5107bd523f6d675a55ff1585d2500fa4111d134d"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // バイオレンストリガー [MASTER]
                "cell": "U38",
                "charts": {
                    "chartID": "c4a305b0e4a0b704ded0c609aeda5230395d5785"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // シジョウノコエ VOCALO ver. [MASTER]
                "cell": "AA24",
                "charts": {
                    "chartID": "3072d215e07bf8f0866d0260d83a29ced235c49a"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // 恋はりんりん☆あーりんベル [MASTER]
                "cell": "AA26",
                "charts": {
                    "chartID": "b809322f542b613e7e2fb2cfe871122e2cfdd1f5"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // 結んで開いて羅刹と骸 [MASTER]
                "cell": "AA28",
                "charts": {
                    "chartID": "58b00b6035dba626a0712dfcc06f6763ae7abd2d"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // D.E.A.D.L.Y. [MASTER]
                "cell": "AA30",
                "charts": {
                    "chartID": "afc4937c446dcef3775fc6f8a790e953dde28f66"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // MAIGAHARA パンチラインキッカーズ [MASTER]
                "cell": "AA32",
                "charts": {
                    "chartID": "9c073f65ef2459b5252d7e667372021a3bb2724c"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // お嫁にしなさいっ！ [MASTER]
                "cell": "AA34",
                "charts": {
                    "chartID": "5350f5fef541735604296614737a9042ecec5195"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // 風仁雷仁 [MASTER]
                "cell": "AA36",
                "charts": {
                    "chartID": "9bf8fce1f3413c2933a43ef19b7bc4eec894163e"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // D✪N’T ST✪P R✪CKIN’ ～[✪_✪] MIX～ [MASTER]
                "cell": "AA38",
                "charts": {
                    "chartID": "acbc38d2209a4a126b251b832bf6d5e0f02fa28c"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
        ],
    },
    {
        "sheet": "Platinum",
        "goals": [
            {
                // CLEAR 200 charts of MASTER difficulty
                "cell": "Z7",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR,
                    "countNum": 200,
                },
            },
            {
                // SSS 5 charts in the Level 14 folder
                "cell": "Z8",
                "charts": {
                    "level": ["14"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS,
                    "countNum": 5,
                },
            },
            {
                // SS 5 charts in the Level 14+ folder
                "cell": "Z9",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SS,
                    "countNum": 5,
                },
            },
            {
                // S+ 50 charts in the Level 14 folder
                "cell": "Z10",
                "charts": {
                    "level": ["14"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.S_PLUS,
                    "countNum": 50,
                },
            },
            {
                // S+ 30 charts in the Level 14+ folder
                "cell": "Z11",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.S_PLUS,
                    "countNum": 30,
                },
            },
            {
                // Get a score of 1,009,900 ("99 AJ") on any chart of MASTER difficulty
                "cell": "Z13",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.score",
                    "value": 1009900,
                    "countNum": 1,
                },
            },
            {
                // ALL JUSTICE 15 charts of MASTER difficulty
                "cell": "Z14",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 15,
                },
            },
            {
                // SSS 50 charts of MASTER difficulty
                "cell": "Z15",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS,
                    "countNum": 50,
                },
            },
            {
                // SS 100 charts of MASTER difficulty
                "cell": "Z16",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SS,
                    "countNum": 100,
                },
            },
            {
                // SSS 20 charts in the Level 13+ folder
                "cell": "Z17",
                "charts": {
                    "level": ["13+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS,
                    "countNum": 20,
                },
            },
            {
                // SS 30 charts in the Level 14 folder
                "cell": "Z18",
                "charts": {
                    "level": ["14"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SS,
                    "countNum": 30,
                },
            },
            {
                // やらなきゃいけないことばかり [MASTER]
                "cell": "F24",
                "charts": {
                    "chartID": "251596d7a9741f281c865937fa0c1f2d8d991496"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ETERNAL DRAIN [MASTER]
                "cell": "F26",
                "charts": {
                    "chartID": "0e8a548fbc0d70f9d0508b0ca86f5be2898f4928"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ライトスピード・デイズ [MASTER]
                "cell": "F28",
                "charts": {
                    "chartID": "22e99d737c58f1eae86031043471d26ed03e6da0"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Energy Booster ～ 上海紅茶館 [MASTER]
                "cell": "F30",
                "charts": {
                    "chartID": "b180e063af0ecf0114594c059ed5d9e57976a1cf"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // STAGER [MASTER]
                "cell": "F32",
                "charts": {
                    "chartID": "e726486b596ac7b0bf282e861c93a625e97092cd"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 少女幻葬戦慄曲　～　Necro Fantasia [MASTER]
                "cell": "F34",
                "charts": {
                    "chartID": "297ca6801f5ada08eea0af38722f46aa12704106"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // elegante [ULTIMA]
                "cell": "F36",
                "charts": {
                    "chartID": "6c5fc0a778a335d1d83ab8c8cd991af04a3425f1"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 聖少女サクリファイス [MASTER]
                "cell": "F38",
                "charts": {
                    "chartID": "7b6fb8635ed8eaff32e12771d9e9531790e27bb8"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Wake up Dreamer [MASTER]
                "cell": "K24",
                "charts": {
                    "chartID": "245440ac6571295fcad513da46c2b3f63a15bd0d"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Papyrus [MASTER]
                "cell": "K26",
                "charts": {
                    "chartID": "cb294d74712c480751eadc7fc7bd46787958da9b"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 時の冒険者 [MASTER]
                "cell": "K28",
                "charts": {
                    "chartID": "9f4cd7021e757f1b7984aa37e49a3b9e3e15fb4c"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Paqqin [MASTER]
                "cell": "K30",
                "charts": {
                    "chartID": "aa90c0b8be353b7ff286a9053e8a9d785ba3288b"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 最愛テトラグラマトン [MASTER]
                "cell": "K32",
                "charts": {
                    "chartID": "d2317fbfcb2bc675ad814f007c28b68fd4f14d13"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // おこちゃま戦争 [MASTER]
                "cell": "K34",
                "charts": {
                    "chartID": "ca8cc1f5de0beaa1b66ae5629c8db69345d53520"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ホイホイ☆幻想ホロイズム [MASTER]
                "cell": "K36",
                "charts": {
                    "chartID": "a01b771538a8ad37491a8b0b2c9df88b8be74ee1"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // REL0VE REL1VE [MASTER]
                "cell": "K38",
                "charts": {
                    "chartID": "5ba5b7a6483cfa28c31cb760522e2aed8be052ed"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // アナタニナルノ [MASTER]
                "cell": "P24",
                "charts": {
                    "chartID": "2ec4a27ac30d398f7339dbdd40af8958706f1438"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ラブカ？ [MASTER]
                "cell": "P26",
                "charts": {
                    "chartID": "ed45f549613003ba1e791c07bcdd5c4c04da8293"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 《楽土》 ～ One and Only One [MASTER]
                "cell": "P28",
                "charts": {
                    "chartID": "f342a29811dbd9868fab83881d89f3c850160a1d"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // First Light [MASTER]
                "cell": "P30",
                "charts": {
                    "chartID": "9b0addc754911e25d0416fde9645c450bd8affa8"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 乙女戦士☆あーし。 [MASTER]
                "cell": "P32",
                "charts": {
                    "chartID": "4b4a7b894d603c14c2a451ecab0a4090b8a9b01d"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Stronghold LandEater [MASTER]
                "cell": "P34",
                "charts": {
                    "chartID": "d0bf87fe84f2fa0881e82e3822e4619c95c352fd"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // GRÄNDIR [MASTER]
                "cell": "P36",
                "charts": {
                    "chartID": "696a8f2e9450556135a968c0ccc5a76b1eb55312"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Breakthrough [MASTER]
                "cell": "P38",
                "charts": {
                    "chartID": "9265ed97c797ca4fecc187c3d806972ccad344fe"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 舞高最強ドリームセッション!!!!! ～180秒一曲勝負～ [MASTER]
                "cell": "U24",
                "charts": {
                    "chartID": "bc37772b24902159769ceb0cf8f858276908f261"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Her Majesty [MASTER]
                "cell": "U26",
                "charts": {
                    "chartID": "116c0a8e1f21263c3d1874f9278002342e1c388d"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // L9 [MASTER]
                "cell": "U28",
                "charts": {
                    "chartID": "0e45a6938c849cfa389a4b6bdb2f25db7e2eef9e"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Reach For The Stars [ULTIMA]
                "cell": "U30",
                "charts": {
                    "chartID": "d900daecd4cf26da545803f4ad997682f43524a7"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Starting Over [MASTER]
                "cell": "U32",
                "charts": {
                    "chartID": "b16c6898465dee23cc85298af753727c099f74c4"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ケモノガル [MASTER]
                "cell": "U34",
                "charts": {
                    "chartID": "3616dbaa20ec878edb892c89c9bfd1f92c55b081"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // エンドマークに希望と涙を添えて ～イロドリミドリアレンジ～ [MASTER]
                "cell": "U36",
                "charts": {
                    "chartID": "2fbce520936124dc5dbf5c6bd9231174de505053"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // サンシャインサマー☆夏期講習 [MASTER]
                "cell": "U38",
                "charts": {
                    "chartID": "0104c34c236fd8c914e2159afa4181e4553ec8c9"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 名も無い鳥 [MASTER]
                "cell": "AA24",
                "charts": {
                    "chartID": "114546c864d655fe0092c98cc3e6ce6ac3fdebf6"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // お空のニュークリアフュージョン道場 [MASTER]
                "cell": "AA26",
                "charts": {
                    "chartID": "da8f2030dae311b1739817378a520b866dfdb8b1"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // 札付きのワル　～マイケルのうた～ [MASTER]
                "cell": "AA28",
                "charts": {
                    "chartID": "fff468d29759f49a0cd41dfdc5d3f00f33e610d7"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // Rush B [MASTER]
                "cell": "AA30",
                "charts": {
                    "chartID": "f2bf7a9e3000413b36ea377836b7981070c9d084"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // ぷよぷよのうた ピコピコミックス [MASTER]
                "cell": "AA32",
                "charts": {
                    "chartID": "9a0649fce01a08341f676a5ef63d814ef4a83a6f"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // Survive [MASTER]
                "cell": "AA34",
                "charts": {
                    "chartID": "cf31283e56ef21041af16e835d4281e2789c476c"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // こちら、幸福安心委員会です。 [MASTER]
                "cell": "AA36",
                "charts": {
                    "chartID": "9f153b9e8e16d3f7213b52c995347ebf43d67eea"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // snooze [MASTER]
                "cell": "AA38",
                "charts": {
                    "chartID": "08ec5b017eda8b989ec126e1bea1ff0aa23af0db"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
        ]
    },
    {
        "sheet": "Rainbow I",
        "goals": [
            {
                // SSS 1 chart in the Level 14+ folder
                "cell": "Z7",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS,
                    "countNum": 1,
                },
            },
            {
                // SS 20 charts in the Level 14+ folder
                "cell": "Z8",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SS,
                    "countNum": 20,
                },
            },
            {
                // S+ 50 charts in the Level 14+ folder
                "cell": "Z9",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.S_PLUS,
                    "countNum": 50,
                },
            },
            {
                // S 10 charts in the Level 15 folder
                "cell": "Z10",
                "charts": {
                    "level": ["15"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.S,
                    "countNum": 10,
                },
            },
            {
                // ALL JUSTICE CRITICAL any chart of ADVANCED difficulty
                "cell": "Z13",
                "charts": {
                    "difficulty": ["ADVANCED"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE_CRITICAL,
                    "countNum": 1,
                },
            },
            {
                // ALL JUSTICE 30 charts of MASTER difficulty
                "cell": "Z14",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 30,
                },
            },
            {
                // Clear 25 charts in the Level 13 folder with the Absolute skill (<50 J)
                "cell": "Z15",
                "charts": {
                    "level": ["13"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.ABSOLUTE,
                    "countNum": 25,
                },
            },
            {
                // SSS 20 charts in the Level 14 folder
                "cell": "Z16",
                "charts": {
                    "level": ["14"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS,
                    "countNum": 20,
                },
            },
            {
                // SS 50 charts in the Level 14 folder
                "cell": "Z17",
                "charts": {
                    "level": ["14"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SS,
                    "countNum": 50,
                },
            },
            {
                // S+ 100 charts in the Level 14 folder
                "cell": "Z18",
                "charts": {
                    "level": ["14"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.S_PLUS,
                    "countNum": 100,
                },
            },
            {
                // ハジマリノピアノ [MASTER]
                "cell": "F30",
                "charts": {
                    "chartID": "5d9c5bd5a86d3d91f96ecf8294db849551f81229"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 鬼KYOKAN [MASTER]
                "cell": "F32",
                "charts": {
                    "chartID": "209b56ec24c8b0e0abe26e787370f26a9e57d11c"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Phantasm Brigade [MASTER]
                "cell": "F34",
                "charts": {
                    "chartID": "7185f8d17df48141fb01841252adb4a2c0c79f60"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 88D [MASTER]
                "cell": "F36",
                "charts": {
                    "chartID": "42c2177a0f12c8cb06b4201883815ff5d3e789ae"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Jade Star [MASTER]
                "cell": "F38",
                "charts": {
                    "chartID": "d663d938df013993fb9f53d3d2b47af665519e48"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Technicians High [MASTER]
                "cell": "F40",
                "charts": {
                    "chartID": "62cb81595abd349114422122d9f743583a83930e"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // フリーフォール [MASTER]
                "cell": "K30",
                "charts": {
                    "chartID": "7786355a93e9822f3e815947765304d4af46f153"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Innocent Truth [MASTER]
                "cell": "K32",
                "charts": {
                    "chartID": "b2f80ac6d84a1f131aa87d9240e4e2081e4a02e2"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ストリーミングハート [ULTIMA]
                "cell": "K34",
                "charts": {
                    "chartID": "aa7f5da66f3225093a0e6b7cf05739c2704a1262"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Baqeela [MASTER]
                "cell": "K36",
                "charts": {
                    "chartID": "5b1f7c806f2d59be39406fce05da1f74cae124e4"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // アマツカミ [MASTER]
                "cell": "K38",
                "charts": {
                    "chartID": "4860a07686b53a920421547c49ebedb8f65a5c64"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Infantoon Fantasy [ULTIMA]
                "cell": "K40",
                "charts": {
                    "chartID": "5320848feb1e9a890a1042682a787de1697a2fc6"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // チューリングの跡 [EXPERT]
                "cell": "P30",
                "charts": {
                    "chartID": "c72e43d299d5e64ac9789ed74d24b27a68e9b750"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 宙の隣 [MASTER]
                "cell": "P32",
                "charts": {
                    "chartID": "de0fad2aee009e77f144bac4077d1973ecdaaadf"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Sunlight Starlight [MASTER]
                "cell": "P34",
                "charts": {
                    "chartID": "c836b528b4c198c2f781ede8d1af6b3b2bd54d0b"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 《真紅》 ～ Pavane Pour La Flamme [MASTER]
                "cell": "P36",
                "charts": {
                    "chartID": "1b6e91ebceceb024265d98ebf952ac8b6eb05cfd"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ベースラインやってる？笑 [MASTER]
                "cell": "P38",
                "charts": {
                    "chartID": "b4cb814edac91e957f4df3e72934433cf1007b0f"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // トリスメギストス [MASTER]
                "cell": "P40",
                "charts": {
                    "chartID": "4dfc76d5361b23d3c036e17edc54b2d98d56d5ec"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 奏者はただ背中と提琴で語るのみ [MASTER]
                "cell": "U30",
                "charts": {
                    "chartID": "d22711ac226ee6cde06297629551f31770bc3b2b"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 再生不能 [MASTER]
                "cell": "U32",
                "charts": {
                    "chartID": "b7959b48cceb493ed7bb23591a385f96dcc60eff"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 電脳少女は歌姫の夢を見るか？ [MASTER]
                "cell": "U34",
                "charts": {
                    "chartID": "31dae9a1c19bdd01c8f596077a4d272f47c6c8f3"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // カミサマネジマキ [MASTER]
                "cell": "U36",
                "charts": {
                    "chartID": "22ab70e37533351ad8bd61ba7e336032eea57a21"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // DRAGONLADY [MASTER]
                "cell": "U38",
                "charts": {
                    "chartID": "d50317461977aafe5d2ccd722d7776481007fc74"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 幻想のサテライト [MASTER]
                "cell": "U40",
                "charts": {
                    "chartID": "c1c34c7ff43bf16ea289b092ca5b80eef147404f"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // bubble attack [MASTER]
                "cell": "AA30",
                "charts": {
                    "chartID": "c792c1e72b209af4fe1c60afb9affa9cab15db0e"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // ASH [MASTER]
                "cell": "AA32",
                "charts": {
                    "chartID": "7c5ee01ee4ef55826276128f3fe3a8cbdc50eb8e"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // The wheel to the Night ～インド人が夢に!?～ [MASTER]
                "cell": "AA34",
                "charts": {
                    "chartID": "31aa4cdc33b8f0822cdbadb4c7fa7b7073e07f52"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // Vibrant Verve [MASTER]
                "cell": "AA36",
                "charts": {
                    "chartID": "8e01937295ca8556b188987cd46544b8e6508cdd"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // Jack-the-Ripper◆ [MASTER]
                "cell": "AA38",
                "charts": {
                    "chartID": "54fc607899f66ce7cb90eb7127f782a3cf8313e9"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // GEMINI -C- [MASTER]
                "cell": "AA40",
                "charts": {
                    "chartID": "1037a88f0345b0fda585480b773029b164fd634c"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            }
        ],
    },
    {
        "sheet": "Rainbow II",
        "goals": [
            {
                // SSS 5 charts in the Level 14+ folder
                "cell": "Z7",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS,
                    "countNum": 5,
                },
            },
            {
                // SS 50 charts in the Level 14+ folder
                "cell": "Z8",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SS,
                    "countNum": 50,
                },
            },
            {
                // S+ 5 charts in the Level 15 folder
                "cell": "Z9",
                "charts": {
                    "level": ["15"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.S_PLUS,
                    "countNum": 5,
                },
            },
            {
                // S all charts in the Level 15 folder
                "cell": "Z10",
                "charts": {
                    "level": ["15"],
                },
                "criteria": {
                    "mode": "proportion",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.S,
                    "countNum": 1,
                },
            },
            {
                // ALL JUSTICE CRITICAL any chart of EXPERT difficulty
                "cell": "Z13",
                "charts": {
                    "difficulty": ["EXPERT"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE_CRITICAL,
                    "countNum": 1,
                },
            },
            {
                // ALL JUSTICE 10 charts in the Level 13 folder
                "cell": "Z14",
                "charts": {
                    "level": ["13"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 10,
                },
            },
            {
                // Clear 25 charts in the Level 13+ folder with the Absolute skill (<50 J)
                "cell": "Z15",
                "charts": {
                    "level": ["13+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.ABSOLUTE,
                    "countNum": 25,
                },
            },
            {
                // SSS 50 charts in the Level 14 folder
                "cell": "Z16",
                "charts": {
                    "level": ["14"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS,
                    "countNum": 50,
                },
            },
            {
                // SS 100 charts in the Level 14 folder
                "cell": "Z17",
                "charts": {
                    "level": ["14"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SS,
                    "countNum": 100,
                },
            },
            {
                // ALL JUSTICE 50 charts of MASTER difficulty
                "cell": "Z20",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 50,
                },
            },
            {
                // ゴールドビジョン [MASTER]
                "cell": "F30",
                "charts": {
                    "chartID": "9b3b6b301dc4de1abb17486212b71a5b3daff7db"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Λlteration [MASTER]
                "cell": "F32",
                "charts": {
                    "chartID": "18363dff411ad215ee14b626752f02dd7329cf10"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // felys -final remix- [MASTER]
                "cell": "F34",
                "charts": {
                    "chartID": "3ba9dd9ef4ef7c915b20e11603c50262c285bffb"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Snow Colored Score [ULTIMA]
                "cell": "F36",
                "charts": {
                    "chartID": "99085db5e20deb3912f9d24c61c73b7be59f225c"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Name of oath [MASTER]
                "cell": "F38",
                "charts": {
                    "chartID": "f05802cb3978aa6bd29a288d61a91ea7774c680d"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Akasagarbha -reincarnate- [MASTER]
                "cell": "F40",
                "charts": {
                    "chartID": "9f38ae240d383b15804d56f3c91dccb6ffdbe6ba"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Komplexe [MASTER]
                "cell": "K30",
                "charts": {
                    "chartID": "6d86d6e90bd621acf1ddbbd943c4fadd5cf48ad1"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // BlazinG AIR [MASTER]
                "cell": "K32",
                "charts": {
                    "chartID": "051de53d21c4d878a8931df565817b6bf6937704"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Twilight [MASTER]
                "cell": "K34",
                "charts": {
                    "chartID": "041cf24620689c8d63aed632ec7df24e2a60bde9"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // シャッキーーン！！ [MASTER]
                "cell": "K36",
                "charts": {
                    "chartID": "f6bc7a7d80675593286dec1f1a3b33569fc64620"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Wildfire [MASTER]
                "cell": "K38",
                "charts": {
                    "chartID": "433c2ab7694dc6c13c17fe653487c4597001b3ac"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Valsqotch [MASTER]
                "cell": "K40",
                "charts": {
                    "chartID": "aee89f3534757f46577dc42caab6b571b414ec43"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // PRAGMATISM -RESURRECTION- [MASTER]
                "cell": "P30",
                "charts": {
                    "chartID": "363bb0c4c4c76c9b63c123c68e3241094f3c78ee"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // StufeStern [MASTER]
                "cell": "P32",
                "charts": {
                    "chartID": "43686c3d9c8aa300a71773050df61addb8b7d31e"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Moon of Noon [MASTER]
                "cell": "P34",
                "charts": {
                    "chartID": "e1fdcb3fbed26321900de5db170d2d486b5ca719"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Regulus [MASTER]
                "cell": "P36",
                "charts": {
                    "chartID": "6f41b5ba8c6eb94f90358808fda2009b24ed7968"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // luna blu [MASTER]
                "cell": "P38",
                "charts": {
                    "chartID": "5074ad178c656395204d73b81be739c5edf500f3"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // U ARE [MASTER]
                "cell": "P40",
                "charts": {
                    "chartID": "c9d01cfb36bea716ebd4b0010f4a2dc30083cd02"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 中学2年生のアンドロイド [MASTER]
                "cell": "U30",
                "charts": {
                    "chartID": "eac3d6625a6c2307b1fa69adf32925dd540c1b91"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ぜったい！昇天★鎮魂歌♂ [MASTER]
                "cell": "U32",
                "charts": {
                    "chartID": "8248508fbee9bcaf0b1b111e0a2c8d0891a8cb39"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // プナイプナイたいそう [MASTER]
                "cell": "U34",
                "charts": {
                    "chartID": "3f8dc1d044b6eeb70cec04b3a6f863f142bb6eeb"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // オススメ☆♂♀☆でぃすとぴあ [MASTER]
                "cell": "U36",
                "charts": {
                    "chartID": "03e95d3fdecd3a54b05674699e7d38de19182668"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // MuseDashを作っているPeroPeroGamesさんが倒産しちゃったよ～ [MASTER]
                "cell": "U38",
                "charts": {
                    "chartID": "f3e4ece03a748414c4a7664d09298340d7ec881d"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // おしゃまなプリンセス [MASTER]
                "cell": "U40",
                "charts": {
                    "chartID": "14939f2709f1ec432b6ae7a98ce647ca2ec61dfd"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Satellite System ft.Diana Chiaki [MASTER]
                "cell": "AA30",
                "charts": {
                    "chartID": "7642b1cf35365e79788bc53a1d713e0740d91f2b"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // 幾四音-Ixion- [ULTIMA]
                "cell": "AA32",
                "charts": {
                    "chartID": "97fefe78a24e92cdbc8a2c7cb238519f7ce941f8"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // ハイセンスナンセンス [MASTER]
                "cell": "AA34",
                "charts": {
                    "chartID": "3437f2b6c2b5a1fa47c70a2503346401121e4db2"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // Love's Theme of BADASS ～バッド・アス 愛のテーマ～ [MASTER]
                "cell": "AA36",
                "charts": {
                    "chartID": "15812862f29e78321a90cccbba5821cefa6453e8"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // Genesis [MASTER]
                "cell": "AA38",
                "charts": {
                    "chartID": "02703216e0153cb3398fde8b21996075812a52b7"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // TECHNOPOLIS 2085 [MASTER]
                "cell": "AA40",
                "charts": {
                    "chartID": "d053d2ba257f364d9f6dfdcb89ef5d2114c88207"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
        ]
    },
    {
        "sheet": "Rainbow III",
        "goals": [
            {
                // Achieve 10 scores of at least 16.75 rating
                "cell": "Z7",
                "charts": {
                    // No specific chart criteria
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "calculatedData.rating",
                    "value": 16.75,
                    "countNum": 10,
                },
            },
            {
                // SSS 20 charts in the Level 14+ folder
                "cell": "Z8",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS,
                    "countNum": 20,
                },
            },
            {
                // SS all charts in the Level 14+ folder
                "cell": "Z9",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "proportion",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SS,
                    "countNum": 1,
                },
            },
            {
                // S+ all charts in the Level 15 folder
                "cell": "Z10",
                "charts": {
                    "level": ["15"],
                },
                "criteria": {
                    "mode": "proportion",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.S_PLUS,
                    "countNum": 1,
                },
            },
            {
                // ALL JUSTICE CRITICAL any chart of MASTER difficulty
                "cell": "Z13",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE_CRITICAL,
                    "countNum": 1,
                },
            },
            {
                // ALL JUSTICE 25 charts in the Level 14 folder
                "cell": "Z14",
                "charts": {
                    "level": ["14"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 25,
                },
            },
            {
                // Clear 50 charts in the Level 14 folder with the Absolute skill (<50 J)
                "cell": "Z15",
                "charts": {
                    "level": ["14"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.ABSOLUTE,
                    "countNum": 50,
                },
            },
            {
                // Clear 50 charts in the Level 14+ folder with the Brave skill (<150 J)
                "cell": "Z16",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.BRAVE,
                    "countNum": 50,
                },
            },
            {
                // SSS 100 charts in the Level 14 folder
                "cell": "Z17",
                "charts": {
                    "level": ["14"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS,
                    "countNum": 100,
                },
            },
            {
                // ALL JUSTICE 50 charts of MASTER difficulty
                "cell": "Z20",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 50,
                },
            },
            {
                // Elemental Creation [MASTER]
                "cell": "F30",
                "charts": {
                    "chartID": "4574581051ea3dc0d518cbb194a855a18757ae0a"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // アルストロメリア [ULTIMA]
                "cell": "F32",
                "charts": {
                    "chartID": "9651ef193b0f27b911302e7afeadaa6b3b98eeea"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 本物のヒーローとの戦い [MASTER]
                "cell": "F34",
                "charts": {
                    "chartID": "9687cba7f549c2ba4517cfaea9530e3166783e97"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Alcyone [MASTER]
                "cell": "F36",
                "charts": {
                    "chartID": "c6b28f4a53f9b59adaa91a19c32b5524cbc9dd7a"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Sage [MASTER]
                "cell": "F38",
                "charts": {
                    "chartID": "7ac12955b89e54a1850104e7b40f1063a5248207"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Ai C [MASTER]
                "cell": "F40",
                "charts": {
                    "chartID": "bc32689afd96c83d1fa7d864672d3f351dff34ae"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Destr0yer [MASTER]
                "cell": "K30",
                "charts": {
                    "chartID": "41b39e0ca3fd4b9aa0224c0d82d7fbe9542ddd60"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Good bye, Merry-Go-Round. [MASTER]
                "cell": "K32",
                "charts": {
                    "chartID": "cff5680c7dfde8718af5e0cbbc57010bfbf4c6da"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Walzer für das Nichts [MASTER]
                "cell": "K34",
                "charts": {
                    "chartID": "541268c471bfa27dba0d446008afaccf2d08045f"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // WE'RE BACK!! [MASTER]
                "cell": "K36",
                "charts": {
                    "chartID": "47a70c011e2f465feb4cc88218c4d489d34db4f3"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // GEOMETRIC DANCE [MASTER]
                "cell": "K38",
                "charts": {
                    "chartID": "91e52da24c7d6c2f3d6b43aefe8539dff9f6d900"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // B100d Hunter [MASTER]
                "cell": "K40",
                "charts": {
                    "chartID": "f609967697ce8b2c55246b1817a6f5d5f1fd486f"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Tango Rouge [MASTER]
                "cell": "P30",
                "charts": {
                    "chartID": "11c50e211a36a5bad2432281591b3ef431ffcdaf"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Spasmodic [MASTER]
                "cell": "P32",
                "charts": {
                    "chartID": "d544d5db460e0c7a824dbb2bebadd9c0707e3020"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 花と、雪と、ドラムンベース。 [MASTER]
                "cell": "P34",
                "charts": {
                    "chartID": "8588b723b8a65c18bdc300fe38f993e1bab1faab"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 空間創造理論 [MASTER]
                "cell": "P36",
                "charts": {
                    "chartID": "2acc25d657cfe4e55aa5a62c184caf213d7639e1"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Fracture Ray [MASTER]
                "cell": "P38",
                "charts": {
                    "chartID": "826708b286d612c3924bfda811ea05688f64235a"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // LiftOff [MASTER]
                "cell": "P40",
                "charts": {
                    "chartID": "7bf5db1c6529ef80028d54315faba8d18bb08d07"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 初音ミクの消失 [MASTER]
                "cell": "U30",
                "charts": {
                    "chartID": "ac02e0a48820b652ea2f7fc8176721395eeb55d5"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // CITRUS MONSTER [MASTER]
                "cell": "U32",
                "charts": {
                    "chartID": "be10ad3ec516bffc52d0681ebdc6712555fca610"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ハードコア・シンドローム [MASTER]
                "cell": "U34",
                "charts": {
                    "chartID": "493a8cc521f912c361a60630a18e7509bbb031a1"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ウニの歌 [MASTER]
                "cell": "U36",
                "charts": {
                    "chartID": "14eef7bcc2abfaee60115f5a959e72b982d7b93d"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Last Celebration [MASTER]
                "cell": "U38",
                "charts": {
                    "chartID": "4300232a9c427c9641252c5afec23d6722136229"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Everlasting Liberty [MASTER]
                "cell": "U40",
                "charts": {
                    "chartID": "f212d0bd29b77bb7da6575c3ec093a9ad32554b2"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Blue Noise [MASTER]
                "cell": "AA30",
                "charts": {
                    "chartID": "d283f58abae5b4eaac66e9aa99072afd2e99ea2c"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // 閃鋼のブリューナク [MASTER]
                "cell": "AA32",
                "charts": {
                    "chartID": "94f37a99dcfcc20ebe530009b59ca7365aae49a8"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // 《本能》 ～ ReCoda [MASTER]
                "cell": "AA34",
                "charts": {
                    "chartID": "57dec55b1a49cc5a8293f7b4e83a34c457f86a38"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // 〚空虚〛 ～Pyrophilia [MASTER]
                "cell": "AA36",
                "charts": {
                    "chartID": "61fb6f6537c65d40aa93b904b9a0697f18810f40"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // 月の光 [MASTER]
                "cell": "AA38",
                "charts": {
                    "chartID": "ac9b9ee241cc9adc4949198a5e8b6ccb1ccb722f"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // GOLDEN RULE [MASTER]
                "cell": "AA40",
                "charts": {
                    "chartID": "6ba20cba7252524f104a93261384778f2d01e6f8"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
        ]
    },
    {
        "sheet": "Rainbow IV",
        "goals": [
            {
                // Achieve 10 scores of at least 17.00 rating
                "cell": "Z7",
                "charts": {
                    // No specific chart criteria
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "calculatedData.rating",
                    "value": 17.00,
                    "countNum": 10,
                },
            },
            {
                // Achieve 30 scores of at least 16.85 rating
                "cell": "Z8",
                "charts": {
                    // No specific chart criteria
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "calculatedData.rating",
                    "value": 16.85,
                    "countNum": 30,
                },
            },
            {
                // SSS+ 100 charts in the Level 14 folder
                "cell": "Z9",
                "charts": {
                    "level": ["14"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS_PLUS,
                    "countNum": 100,
                },
            },
            {
                // SSS 3 charts in the Level 15 folder
                "cell": "Z10",
                "charts": {
                    "level": ["15"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS,
                    "countNum": 3,
                },
            },
            {
                // SS all charts in the Level 15 folder
                "cell": "Z11",
                "charts": {
                    "level": ["15"],
                },
                "criteria": {
                    "mode": "proportion",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SS,
                    "countNum": 1,
                },
            },
            {
                // ALL JUSTICE CRITICAL 10 charts of MASTER difficulty
                "cell": "Z13",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE_CRITICAL,
                    "countNum": 10,
                },
            },
            {
                // ALL JUSTICE 5 charts in the Level 14+ folder
                "cell": "Z14",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 5,
                },
            },
            {
                // Clear 20 charts in the Level 14+ folder with the Absolute skill (<50 J)
                "cell": "Z15",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.ABSOLUTE,
                    "countNum": 20,
                },
            },
            {
                // Clear 5 charts in the Level 15 folder with the Brave skill (<150 J)
                "cell": "Z16",
                "charts": {
                    "level": ["15"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.BRAVE,
                    "countNum": 5,
                },
            },
            {
                // SSS 100 charts in the Level 14+ folder
                "cell": "Z17",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS,
                    "countNum": 100,
                },
            },
            {
                // Obtain Silver Possession (S on all MASTER and ULTIMA charts)
                "cell": "Z19",
                "charts": {
                    "difficulty": ["MASTER", "ULTIMA"],
                },
                "criteria": {
                    "mode": "proportion",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.S,
                    "countNum": 1,
                },
            },
            {
                // ALL JUSTICE 100 charts of MASTER difficulty
                "cell": "Z20",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 100,
                },
            },
            {
                // Sparking Revolver [MASTER]
                "cell": "F30",
                "charts": {
                    "chartID": "56caa9f64ce0c33461ea3ee08e2d12f97ed2e5ca"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Vallista [MASTER]
                "cell": "F32",
                "charts": {
                    "chartID": "962ed7f4416c6a823a3f2da77e6894b117e2d18b"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // MEGATON BLAST [MASTER]
                "cell": "F34",
                "charts": {
                    "chartID": "6391e2fa4b14ef0794b8b089be8adb03b664c8f9"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Sheriruth [MASTER]
                "cell": "F36",
                "charts": {
                    "chartID": "324bf5a267de035c25a68e14114e12dd1550ce8c"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 夕焼けのRed Parade [MASTER]
                "cell": "F38",
                "charts": {
                    "chartID": "e2af7e179c5d5a4e944c55d4f17272d295ae944c"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Aiolos [MASTER]
                "cell": "F40",
                "charts": {
                    "chartID": "a4481c7c872e8f2046c0497c601e4387efebd92c"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 色彩過剰のダイアリーミュージック [MASTER]
                "cell": "K30",
                "charts": {
                    "chartID": "5156fd8c9ccc9afdeb7283345ebd2af5a5a61cd5"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // エータ・ベータ・イータ [MASTER]
                "cell": "K32",
                "charts": {
                    "chartID": "4cf4850cade942530b0e2f30dfe01ebad4593263"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Malleus Maleficarum [MASTER]
                "cell": "K34",
                "charts": {
                    "chartID": "d698f7d010152e0ccdcb5ead6ce098cca72b1ab3"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // AttraqtiA [MASTER]
                "cell": "K36",
                "charts": {
                    "chartID": "eb60f5725d9b68b661463b3395bb10a436cc2c65"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Don't Fight The Music [MASTER]
                "cell": "K38",
                "charts": {
                    "chartID": "a82b1fa4f79c2c09d4a7c33fdcd92d3d8429eb9a"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // TEmPTaTiON [MASTER]
                "cell": "K40",
                "charts": {
                    "chartID": "bd63b09f07414403db39ebfa8898babf14f172a8"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // G e n g a o z o [MASTER]
                "cell": "P30",
                "charts": {
                    "chartID": "c5c972db6cea9463f40975d44ff8fa4c0f879feb"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ÅMARA (大未来電脳) [MASTER]
                "cell": "P32",
                "charts": {
                    "chartID": "7b65deb94bcfca21109b87bb2463d89f59b59dbc"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 猛進ソリストライフ！ [ULTIMA]
                "cell": "P34",
                "charts": {
                    "chartID": "0166ce32bfdb951f95cec51242b1fc6f18dff38b"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Yorugao [MASTER]
                "cell": "P36",
                "charts": {
                    "chartID": "92967b4563ee835e6b32771a1f3ea26c95476985"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Gustav Battle [ULTIMA]
                "cell": "P38",
                "charts": {
                    "chartID": "cacc422ba7e62f27dfd821e6bc5cc7e4b0001420"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Megameteor [MASTER]
                "cell": "P40",
                "charts": {
                    "chartID": "197b5fb09b3b2401c521face1b2a0fe80f5a416f"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // FLUFFY FLASH [MASTER]
                "cell": "U30",
                "charts": {
                    "chartID": "1dad5f4254d3ee3204178056d4f304559f9dcb17"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 腐れ外道とチョコレゐト [ULTIMA]
                "cell": "U32",
                "charts": {
                    "chartID": "b8cc39d579651b68ed96ce4f78eda001020ec45a"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Burn it All [MASTER]
                "cell": "U34",
                "charts": {
                    "chartID": "28cbce38fbad69ef599cc39c07acda69e28ed184"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Exitium [MASTER]
                "cell": "U36",
                "charts": {
                    "chartID": "97c21e8b9d17d434513e0560c959385517227565"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 真千年女王 [MASTER]
                "cell": "U38",
                "charts": {
                    "chartID": "b26b067dfc7113cffa0fd5bc56e54e5577bb1294"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Blackmagik Blazing [MASTER]
                "cell": "U40",
                "charts": {
                    "chartID": "50cef15cd94d55c9d020a4786b1ec03438827ef4"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Gate of Fate [MASTER]
                "cell": "AA30",
                "charts": {
                    "chartID": "4fbee68c1e976d5364a1184343ada2ae7751ef06"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // 4月1日でございました [MASTER]
                "cell": "AA32",
                "charts": {
                    "chartID": "d07e4c3b7ba263c81a04d77520abd8fb98f6a0f1"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // L'épisode [MASTER]
                "cell": "AA34",
                "charts": {
                    "chartID": "895d8e009e340062109687bee9943ffd3fcf7cfd"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // 魔理沙は大変なものを盗んでいきました [ULTIMA]
                "cell": "AA36",
                "charts": {
                    "chartID": "900d3f28f475b6fe154e3993807455edd1a94869"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // Kattobi KEIKYU Rider [MASTER]
                "cell": "AA38",
                "charts": {
                    "chartID": "2d78aed5217e389c9b2cffc12e97487f53836602"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // 神威 (NAOKI × ZPP MIX) [MASTER]
                "cell": "AA40",
                "charts": {
                    "chartID": "3893929d413a037f62c473de4cd63ce8d05b4941"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
        ]
    },
    {
        "sheet": "Rainbow EX",
        "goals": [
            {
                // Achieve 10 scores of at least 17.20 rating
                "cell": "Z7",
                "charts": {
                    // No specific chart criteria
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "calculatedData.rating",
                    "value": 17.20,
                    "countNum": 10,
                },
            },
            {
                // Achieve 30 scores of at least 17.05 rating
                "cell": "Z8",
                "charts": {
                    // No specific chart criteria
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "calculatedData.rating",
                    "value": 17.05,
                    "countNum": 30,
                },
            },
            {
                // SSS+ 5 charts in the Level 15 folder
                "cell": "Z9",
                "charts": {
                    "level": ["15"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS_PLUS,
                    "countNum": 5,
                },
            },
            {
                // SSS+ 100 charts in the Level 14+ folder
                "cell": "Z10",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS_PLUS,
                    "countNum": 100,
                },
            },
            {
                // SSS 20 charts in the Level 15 folder
                "cell": "Z11",
                "charts": {
                    "level": ["15"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS,
                    "countNum": 20,
                },
            },
            {
                // ALL JUSTICE CRITICAL 25 charts of MASTER difficulty
                "cell": "Z13",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE_CRITICAL,
                    "countNum": 25,
                },
            },
            {
                // ALL JUSTICE 15 charts in the Level 14+ folder
                "cell": "Z14",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 15,
                },
            },
            {
                // Clear 100 charts in the Level 14+ folder with the Absolute skill (<50 J)
                "cell": "Z15",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.ABSOLUTE,
                    "countNum": 100,
                },
            },
            {
                // Clear 50 charts in the Level 15 folder with the Brave skill (<150 J)
                "cell": "Z16",
                "charts": {
                    "level": ["15"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.BRAVE,
                    "countNum": 50,
                },
            },
            {
                // SSS+ all charts in the Level 14 folder
                "cell": "Z17",
                "charts": {
                    "level": ["14"],
                },
                "criteria": {
                    "mode": "proportion",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS_PLUS,
                    "countNum": 1,
                },
            },
            {
                // ALL JUSTICE 500 charts of MASTER difficulty
                "cell": "Z22",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 500,
                },
            },
            {
                // taboo tears you up [ULTIMA]
                "cell": "F30",
                "charts": {
                    "chartID": "796298ba8d816b6aa2302312cdc7afb0f93c9e05"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // neu [MASTER]
                "cell": "F32",
                "charts": {
                    "chartID": "426814950122e0f03fb64968e2c705a18fefcccb"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Vampire [ULTIMA]
                "cell": "F34",
                "charts": {
                    "chartID": "7c2276f269c54894f896f54b16a9d10344e8e8df"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 幻想即興曲 [MASTER]
                "cell": "F36",
                "charts": {
                    "chartID": "fbf6b0fb123c902d46ad9f2abdd49e7c96ba5636"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 黎命に殉ず [MASTER]
                "cell": "F38",
                "charts": {
                    "chartID": "ccbae90e91b6ec32b1f49519fca0604f7e2896e0"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 電光石火 [MASTER]
                "cell": "K30",
                "charts": {
                    "chartID": "85a000a34302dbee8eebf767abedd415ff474fc2"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Blazing:Storm [MASTER]
                "cell": "K32",
                "charts": {
                    "chartID": "9630b41075e872b3673802212085d9d7a4ca5ea4"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Latent Kingdom [MASTER]
                "cell": "K34",
                "charts": {
                    "chartID": "954afbc58d2e849ce4f0fbc26c5225de1724acf3"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // YURUSHITE [MASTER]
                "cell": "K36",
                "charts": {
                    "chartID": "5dd47b1f49d258cf5343954106673100b3912975"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // GIGA DRIVE [MASTER]
                "cell": "K38",
                "charts": {
                    "chartID": "8f5d90ac469a7a476a226f635b4b5b75c1736392"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Opfer [MASTER]
                "cell": "P30",
                "charts": {
                    "chartID": "5ce40ad839ad90444b679ed0b39ed35d5437fd99"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Iudicium [MASTER]
                "cell": "P32",
                "charts": {
                    "chartID": "737b0b33feadcbf2d38311ad576f55e0ef83e423"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Big Bang [MASTER]
                "cell": "P34",
                "charts": {
                    "chartID": "0034b7fc8ae8ebe5db965e7f4d789139a2ac8c6b"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 神威 [MASTER]
                "cell": "P36",
                "charts": {
                    "chartID": "79d34d6e6cc67f9b8c14c9386952a1bf65cca753"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 《創造》 ～ Cries, beyond The End [MASTER]
                "cell": "P38",
                "charts": {
                    "chartID": "aa4388ff38764e5846edc087729d632568d43be5"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Glorious Crown (tpz over-Over-OVERCUTE REMIX) [MASTER]
                "cell": "U30",
                "charts": {
                    "chartID": "149136711466f7422b70c02b04427ebbd5fc08b5"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // L9 [ULTIMA]
                "cell": "U32",
                "charts": {
                    "chartID": "e749a549d5bac7e3fa749d8ecf44d574f5c16f40"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // マシンガンポエムドール [MASTER]
                "cell": "U34",
                "charts": {
                    "chartID": "6a3bc15c324a19817877e51a9cf96a0396f60335"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 赤壁、大炎上！！ [MASTER]
                "cell": "U36",
                "charts": {
                    "chartID": "151d643314e18c8bd874f39c2bba7ce294739537"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Schrecklicher Aufstand [MASTER]
                "cell": "U38",
                "charts": {
                    "chartID": "d6e20e00596146f6789bf789642c0b14b76d2b51"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ジングルベル [ULTIMA]
                "cell": "AA30",
                "charts": {
                    "chartID": "ec7f1c2fb79f720e7022b056397109df4752516a"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // 宛城、炎上！！ [MASTER]
                "cell": "AA32",
                "charts": {
                    "chartID": "25298568f518a7b931c048256cf3662db850e00a"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // Armageddon [MASTER]
                "cell": "AA34",
                "charts": {
                    "chartID": "7d44f5a8a6ebd77210d3c8dedf1c09ddb82d3503"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // SON OF SUN [ULTIMA]
                "cell": "AA36",
                "charts": {
                    "chartID": "9df677fcec4f613e1403c2cc5a5e0827c7fb0ec2"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // Gate of Fate [ULTIMA]
                "cell": "AA38",
                "charts": {
                    "chartID": "ae1906421acbf2998afe0538f3ee2327ff657835"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
        ]
    },
    {
        "sheet": "Rainbow EX+",
        "goals": [
            {
                // Achieve 10 scores of at least 17.35 rating
                "cell": "Z7",
                "charts": {
                    // No specific chart criteria
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "calculatedData.rating",
                    "value": 17.35,
                    "countNum": 10,
                },
            },
            {
                // Achieve 30 scores of at least 17.20 rating
                "cell": "Z8",
                "charts": {
                    // No specific chart criteria
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "calculatedData.rating",
                    "value": 17.20,
                    "countNum": 30,
                },
            },
            {
                // SSS+ 30 charts in the Level 15 folder
                "cell": "Z9",
                "charts": {
                    "level": ["15"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS_PLUS,
                    "countNum": 30,
                },
            },
            {
                // SSS+ 100 charts in the Level 14+ folder
                "cell": "Z10",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS_PLUS,
                    "countNum": 100,
                },
            },
            {
                // SSS 80 charts in the Level 15 folder
                "cell": "Z11",
                "charts": {
                    "level": ["15"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS,
                    "countNum": 80,
                },
            },
            {
                // ALL JUSTICE CRITICAL 50 charts of MASTER difficulty
                "cell": "Z13",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE_CRITICAL,
                    "countNum": 50,
                },
            },
            {
                // ALL JUSTICE 40 charts in the Level 14+ folder
                "cell": "Z14",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 40,
                },
            },
            {
                // Clear 20 charts in the Level 15 folder with the Absolute skill (<50 J)
                "cell": "Z15",
                "charts": {
                    "level": ["15"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.ABSOLUTE,
                    "countNum": 20,
                },
            },
            {
                // Clear 80 charts in the Level 15 folder with the Brave skill (<150 J)
                "cell": "Z16",
                "charts": {
                    "level": ["15"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.BRAVE,
                    "countNum": 80,
                },
            },
            {
                // ALL JUSTICE 1000 charts of MASTER difficulty
                "cell": "Z23",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 1000,
                },
            },
            {
                // ALL JUSTICE 250 charts in the Level 14 folder
                "cell": "Z24",
                "charts": {
                    "level": ["14"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 250,
                },
            },
            {
                // Reverberate [MASTER]
                "cell": "F30",
                "charts": {
                    "chartID": "c322b96be1aa2b61e5d832c26d687e68910582eb"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Air [ULTIMA]
                "cell": "F32",
                "charts": {
                    "chartID": "66bf56ac5ad5328183ea16d5014f5de0d61b7757"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // What's up? Pop! [MASTER]
                "cell": "F34",
                "charts": {
                    "chartID": "2e214dbee0b2d6285377de1be95c5fb7f5510ad4"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Killing Rhythm [MASTER]
                "cell": "F36",
                "charts": {
                    "chartID": "f6634d8c47d9a8e1be6f08378d05f76b080624ed"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 宿星審判 [MASTER]
                "cell": "F38",
                "charts": {
                    "chartID": "90e14a5e7263f6ab43fe64a09b824d59848548b3"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // βlαnoir [MASTER]
                "cell": "F40",
                "charts": {
                    "chartID": "18310db9aa8f5f2c6452025fee192e57bf351da0"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Contrapasso -inferno- [MASTER]
                "cell": "K30",
                "charts": {
                    "chartID": "b6f0163dc66915a80fadd70f65bb422513f4d080"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 《破滅》 ～ Rhapsody for The End [MASTER]
                "cell": "K32",
                "charts": {
                    "chartID": "e045c643249d62411f36f1134cc3f65f741d941f"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ZegalltA [MASTER]
                "cell": "K34",
                "charts": {
                    "chartID": "b45b411ce4a7114bee270f12136f0b012b5827da"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Stardust:RAY [MASTER]
                "cell": "K36",
                "charts": {
                    "chartID": "98ce87489990e2b047f348479c3641ad7aa8003c"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Trrricksters!! [MASTER]
                "cell": "K38",
                "charts": {
                    "chartID": "f9ab300b625aa95422e7f90c7a64bac09a036b9b"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Crush the Dystopia [MASTER]
                "cell": "K40",
                "charts": {
                    "chartID": "9d9ab3605b75d087839e1958bef994cdc6787ec0"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // X7124 [MASTER]
                "cell": "P30",
                "charts": {
                    "chartID": "6e0488cc3dec525b70441b324e17529cd786d28b"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // parvorbital [MASTER]
                "cell": "P32",
                "charts": {
                    "chartID": "891018083b99ae97644d3d53eed19c3ce6b51c88"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Strange Love [MASTER]
                "cell": "P34",
                "charts": {
                    "chartID": "fd75abdffb11b68e5fe0fac95e736840d46208df"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // リ・フィクション・O [MASTER]
                "cell": "P36",
                "charts": {
                    "chartID": "990a4180cfbf9e4f405b0bdec2f7a336469a9a7c"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // macrocosmos [MASTER]
                "cell": "P38",
                "charts": {
                    "chartID": "506df57b142ff2206b973ed5fbc2c86706ca66e8"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Acid God [MASTER]
                "cell": "P40",
                "charts": {
                    "chartID": "ca4688064e5165a8d16dbee541364078c2305d27"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ENDYMION [MASTER]
                "cell": "U30",
                "charts": {
                    "chartID": "cec074c00dfcb5fd6da1f8a5323e496e9adce236"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Invisible Frenzy [MASTER]
                "cell": "U32",
                "charts": {
                    "chartID": "7eb4b5eb00843791ebcda25d68782613bd6f7740"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ΩΩPARTS [MASTER]
                "cell": "U34",
                "charts": {
                    "chartID": "b4aa5baee1af30b8e8e992c74248745c8a42f1d2"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // 雪男 [MASTER]
                "cell": "U36",
                "charts": {
                    "chartID": "8bff2fb45eb4f2c9a7d3675913a900e7d34bbdd3"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // The Devil Incarnate [MASTER]
                "cell": "U38",
                "charts": {
                    "chartID": "1831e26ef2bef08eaadc53b27c59c2aa43027cd4"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // Rebellion [MASTER]
                "cell": "U40",
                "charts": {
                    "chartID": "06d3fd3ea4529d1556273e3227c0b4a873303a59"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS
                }
            },
            {
                // ★LittlE HearTs★ [MASTER]
                "cell": "AA30",
                "charts": {
                    "chartID": "7b00980b33b67df9ddcdb0fa16c922946afb7cec"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // Dengeki Tube [MASTER]
                "cell": "AA32",
                "charts": {
                    "chartID": "13e24b81e1045807600640746d94339af89ac2bd"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // LibrariA [MASTER]
                "cell": "AA34",
                "charts": {
                    "chartID": "7aa08c48ee8aeaf8cb392f9a321442918af8388f"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // 玩具狂奏曲 -終焉- [MASTER]
                "cell": "AA36",
                "charts": {
                    "chartID": "cadfc770482538d4fa96fd35056d0a56e35f0d55"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // Aleph-0 [ULTIMA]
                "cell": "AA38",
                "charts": {
                    "chartID": "36c0719ea3e37fff446e8e1ace0ab515544d3d21"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
            {
                // 怒槌 [MASTER]
                "cell": "AA40",
                "charts": {
                    "chartID": "af1774b88a2f71aa973646f81072af066b4f776f"
                },
                "criteria": {
                    "mode": "absolute",
                    "countNum": 1,
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.CLEAR
                }
            },
        ]
    },
    {
        "sheet": "Endgame",
        "goals": [
            {
                // SSS+ 1 chart with in the Level 15+ folder
                "cell": "X7",
                "charts": {
                    "level": ["15+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS_PLUS,
                    "countNum": 1,
                },
            },
            {
                // SSS+ 80 charts in the Level 15 folder
                "cell": "X8",
                "charts": {
                    "level": ["15"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.grade",
                    "value": GRADES.SSS_PLUS,
                    "countNum": 80,
                },
            },
            {
                // ALL JUSTICE CRITICAL 100 charts of MASTER difficulty
                "cell": "X13",
                "charts": {
                    "difficulty": ["MASTER"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE_CRITICAL,
                    "countNum": 100,
                },
            },
            {
                // ALL JUSTICE 30 charts in the Level 15 folder
                "cell": "X14",
                "charts": {
                    "level": ["15"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 30,
                },
            },
            {
                // ALL JUSTICE 120 charts in the Level 14+ folder
                "cell": "X15",
                "charts": {
                    "level": ["14+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.noteLamp",
                    "value": COMBO_LAMPS.ALL_JUSTICE,
                    "countNum": 120,
                },
            },
            {
                // Clear 50 charts in the Level 15 folder with the Absolute skill (<50 J)
                "cell": "X16",
                "charts": {
                    "level": ["15"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.ABSOLUTE,
                    "countNum": 50,
                },
            },
            {
                // Clear 5 charts in the Level 15+ folder with the Brave skill (<150 J)
                "cell": "X17",
                "charts": {
                    "level": ["15+"],
                },
                "criteria": {
                    "mode": "absolute",
                    "key": "scoreData.enumIndexes.clearLamp",
                    "value": CLEAR_LAMPS.BRAVE,
                    "countNum": 5,
                },
            }
        ]
    }
];
