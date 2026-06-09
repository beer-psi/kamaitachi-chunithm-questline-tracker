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
 * [charts-chunithm.json]: https://raw.githubusercontent.com/zkrising/Tachi/refs/heads/main/db/seeds/charts-chunithm.json
 *
 * @typedef {{
 *  cell: string;
 *  charts: Query<ChartDocument>;
 *  criteria: {
 *    mode: "absolute" | "proportion";
 *    key: Leaves<PersonalBest>;
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
        sheet: "Purple",
        goals: [
            {
                // CLEAR 5 charts of MASTER difficulty
                cell: "U7",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 5,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // SS 10 charts in the LEVEL 10 folder
                cell: "U8",
                charts: {
                    level: "10",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SS,
                },
            },
            {
                // S+ 10 charts in the LEVEL 12 folder
                cell: "U9",
                charts: {
                    level: "12",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.S_PLUS,
                },
            },
            {
                // ALL JUSTICE any chart of ADVANCED difficulty
                cell: "U13",
                charts: {
                    difficulty: "ADVANCED",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // S+ 10 charts of MASTER difficulty
                cell: "U14",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.S_PLUS,
                },
            },
            {
                // SSS 5 charts of EXPERT difficulty
                cell: "U15",
                charts: {
                    difficulty: "EXPERT",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 5,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
        ],
    },
    {
        sheet: "Bronze",
        goals: [
            {
                // CLEAR 10 charts of MASTER difficulty
                cell: "U7",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // SS 10 charts in the LEVEL 12 folder
                cell: "U8",
                charts: {
                    level: "12",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SS,
                },
            },
            {
                // S+ 10 charts in the LEVEL 13 folder
                cell: "U9",
                charts: {
                    level: "13",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.S_PLUS,
                },
            },
            {
                // ALL JUSTICE any chart of EXPERT difficulty
                cell: "U13",
                charts: {
                    difficulty: "EXPERT",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // SSS any chart of MASTER difficulty
                cell: "U14",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // SS 10 charts of MASTER difficulty
                cell: "U15",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SS,
                },
            },
            {
                // SSS 20 charts of EXPERT difficulty
                cell: "U16",
                charts: {
                    difficulty: "EXPERT",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 20,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
        ],
    },
    {
        sheet: "Silver",
        goals: [
            {
                // CLEAR 25 charts of MASTER difficulty
                cell: "Z7",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 25,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // SS 10 charts in the Level 13 folder
                cell: "Z8",
                charts: {
                    level: "13",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SS,
                },
            },
            {
                // S+ 10 charts in the Level 13+ folder
                cell: "Z9",
                charts: {
                    level: "13+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.S_PLUS,
                },
            },
            {
                // ALL JUSTICE any chart of MASTER difficulty
                cell: "Z13",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // SSS 5 charts chart of MASTER difficulty
                cell: "Z14",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 5,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // SS 20 charts of MASTER difficulty
                cell: "Z15",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 20,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SS,
                },
            },
            {
                // エンドマークに希望と涙を添えて [EXPERT]
                cell: "F24",
                charts: {
                    id: "C19d35e137922153eec1",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 人生攻略☆Tips [MASTER]
                cell: "F26",
                charts: {
                    id: "C19d35e13f40aba833f9",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 幾四音-Ixion- [MASTER]
                cell: "F28",
                charts: {
                    id: "C19d35e137ce5f2657a9",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // NewStartでReadyGo! [MASTER]
                cell: "F30",
                charts: {
                    id: "C19d35e13f750699fa04",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Yet Another ”drizzly rain” [MASTER]
                cell: "F32",
                charts: {
                    id: "C19d35e137865e855641",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // felys -final remix- [EXPERT]
                cell: "F34",
                charts: {
                    id: "C19d35e13ae04e9fe201",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 幻想即興曲 [EXPERT]
                cell: "F36",
                charts: {
                    id: "C19d35e14064f31c1bc6",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // スン(マイル)フラワー～Sun(Mile)Flower [MASTER]
                cell: "F38",
                charts: {
                    id: "C19d35e140c66102868f",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // リモコン [MASTER]
                cell: "K24",
                charts: {
                    id: "C19d35e13844ca33bbd3",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 3倍！Sun Shine！カーニバル！ [MASTER]
                cell: "K26",
                charts: {
                    id: "C19d35e13fe0efae8bfb",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // シンデレラ [MASTER]
                cell: "K28",
                charts: {
                    id: "C19d35e1403d670a9b58",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // FEEL the BEATS [MASTER]
                cell: "K30",
                charts: {
                    id: "C19d35e139fb636d0eb0",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 三妖精SAY YA!!! [MASTER]
                cell: "K32",
                charts: {
                    id: "C19d35e1404792271e72",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ドリームケッチャー [MASTER]
                cell: "K34",
                charts: {
                    id: "C19d35e141c7c8d7c5be",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ポジティブ・パレード [MASTER]
                cell: "K36",
                charts: {
                    id: "C19d35e13f681b0352ed",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // おいでよ！ 高須らいむランド [MASTER]
                cell: "K38",
                charts: {
                    id: "C19d35e13b558f86e74b",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // CYCLES [MASTER]
                cell: "P24",
                charts: {
                    id: "C19d35e139f9db722c79",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Jump for Joy [MASTER]
                cell: "P26",
                charts: {
                    id: "C19d35e13aebfa808eec",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Magic [MASTER]
                cell: "P28",
                charts: {
                    id: "C19d35e139ee9e66a1c4",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 響 [MASTER]
                cell: "P30",
                charts: {
                    id: "C19d35e1385336184dab",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 夕暮れワンルーム [MASTER]
                cell: "P32",
                charts: {
                    id: "C19d35e137bdca9560c0",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ドーナドーナのうた [MASTER]
                cell: "P34",
                charts: {
                    id: "C19d35e140e6be90c71a",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ハウリング [MASTER]
                cell: "P36",
                charts: {
                    id: "C19d35e13ffbd2dbf7e0",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Palette [MASTER]
                cell: "P38",
                charts: {
                    id: "C19d35e138ead9b9527a",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // アマツキツネ [MASTER]
                cell: "U24",
                charts: {
                    id: "C19d35e138eb6271c854",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // To：Be Continued [ADVANCED]
                cell: "U26",
                charts: {
                    id: "C19d35e140579f8069c7",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // MAXRAGE [EXPERT]
                cell: "U28",
                charts: {
                    id: "C19d35e1406f7d600872",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // MuseDashを作っているPeroPeroGamesさんが倒産しちゃったよ～ [EXPERT]
                cell: "U30",
                charts: {
                    id: "C19d35e14124b8c21791",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // CITRUS MONSTER [EXPERT]
                cell: "U32",
                charts: {
                    id: "C19d35e13a00d09ddf8f",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Walzer für das Nichts [EXPERT]
                cell: "U34",
                charts: {
                    id: "C19d35e13a74cac8441c",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 光線チューニング [MASTER]
                cell: "U36",
                charts: {
                    id: "C19d35e138dd5d2da019",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // イカサマライフゲイム [MASTER]
                cell: "U38",
                charts: {
                    id: "C19d35e137af1923d756",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Breakthrough [EXPERT]
                cell: "AA24",
                charts: {
                    id: "C19d35e13fd3d2c76a69",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 願い星 [MASTER]
                cell: "AA26",
                charts: {
                    id: "C19d35e1383e8f84de1a",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // DETARAME ROCK&ROLL THEORY [MASTER]
                cell: "AA28",
                charts: {
                    id: "C19d35e137d53d9edfd2",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // どこにもいかない [MASTER]
                cell: "AA30",
                charts: {
                    id: "C19d35e14129cda9c41d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // シリョクケンサ [MASTER]
                cell: "AA32",
                charts: {
                    id: "C19d35e137b020302424",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 帝国少女 [MASTER]
                cell: "AA34",
                charts: {
                    id: "C19d35e13f9a747040df",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 天樂 [MASTER]
                cell: "AA36",
                charts: {
                    id: "C19d35e137fef320c771",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // いろは唄 [MASTER]
                cell: "AA38",
                charts: {
                    id: "C19d35e137ff71f23be7",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
        ],
    },
    {
        sheet: "Gold",
        goals: [
            {
                // CLEAR 50 charts of MASTER difficulty
                cell: "Z7",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 50,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // SSS 10 charts in the Level 13 folder
                cell: "Z8",
                charts: {
                    level: "13",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // SS+ 10 charts in the Level 13+ folder
                cell: "Z9",
                charts: {
                    level: "13+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SS_PLUS,
                },
            },
            {
                // SS 10 charts in the Level 14 folder
                cell: "Z10",
                charts: {
                    level: "14",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SS,
                },
            },
            {
                // Get a score of 1,009,900 ("99 AJ") on any chart of EXPERT difficulty
                cell: "Z13",
                charts: {
                    difficulty: "EXPERT",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.score",
                    value: 1009900,
                },
            },
            {
                // ALL JUSTICE 5 charts of MASTER difficulty
                cell: "Z14",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 5,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // SSS 10 charts of MASTER difficulty
                cell: "Z15",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // SS 30 charts of MASTER difficulty
                cell: "Z16",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 30,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SS,
                },
            },
            {
                // Blessed Rain [EXPERT]
                cell: "F24",
                charts: {
                    id: "C19d35e13b6501230455",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // What color... [MASTER]
                cell: "F26",
                charts: {
                    id: "C19d35e13b7324e05967",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 《理想》 ～ Cloudland [MASTER]
                cell: "F28",
                charts: {
                    id: "C19d35e13a82d9f98b86",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ルナティックレッドアイズ [MASTER]
                cell: "F30",
                charts: {
                    id: "C19d35e13f73ad0c9b47",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // FLOWER [MASTER]
                cell: "F32",
                charts: {
                    id: "C19d35e137f6c24b695f",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 生きる [MASTER]
                cell: "F34",
                charts: {
                    id: "C19d35e14041db60d0e7",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // After the rain [ULTIMA]
                cell: "F36",
                charts: {
                    id: "C19d35e1378f6d103836",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 2DVenture [MASTER]
                cell: "F38",
                charts: {
                    id: "C19d35e139e8dbd9769b",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // シル・ヴ・プレジデント [MASTER]
                cell: "K24",
                charts: {
                    id: "C19d35e13fb126bc4201",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // トランスダンスアナーキー [MASTER]
                cell: "K26",
                charts: {
                    id: "C19d35e13a15f763ecbc",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ユックリ feat.餅千歳 [MASTER]
                cell: "K28",
                charts: {
                    id: "C19d35e141103493f759",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // カレシのジュード [MASTER]
                cell: "K30",
                charts: {
                    id: "C19d35e1408c7122e0c6",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // みずいろレインドロップ [MASTER]
                cell: "K32",
                charts: {
                    id: "C19d35e13ffdb12ba355",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ジョハリ [MASTER]
                cell: "K34",
                charts: {
                    id: "C19d35e141cecbdd9ed2",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ヴィラン [MASTER]
                cell: "K36",
                charts: {
                    id: "C19d35e13f12326dbba6",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ケ・セラ・セラ奇想曲 [MASTER]
                cell: "K38",
                charts: {
                    id: "C19d35e13b62d52dc5f3",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // カリスマ煉獄天神 [MASTER]
                cell: "P24",
                charts: {
                    id: "C19d35e140d8827aa26c",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // クレイジー・ビート [MASTER]
                cell: "P26",
                charts: {
                    id: "C19d35e13adf9720b58e",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Cosmic Magic Shooter [MASTER]
                cell: "P28",
                charts: {
                    id: "C19d35e13a999def2d2f",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Tattoo [MASTER]
                cell: "P30",
                charts: {
                    id: "C19d35e13b80b94f1c1d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Limits [MASTER]
                cell: "P32",
                charts: {
                    id: "C19d35e13f5f4d0d01db",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Anemone [ULTIMA]
                cell: "P34",
                charts: {
                    id: "C19d35e1376bbf210423",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ボッカデラベリタ [MASTER]
                cell: "P36",
                charts: {
                    id: "C19d35e13f9858b43d83",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // リンカーネイション [MASTER]
                cell: "P38",
                charts: {
                    id: "C19d35e13a7a9fa8e0fe",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Campus mode!! [MASTER]
                cell: "U24",
                charts: {
                    id: "C19d35e1422b4ffee5e3",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // マチガイサガシ [MASTER]
                cell: "U26",
                charts: {
                    id: "C19d35e1404facfff9a0",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 咲キ誇レ常世ノ華 [MASTER]
                cell: "U28",
                charts: {
                    id: "C19d35e139a79c727651",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // パズルリボン [MASTER]
                cell: "U30",
                charts: {
                    id: "C19d35e13fbe5bfbacb7",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 夢花火 [MASTER]
                cell: "U32",
                charts: {
                    id: "C19d35e139fa24ccd8dc",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // アイロニック [MASTER]
                cell: "U34",
                charts: {
                    id: "C19d35e1404cbc76c6be",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 儚きもの人間 [MASTER]
                cell: "U36",
                charts: {
                    id: "C19d35e138d8c3e8bed2",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // バイオレンストリガー [MASTER]
                cell: "U38",
                charts: {
                    id: "C19d35e13adbead1d599",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // シジョウノコエ VOCALO ver. [MASTER]
                cell: "AA24",
                charts: {
                    id: "C19d35e1387c09607d80",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 恋はりんりん☆あーりんベル [MASTER]
                cell: "AA26",
                charts: {
                    id: "C19d35e13b3f17eca598",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 結んで開いて羅刹と骸 [MASTER]
                cell: "AA28",
                charts: {
                    id: "C19d35e13a928aaa08cb",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // D.E.A.D.L.Y. [MASTER]
                cell: "AA30",
                charts: {
                    id: "C19d35e138308f72418b",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // MAIGAHARA パンチラインキッカーズ [MASTER]
                cell: "AA32",
                charts: {
                    id: "C19d35e14042196f7756",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // お嫁にしなさいっ！ [MASTER]
                cell: "AA34",
                charts: {
                    id: "C19d35e13a479f5a7355",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 風仁雷仁 [MASTER]
                cell: "AA36",
                charts: {
                    id: "C19d35e1385527e6a5ce",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // D✪N’T ST✪P R✪CKIN’ ～[✪_✪] MIX～ [MASTER]
                cell: "AA38",
                charts: {
                    id: "C19d35e1391f129c40a3",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
        ],
    },
    {
        sheet: "Platinum",
        goals: [
            {
                // CLEAR 75 charts of MASTER difficulty
                cell: "Z7",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 75,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // SSS 10 charts in the Level 13+ folder
                cell: "Z8",
                charts: {
                    level: "13+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // SS+ 10 charts in the Level 14 folder
                cell: "Z9",
                charts: {
                    level: "14",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SS_PLUS,
                },
            },
            {
                // SS 20 charts in the Level 14 folder
                cell: "Z10",
                charts: {
                    level: "14",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 20,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SS,
                },
            },
            {
                // Get a score of 1,009,900 ("99 AJ") on any chart of MASTER difficulty
                cell: "Z13",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.score",
                    value: 1009900,
                },
            },
            {
                // ALL JUSTICE 10 charts of MASTER difficulty
                cell: "Z14",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // SSS 25 charts of MASTER difficulty
                cell: "Z15",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 25,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // SS 50 charts of MASTER difficulty
                cell: "Z16",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 50,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SS,
                },
            },
            {
                // やらなきゃいけないことばかり [MASTER]
                cell: "F24",
                charts: {
                    id: "C19d35e13abff375fa96",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ETERNAL DRAIN [MASTER]
                cell: "F26",
                charts: {
                    id: "C19d35e13939bee11f42",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ライトスピード・デイズ [MASTER]
                cell: "F28",
                charts: {
                    id: "C19d35e139db1c77351e",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Energy Booster ～ 上海紅茶館 [MASTER]
                cell: "F30",
                charts: {
                    id: "C19d35e13ad1bcfc6cdb",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // STAGER [MASTER]
                cell: "F32",
                charts: {
                    id: "C19d35e1387023ad2420",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 少女幻葬戦慄曲　～　Necro Fantasia [MASTER]
                cell: "F34",
                charts: {
                    id: "C19d35e137a511990958",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // elegante [ULTIMA]
                cell: "F36",
                charts: {
                    id: "C19d35e137d4c2536d7c",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 聖少女サクリファイス [MASTER]
                cell: "F38",
                charts: {
                    id: "C19d35e139c5fcc788ba",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Wake up Dreamer [MASTER]
                cell: "K24",
                charts: {
                    id: "C19d35e138fc0796d289",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Papyrus [MASTER]
                cell: "K26",
                charts: {
                    id: "C19d35e139d5abd70a41",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 時の冒険者 [MASTER]
                cell: "K28",
                charts: {
                    id: "C19d35e13919f6805ab0",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Paqqin [MASTER]
                cell: "K30",
                charts: {
                    id: "C19d35e1385f6f311d42",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 最愛テトラグラマトン [MASTER]
                cell: "K32",
                charts: {
                    id: "C19d35e138bc44eb742c",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // おこちゃま戦争 [MASTER]
                cell: "K34",
                charts: {
                    id: "C19d35e1389cb4b22739",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Fighting My Way [MASTER]
                cell: "K36",
                charts: {
                    id: "C19d35e1422ce63fe5aa",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // REL0VE REL1VE [MASTER]
                cell: "K38",
                charts: {
                    id: "C19d35e140b189501237",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // アナタニナルノ [MASTER]
                cell: "P24",
                charts: {
                    id: "C19d35e13fc7e6b39b53",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ラブカ？ [MASTER]
                cell: "P26",
                charts: {
                    id: "C19d35e140fd03679898",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 《楽土》 ～ One and Only One [MASTER]
                cell: "P28",
                charts: {
                    id: "C19d35e140cd09eb5164",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // First Light [MASTER]
                cell: "P30",
                charts: {
                    id: "C19d35e14146063bd987",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 乙女戦士☆あーし。 [MASTER]
                cell: "P32",
                charts: {
                    id: "C19d35e14181b52eddc4",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Stronghold LandEater [MASTER]
                cell: "P34",
                charts: {
                    id: "C19d35e14123e3f8ac02",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // GRÄNDIR [MASTER]
                cell: "P36",
                charts: {
                    id: "C19d35e14036b4979e0d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Breakthrough [MASTER]
                cell: "P38",
                charts: {
                    id: "C19d35e13fd3158f4c12",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 舞高最強ドリームセッション!!!!! ～180秒一曲勝負～ [MASTER]
                cell: "U24",
                charts: {
                    id: "C19d35e13fcf092b107a",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Her Majesty [MASTER]
                cell: "U26",
                charts: {
                    id: "C19d35e13871d0c93846",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // オーバーライド [MASTER]
                cell: "U28",
                charts: {
                    id: "C19d35e141ef3d365e05",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Reach For The Stars [ULTIMA]
                cell: "U30",
                charts: {
                    id: "C19d35e13730d343a7a5",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Starting Over [MASTER]
                cell: "U32",
                charts: {
                    id: "C19d35e13fa29ca4acb4",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ケモノガル [MASTER]
                cell: "U34",
                charts: {
                    id: "C19d35e137777c4d353a",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // エンドマークに希望と涙を添えて ～イロドリミドリアレンジ～ [MASTER]
                cell: "U36",
                charts: {
                    id: "C19d35e13ac0dce03060",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // サンシャインサマー☆夏期講習 [MASTER]
                cell: "U38",
                charts: {
                    id: "C19d35e1397ba00215ee",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 名も無い鳥 [MASTER]
                cell: "AA24",
                charts: {
                    id: "C19d35e13768660744a3",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 黒塗り世界宛て書簡 [MASTER]
                cell: "AA26",
                charts: {
                    id: "C19d35e141f1b6043530",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 札付きのワル　～マイケルのうた～ [MASTER]
                cell: "AA28",
                charts: {
                    id: "C19d35e1382cc787ad82",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // Rush B [MASTER]
                cell: "AA30",
                charts: {
                    id: "C19d35e141252de7241c",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // ぷよぷよのうた ピコピコミックス [MASTER]
                cell: "AA32",
                charts: {
                    id: "C19d35e13b48282c3e3e",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // Survive [MASTER]
                cell: "AA34",
                charts: {
                    id: "C19d35e140ac8d2da55f",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // こちら、幸福安心委員会です。 [MASTER]
                cell: "AA36",
                charts: {
                    id: "C19d35e13b5c020d0f85",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // snooze [MASTER]
                cell: "AA38",
                charts: {
                    id: "C19d35e140c961841e85",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
        ],
    },
    {
        sheet: "Rainbow I",
        goals: [
            {
                // Achieve 10 scores of at least 16.25 rating
                cell: "Z7",
                charts: {},
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "calculatedData.rating",
                    value: 16.25,
                },
            },
            {
                // Achieve 30 scores of at least 16.10 rating
                cell: "Z8",
                charts: {},
                criteria: {
                    mode: "absolute",
                    countNum: 30,
                    key: "calculatedData.rating",
                    value: 16.1,
                },
            },
            {
                // SSS 1 chart in the Level 14+ folder
                cell: "Z9",
                charts: {
                    level: "14+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // SS+ 10 charts in the 14+ folder
                cell: "Z10",
                charts: {
                    level: "14+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SS_PLUS,
                },
            },
            {
                // ALL JUSTICE CRITICAL any chart of ADVANCED difficulty
                cell: "Z13",
                charts: {
                    difficulty: "ADVANCED",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE_CRITICAL,
                },
            },
            {
                // ALL JUSTICE 30 charts of MASTER difficulty
                cell: "Z14",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 30,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // Clear 25 charts in the Level 13 folder with the Absolute skill (<50 J)
                cell: "Z15",
                charts: {
                    level: "13",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 25,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.ABSOLUTE,
                },
            },
            {
                // SSS 20 charts in the Level 14 folder
                cell: "Z16",
                charts: {
                    level: "14",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 20,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // SS+ 50 charts in the Level 14 folder
                cell: "Z17",
                charts: {
                    level: "14",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 50,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SS_PLUS,
                },
            },
            {
                // ALL JUSTICE 20 charts of MASTER difficulty
                cell: "Z19",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 20,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // ハジマリノピアノ [MASTER]
                cell: "F30",
                charts: {
                    id: "C19d35e13a6ba91d6f2e",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 鬼KYOKAN [MASTER]
                cell: "F32",
                charts: {
                    id: "C19d35e1383b9f914baa",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Phantasm Brigade [MASTER]
                cell: "F34",
                charts: {
                    id: "C19d35e137ed8f1943b9",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 88D [MASTER]
                cell: "F36",
                charts: {
                    id: "C19d35e13f7d0a237822",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Jade Star [MASTER]
                cell: "F38",
                charts: {
                    id: "C19d35e13af69567e18f",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Technicians High [MASTER]
                cell: "F40",
                charts: {
                    id: "C19d35e13b3e0372cf29",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // フリーフォール [MASTER]
                cell: "K30",
                charts: {
                    id: "C19d35e1409ced088f7e",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 〚隔絶〛 ～Flame of Determination [MASTER]
                cell: "K32",
                charts: {
                    id: "C19d35e141ddfbceae0e",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Wing:No.6223 [MASTER]
                cell: "K34",
                charts: {
                    id: "C19d35e1424929b0d92d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Baqeela [MASTER]
                cell: "K36",
                charts: {
                    id: "C19d35e13f94c1ebb5b2",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // アマツカミ [MASTER]
                cell: "K38",
                charts: {
                    id: "C19d35e14075f6d8c727",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Infantoon Fantasy [ULTIMA]
                cell: "K40",
                charts: {
                    id: "C19d35e1377184207866",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // チューリングの跡 [EXPERT]
                cell: "P30",
                charts: {
                    id: "C19d35e141705e42a946",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 宙の隣 [MASTER]
                cell: "P32",
                charts: {
                    id: "C19d35e13b25ba610fe5",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Sunlight Starlight [MASTER]
                cell: "P34",
                charts: {
                    id: "C19d35e1414338183fe8",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 《真紅》 ～ Pavane Pour La Flamme [MASTER]
                cell: "P36",
                charts: {
                    id: "C19d35e140cc384fd6b8",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // luminoid love PART2 [MASTER]
                cell: "P38",
                charts: {
                    id: "C19d35e142485cd69168",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // トリスメギストス [MASTER]
                cell: "P40",
                charts: {
                    id: "C19d35e138e23d5d718c",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 奏者はただ背中と提琴で語るのみ [MASTER]
                cell: "U30",
                charts: {
                    id: "C19d35e13901a456b324",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 再生不能 [MASTER]
                cell: "U32",
                charts: {
                    id: "C19d35e13b8226853c6b",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // イカサマライフゲイム [ULTIMA]
                cell: "U34",
                charts: {
                    id: "C19d35e137af4b12d0fc",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Idoratrize World [MASTER]
                cell: "U36",
                charts: {
                    id: "C19d35e1426dfab4daed",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 電脳少女は歌姫の夢を見るか？ [MASTER]
                cell: "U38",
                charts: {
                    id: "C19d35e13f14f7ee7ae6",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 幻想のサテライト [MASTER]
                cell: "U40",
                charts: {
                    id: "C19d35e1385d48ae36ac",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // bubble attack [MASTER]
                cell: "AA30",
                charts: {
                    id: "C19d35e139174b12907f",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // ASH [MASTER]
                cell: "AA32",
                charts: {
                    id: "C19d35e1409999ebf85c",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // The wheel to the Night ～インド人が夢に!?～ [MASTER]
                cell: "AA34",
                charts: {
                    id: "C19d35e138ca49ffd44d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // Vibrant Verve [MASTER]
                cell: "AA36",
                charts: {
                    id: "C19d35e13a52c55b63ba",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // Jack-the-Ripper◆ [MASTER]
                cell: "AA38",
                charts: {
                    id: "C19d35e137f0b121121d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // GEMINI -C- [MASTER]
                cell: "AA40",
                charts: {
                    id: "C19d35e137f5fef78b4d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
        ],
    },
    {
        sheet: "Rainbow II",
        goals: [
            {
                // Achieve 10 scores of at least 16.50 rating
                cell: "Z7",
                charts: {},
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "calculatedData.rating",
                    value: 16.5,
                },
            },
            {
                // Achieve 30 scores of at least 16.35 rating
                cell: "Z8",
                charts: {},
                criteria: {
                    mode: "absolute",
                    countNum: 30,
                    key: "calculatedData.rating",
                    value: 16.35,
                },
            },
            {
                // SSS 5 charts in the Level 14+ folder
                cell: "Z9",
                charts: {
                    level: "14+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 5,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // SS+ 20 charts in the 14+ folder
                cell: "Z10",
                charts: {
                    level: "14+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 20,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SS_PLUS,
                },
            },
            {
                // ALL JUSTICE CRITICAL any chart of EXPERT difficulty
                cell: "Z13",
                charts: {
                    difficulty: "EXPERT",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE_CRITICAL,
                },
            },
            {
                // ALL JUSTICE 10 charts in the Level 13 folder
                cell: "Z14",
                charts: {
                    level: "13",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // Clear 30 charts in the Level 13+ folder with the Absolute skill (<50 J)
                cell: "Z15",
                charts: {
                    level: "13+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 30,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.ABSOLUTE,
                },
            },
            {
                // SSS 40 charts in the Level 14 folder
                cell: "Z16",
                charts: {
                    level: "14",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 40,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // SS+ 60 charts in the Level 14 folder
                cell: "Z17",
                charts: {
                    level: "14",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 60,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SS_PLUS,
                },
            },
            {
                // ALL JUSTICE 40 charts of MASTER difficulty
                cell: "Z20",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 40,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // ゴールドビジョン [MASTER]
                cell: "F30",
                charts: {
                    id: "C19d35e13a162ba23c4f",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // On your mark (104期 Ver.) [MASTER]
                cell: "F32",
                charts: {
                    id: "C19d35e141b018656e21",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // felys -final remix- [MASTER]
                cell: "F34",
                charts: {
                    id: "C19d35e13ae0cc884a97",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // jaQup [MASTER]
                cell: "F36",
                charts: {
                    id: "C19d35e1420338312024",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Name of oath [MASTER]
                cell: "F38",
                charts: {
                    id: "C19d35e138b2248d5f3c",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Akasagarbha -reincarnate- [MASTER]
                cell: "F40",
                charts: {
                    id: "C19d35e13f7b077666ae",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Komplexe [MASTER]
                cell: "K30",
                charts: {
                    id: "C19d35e13fc55147f5c5",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // BlazinG AIR [MASTER]
                cell: "K32",
                charts: {
                    id: "C19d35e1394306e75667",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Twilight [MASTER]
                cell: "K34",
                charts: {
                    id: "C19d35e13967f37ad1f3",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // シャッキーーン！！ [MASTER]
                cell: "K36",
                charts: {
                    id: "C19d35e13ac5d3d8062f",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Wildfire [MASTER]
                cell: "K38",
                charts: {
                    id: "C19d35e1403036730b23",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Valsqotch [MASTER]
                cell: "K40",
                charts: {
                    id: "C19d35e13fa7e499e662",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // PRAGMATISM -RESURRECTION- [MASTER]
                cell: "P30",
                charts: {
                    id: "C19d35e1405f775cf80c",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // StufeStern [MASTER]
                cell: "P32",
                charts: {
                    id: "C19d35e139eb4c75dcfc",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Moon of Noon [MASTER]
                cell: "P34",
                charts: {
                    id: "C19d35e14067c07b5404",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Tidal Wave [MASTER]
                cell: "P36",
                charts: {
                    id: "C19d35e138322192d0dd",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // きゅびびびびずむ [MASTER]
                cell: "P38",
                charts: {
                    id: "C19d35e14267bc03e8b4",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // U ARE [MASTER]
                cell: "P40",
                charts: {
                    id: "C19d35e13af9e90c53df",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // MAXRAGE [MASTER]
                cell: "U30",
                charts: {
                    id: "C19d35e1406f64a52ead",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ぜったい！昇天★鎮魂歌♂ [MASTER]
                cell: "U32",
                charts: {
                    id: "C19d35e139e9ebdd5250",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // プナイプナイたいそう [MASTER]
                cell: "U34",
                charts: {
                    id: "C19d35e13f803dd445cb",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // オススメ☆♂♀☆でぃすとぴあ [MASTER]
                cell: "U36",
                charts: {
                    id: "C19d35e13882ed8192d7",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // めっちゃ煽ってくるタイプの音ゲーボス曲ちゃんなんかに負けないが？？？？？ [MASTER]
                cell: "U38",
                charts: {
                    id: "C19d35e1402d953ccffb",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // おしゃまなプリンセス [MASTER]
                cell: "U40",
                charts: {
                    id: "C19d35e1418283651a29",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Satellite System ft.Diana Chiaki [MASTER]
                cell: "AA30",
                charts: {
                    id: "C19d35e13f2beedac151",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // チョウの標本 [MASTER]
                cell: "AA32",
                charts: {
                    id: "C19d35e13ab366d35557",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // Warp Speed [MASTER]
                cell: "AA34",
                charts: {
                    id: "C19d35e14273a949cd55",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // Love's Theme of BADASS ～バッド・アス 愛のテーマ～ [MASTER]
                cell: "AA36",
                charts: {
                    id: "C19d35e1412023f084d0",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // Genesis [MASTER]
                cell: "AA38",
                charts: {
                    id: "C19d35e13772a2f26e1b",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // TECHNOPOLIS 2085 [MASTER]
                cell: "AA40",
                charts: {
                    id: "C19d35e13b7d809a3d17",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
        ],
    },
    {
        sheet: "Rainbow III",
        goals: [
            {
                // Achieve 10 scores of at least 16.75 rating
                cell: "Z7",
                charts: {},
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "calculatedData.rating",
                    value: 16.75,
                },
            },
            {
                // Achieve 30 scores of at least 16.60 rating
                cell: "Z8",
                charts: {},
                criteria: {
                    mode: "absolute",
                    countNum: 30,
                    key: "calculatedData.rating",
                    value: 16.6,
                },
            },
            {
                // SSS 20 charts in the Level 14+ folder
                cell: "Z9",
                charts: {
                    level: "14+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 20,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // SS+ 40 charts in the 14+ folder
                cell: "Z10",
                charts: {
                    level: "14+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 40,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SS_PLUS,
                },
            },
            {
                // ALL JUSTICE CRITICAL any chart of MASTER difficulty
                cell: "Z13",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE_CRITICAL,
                },
            },
            {
                // ALL JUSTICE 20 charts in the Level 14 folder
                cell: "Z14",
                charts: {
                    level: "14",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 20,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // Clear 30 charts in the Level 14 folder with the Absolute skill (<50 J)
                cell: "Z15",
                charts: {
                    level: "14",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 30,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.ABSOLUTE,
                },
            },
            {
                // Clear 30 charts in the Level 14+ folder with the Brave skill (<150 J)
                cell: "Z16",
                charts: {
                    level: "14+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 30,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.BRAVE,
                },
            },
            {
                // SSS 60 charts in the Level 14 folder
                cell: "Z17",
                charts: {
                    level: "14",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 60,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ALL JUSTICE 70 charts of MASTER difficulty
                cell: "Z20",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 70,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // Destined Marionette [MASTER]
                cell: "F30",
                charts: {
                    id: "C19d35e142268950b59d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // アルストロメリア [ULTIMA]
                cell: "F32",
                charts: {
                    id: "C19d35e1381521cbebd0",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 本物のヒーローとの戦い [MASTER]
                cell: "F34",
                charts: {
                    id: "C19d35e14111ec6fcd1c",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Alcyone [MASTER]
                cell: "F36",
                charts: {
                    id: "C19d35e1413901e7255e",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Sage [MASTER]
                cell: "F38",
                charts: {
                    id: "C19d35e1412fec549321",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 〚盲従〛 ～Fantasia Sonata Flower [MASTER]
                cell: "F40",
                charts: {
                    id: "C19d35e141df674aafa8",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Destr0yer [MASTER]
                cell: "K30",
                charts: {
                    id: "C19d35e13a6fbb32ea58",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Good bye, Merry-Go-Round. [MASTER]
                cell: "K32",
                charts: {
                    id: "C19d35e13b53afe4e5d9",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // VALLIS-NERIA [MASTER]
                cell: "K34",
                charts: {
                    id: "C19d35e141168427a582",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // WE'RE BACK!! [MASTER]
                cell: "K36",
                charts: {
                    id: "C19d35e13fe9f6e6ae83",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // GEOMETRIC DANCE [MASTER]
                cell: "K38",
                charts: {
                    id: "C19d35e140e4baf83f64",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // B100d Hunter [MASTER]
                cell: "K40",
                charts: {
                    id: "C19d35e13b111e5c1249",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Tango Rouge [MASTER]
                cell: "P30",
                charts: {
                    id: "C19d35e137904ac1f29a",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Daydreama [MASTER]
                cell: "P32",
                charts: {
                    id: "C19d35e14242107e2cde",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 花と、雪と、ドラムンベース。 [MASTER]
                cell: "P34",
                charts: {
                    id: "C19d35e13f95c37b05e8",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 空間創造理論 [MASTER]
                cell: "P36",
                charts: {
                    id: "C19d35e140bc758282b3",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Hyperion [ULTIMA]
                cell: "P38",
                charts: {
                    id: "C19d35e138113c216c03",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // LiftOff [MASTER]
                cell: "P40",
                charts: {
                    id: "C19d35e140a4317a90c4",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 初音ミクの消失 [MASTER]
                cell: "U30",
                charts: {
                    id: "C19d35e13731d6f64a1c",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // †大闘士＝クライン・フォーゲル・シュピール＝えりか† [MASTER]
                cell: "U32",
                charts: {
                    id: "C19d35e1403a1296688d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ハードコア・シンドローム [MASTER]
                cell: "U34",
                charts: {
                    id: "C19d35e13afa1368c722",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ウニの歌 [MASTER]
                cell: "U36",
                charts: {
                    id: "C19d35e1413fb5e0ce58",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Last Celebration [MASTER]
                cell: "U38",
                charts: {
                    id: "C19d35e13b12ed38e00b",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Everlasting Liberty [MASTER]
                cell: "U40",
                charts: {
                    id: "C19d35e13fc0e06c816a",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Blue Noise [MASTER]
                cell: "AA30",
                charts: {
                    id: "C19d35e1374b9bc3a00b",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 閃鋼のブリューナク [MASTER]
                cell: "AA32",
                charts: {
                    id: "C19d35e137b8d5028483",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 《本能》 ～ ReCoda [MASTER]
                cell: "AA34",
                charts: {
                    id: "C19d35e13b39711cf495",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 〚空虚〛 ～Pyrophilia [MASTER]
                cell: "AA36",
                charts: {
                    id: "C19d35e141e08f2a5e29",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 月の光 [MASTER]
                cell: "AA38",
                charts: {
                    id: "C19d35e14065b3c2ddb2",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // GOLDEN RULE [MASTER]
                cell: "AA40",
                charts: {
                    id: "C19d35e13767ed5ddb8c",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
        ],
    },
    {
        sheet: "Rainbow IV",
        goals: [
            {
                // Achieve 10 scores of at least 17.00 rating
                cell: "Z7",
                charts: {},
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "calculatedData.rating",
                    value: 17,
                },
            },
            {
                // Achieve 30 scores of at least 16.85 rating
                cell: "Z8",
                charts: {},
                criteria: {
                    mode: "absolute",
                    countNum: 30,
                    key: "calculatedData.rating",
                    value: 16.85,
                },
            },
            {
                // SSS 5 charts in the Level 15 folder
                cell: "Z9",
                charts: {
                    level: "15",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 5,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // SS+ 30 charts in the Level 15 folder
                cell: "Z10",
                charts: {
                    level: "15",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 30,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SS_PLUS,
                },
            },
            {
                // ALL JUSTICE CRITICAL 10 charts of MASTER difficulty
                cell: "Z13",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE_CRITICAL,
                },
            },
            {
                // ALL JUSTICE 5 charts in the Level 14+ folder
                cell: "Z14",
                charts: {
                    level: "14+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 5,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // Clear 60 charts in the Level 14 folder with the Absolute skill (<50 J)
                cell: "Z15",
                charts: {
                    level: "14",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 60,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.ABSOLUTE,
                },
            },
            {
                // Clear 60 charts in the Level 14+ folder with the Brave skill (<150 J)
                cell: "Z16",
                charts: {
                    level: "14+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 60,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.BRAVE,
                },
            },
            {
                // SSS 60 charts in the Level 14+ folder
                cell: "Z17",
                charts: {
                    level: "14+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 60,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Obtain Silver Possession (S on all MASTER and ULTIMA charts)
                cell: "Z19",
                charts: {
                    difficulty: ["MASTER", "ULTIMA"],
                },
                criteria: {
                    mode: "proportion",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.S,
                },
            },
            {
                // ALL JUSTICE 100 charts of MASTER difficulty
                cell: "Z21",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 100,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // Sparking Revolver [MASTER]
                cell: "F30",
                charts: {
                    id: "C19d35e139543b949a7d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // MEGATON BLAST [MASTER]
                cell: "F32",
                charts: {
                    id: "C19d35e13a9055660f38",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // DEvourER [MASTER]
                cell: "F34",
                charts: {
                    id: "C19d35e14280ecf0807d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Sheriruth [MASTER]
                cell: "F36",
                charts: {
                    id: "C19d35e14062501d1145",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 夕焼けのRed Parade [MASTER]
                cell: "F38",
                charts: {
                    id: "C19d35e139ea53eccc8a",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Aiolos [MASTER]
                cell: "F40",
                charts: {
                    id: "C19d35e140b394d3c0fb",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 色彩過剰のダイアリーミュージック [MASTER]
                cell: "K30",
                charts: {
                    id: "C19d35e13fde9b26432d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Grievous Lady [MASTER]
                cell: "K32",
                charts: {
                    id: "C19d35e13a1ed0078b3d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Sound Chimera [MASTER]
                cell: "K34",
                charts: {
                    id: "C19d35e13abe4ffdd1b0",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Hainuwele [MASTER]
                cell: "K36",
                charts: {
                    id: "C19d35e13afb538bdea1",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Don't Fight The Music [MASTER]
                cell: "K38",
                charts: {
                    id: "C19d35e13f64cbf6d443",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // TEmPTaTiON [MASTER]
                cell: "K40",
                charts: {
                    id: "C19d35e14010c37f6bc1",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // G e n g a o z o [MASTER]
                cell: "P30",
                charts: {
                    id: "C19d35e139271ac2bfea",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ÅMARA (大未来電脳) [MASTER]
                cell: "P32",
                charts: {
                    id: "C19d35e14151bc5efc36",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 猛進ソリストライフ！ [ULTIMA]
                cell: "P34",
                charts: {
                    id: "C19d35e13877d377755a",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Yorugao [MASTER]
                cell: "P36",
                charts: {
                    id: "C19d35e140ec2a03374a",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 7thSense [MASTER]
                cell: "P38",
                charts: {
                    id: "C19d35e14214baceb3cc",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Megameteor [MASTER]
                cell: "P40",
                charts: {
                    id: "C19d35e13a9fa8f17f79",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // FLUFFY FLASH [MASTER]
                cell: "U30",
                charts: {
                    id: "C19d35e1405d6b18fc37",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 腐れ外道とチョコレゐト [ULTIMA]
                cell: "U32",
                charts: {
                    id: "C19d35e137a1a17c3afb",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Burn it All [MASTER]
                cell: "U34",
                charts: {
                    id: "C19d35e1412286c33eb8",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Exitium [MASTER]
                cell: "U36",
                charts: {
                    id: "C19d35e140832710475a",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 真千年女王 [MASTER]
                cell: "U38",
                charts: {
                    id: "C19d35e13b75698122ce",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Blackmagik Blazing [MASTER]
                cell: "U40",
                charts: {
                    id: "C19d35e13aefc30da016",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Hardsync [MASTER]
                cell: "AA30",
                charts: {
                    id: "C19d35e142779fdbe748",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 4月1日でございました [MASTER]
                cell: "AA32",
                charts: {
                    id: "C19d35e14069d119b016",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // L'épisode [MASTER]
                cell: "AA34",
                charts: {
                    id: "C19d35e13784cd39aa6f",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 魔理沙は大変なものを盗んでいきました [ULTIMA]
                cell: "AA36",
                charts: {
                    id: "C19d35e1378d07368fa4",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // Kattobi KEIKYU Rider [MASTER]
                cell: "AA38",
                charts: {
                    id: "C19d35e138e6bbe43df6",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 神威 (NAOKI × ZPP MIX) [MASTER]
                cell: "AA40",
                charts: {
                    id: "C19d35e13a67ac487834",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
        ],
    },
    {
        sheet: "Kiwami I",
        goals: [
            {
                // Achieve 10 scores of at least 17.25 rating
                cell: "Z7",
                charts: {},
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "calculatedData.rating",
                    value: 17.25,
                },
            },
            {
                // Achieve 30 scores of at least 17.10 rating
                cell: "Z8",
                charts: {},
                criteria: {
                    mode: "absolute",
                    countNum: 30,
                    key: "calculatedData.rating",
                    value: 17.1,
                },
            },
            {
                // SSS+ 20 charts in the Level 15 folder
                cell: "Z9",
                charts: {
                    level: "15",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 20,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS_PLUS,
                },
            },
            {
                // SSS+ 115 charts in the Level 14+ folder
                cell: "Z10",
                charts: {
                    level: "14+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 115,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS_PLUS,
                },
            },
            {
                // SSS 40 charts in the Level 15 folder
                cell: "Z11",
                charts: {
                    level: "15",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 40,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ALL JUSTICE CRITICAL 25 charts of MASTER difficulty
                cell: "Z13",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 25,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE_CRITICAL,
                },
            },
            {
                // ALL JUSTICE 20 charts in the Level 14+ folder
                cell: "Z14",
                charts: {
                    level: "14+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 20,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // Clear 60 charts in the Level 14+ folder with the Absolute skill (<50 J)
                cell: "Z15",
                charts: {
                    level: "14+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 60,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.ABSOLUTE,
                },
            },
            {
                // Clear 40 charts in the Level 15 folder with the Brave skill (<150 J)
                cell: "Z16",
                charts: {
                    level: "15",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 40,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.BRAVE,
                },
            },
            {
                // SSS+ 170 charts in the Level 14 folder
                cell: "Z17",
                charts: {
                    level: "14",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 170,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS_PLUS,
                },
            },
            {
                // ALL JUSTICE 500 charts of MASTER difficulty
                cell: "Z22",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 500,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // 超最終鬼畜妹フランドール・S [MASTER]
                cell: "F30",
                charts: {
                    id: "C19d35e142181ceb572d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // neu [MASTER]
                cell: "F32",
                charts: {
                    id: "C19d35e140912958dade",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Cult future [MASTER]
                cell: "F34",
                charts: {
                    id: "C19d35e140bfa38499f0",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 其のエメラルドを見よ [MASTER]
                cell: "F36",
                charts: {
                    id: "C19d35e1415ce9e63b6c",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 幻想即興曲 [MASTER]
                cell: "F38",
                charts: {
                    id: "C19d35e14064bc0beb7d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // A c i - L [MASTER]
                cell: "F40",
                charts: {
                    id: "C19d35e142291588c9e3",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 電光石火 [MASTER]
                cell: "K30",
                charts: {
                    id: "C19d35e13a0cd5aa5ba1",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Blazing:Storm [MASTER]
                cell: "K32",
                charts: {
                    id: "C19d35e13b5ad64aa702",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // あの日、あの部屋で、あったこと [MASTER]
                cell: "K34",
                charts: {
                    id: "C19d35e142528b70c804",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Xevel [MASTER]
                cell: "K36",
                charts: {
                    id: "C19d35e13902b211bed3",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 並行天涯 [MASTER]
                cell: "K38",
                charts: {
                    id: "C19d35e14247326f565e",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // GIGA DRIVE [MASTER]
                cell: "K40",
                charts: {
                    id: "C19d35e14247326f565e",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 《破滅》 ～ Rhapsody for The End [MASTER]
                cell: "K42",
                charts: {
                    id: "C19d35e14247326f565e",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Opfer [MASTER]
                cell: "P30",
                charts: {
                    id: "C19d35e13a66a1d2a055",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Iudicium [MASTER]
                cell: "P32",
                charts: {
                    id: "C19d35e138ff11552d27",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ニルヴの心臓 [MASTER]
                cell: "P34",
                charts: {
                    id: "C19d35e1423fb12003df",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Big Bang [MASTER]
                cell: "P36",
                charts: {
                    id: "C19d35e1411706e7da59",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // YURUSHITE [MASTER]
                cell: "P38",
                charts: {
                    id: "C19d35e13a3fd2431cbc",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 《創造》 ～ Cries, beyond The End [MASTER]
                cell: "P40",
                charts: {
                    id: "C19d35e140d178a2e72c",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 神威 [MASTER]
                cell: "P42",
                charts: {
                    id: "C19d35e138af8ca5ab1f",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Glorious Crown (tpz over-Over-OVERCUTE REMIX) [MASTER]
                cell: "U30",
                charts: {
                    id: "C19d35e138e76ccf5dde",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // L9 [ULTIMA]
                cell: "U32",
                charts: {
                    id: "C19d35e13757a0b4b08b",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // eden [MASTER]
                cell: "U34",
                charts: {
                    id: "C19d35e1408405743fc0",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // マシンガンポエムドール [MASTER]
                cell: "U36",
                charts: {
                    id: "C19d35e14185efd5425a",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 赤壁、大炎上！！ [MASTER]
                cell: "U38",
                charts: {
                    id: "C19d35e13b3b0bcf272a",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ジングルベル [ULTIMA]
                cell: "AA30",
                charts: {
                    id: "C19d35e137ca995c0e01",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 宛城、炎上！！ [MASTER]
                cell: "AA32",
                charts: {
                    id: "C19d35e137959a729b17",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 脳漿炸裂ガール [MASTER]
                cell: "AA34",
                charts: {
                    id: "C19d35e137d2f3bb50b2",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // Armageddon [MASTER]
                cell: "AA36",
                charts: {
                    id: "C19d35e140228e2e7c47",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // SON OF SUN [ULTIMA]
                cell: "AA38",
                charts: {
                    id: "C19d35e13aa6f8f8e361",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // Gate of Fate [ULTIMA]
                cell: "AA40",
                charts: {
                    id: "C19d35e13769e503c137",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
        ],
    },
    {
        sheet: "Kiwami II",
        goals: [
            {
                // Achieve 10 scores of at least 17.50 rating
                cell: "Z7",
                charts: {},
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "calculatedData.rating",
                    value: 17.5,
                },
            },
            {
                // Achieve 30 scores of at least 17.35 rating
                cell: "Z8",
                charts: {},
                criteria: {
                    mode: "absolute",
                    countNum: 30,
                    key: "calculatedData.rating",
                    value: 17.35,
                },
            },
            {
                // SSS+ 40 charts in the Level 15 folder
                cell: "Z9",
                charts: {
                    level: "15",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 40,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS_PLUS,
                },
            },
            {
                // SSS+ 170 charts in the Level 14+ folder
                cell: "Z10",
                charts: {
                    level: "14+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 170,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS_PLUS,
                },
            },
            {
                // SSS 80 charts in the Level 15 folder
                cell: "Z11",
                charts: {
                    level: "15",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 80,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ALL JUSTICE CRITICAL 50 charts of MASTER difficulty
                cell: "Z13",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 50,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE_CRITICAL,
                },
            },
            {
                // ALL JUSTICE 60 charts in the Level 14+ folder
                cell: "Z14",
                charts: {
                    level: "14+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 60,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // ALL JUSTICE 270 charts in the Level 14 folder
                cell: "Z15",
                charts: {
                    level: "14",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 270,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // Clear 120 charts in the Level 14+ folder with the Absolute skill (<50 J)
                cell: "Z16",
                charts: {
                    level: "14+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 120,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.ABSOLUTE,
                },
            },
            {
                // Clear 80 charts in the Level 15 folder with the Brave skill (<150 J)
                cell: "Z17",
                charts: {
                    level: "15",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 80,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.BRAVE,
                },
            },
            {
                // ALL JUSTICE 1000 charts of MASTER difficulty
                cell: "Z23",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1000,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // Kaleidoscope [MASTER]
                cell: "F30",
                charts: {
                    id: "C19d35e142826a9fb075",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Scythe of Death [MASTER]
                cell: "F32",
                charts: {
                    id: "C19d35e13fd476e052ac",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // What's up? Pop! [MASTER]
                cell: "F34",
                charts: {
                    id: "C19d35e1419917f58669",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Killing Rhythm [MASTER]
                cell: "F36",
                charts: {
                    id: "C19d35e13a3814d78edf",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // キミとボクへの葬送歌 [MASTER]
                cell: "F38",
                charts: {
                    id: "C19d35e14224d9238021",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // 輪廻玲々 [MASTER]
                cell: "F40",
                charts: {
                    id: "C19d35e1427686dc9c7d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // βlαnoir [MASTER]
                cell: "F42",
                charts: {
                    id: "C19d35e140bda6c97f99",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Contrapasso -inferno- [MASTER]
                cell: "K30",
                charts: {
                    id: "C19d35e137f46003112f",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ANU [MASTER]
                cell: "K32",
                charts: {
                    id: "C19d35e13b29bd05b871",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Theatore Creatore [ULTIMA]
                cell: "K34",
                charts: {
                    id: "C19d35e141cdd0eb56cf",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Stardust:RAY [MASTER]
                cell: "K36",
                charts: {
                    id: "C19d35e141590ea57f9e",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Trrricksters!! [MASTER]
                cell: "K38",
                charts: {
                    id: "C19d35e13aa090e9f56b",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Everything Will Be One [MASTER]
                cell: "K40",
                charts: {
                    id: "C19d35e14260c0c57b9f",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Crush the Dystopia [MASTER]
                cell: "K42",
                charts: {
                    id: "C19d35e141edf63e0753",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ZegalltA [MASTER]
                cell: "P30",
                charts: {
                    id: "C19d35e1413e12c9d58d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // リ・フィクション・O [MASTER]
                cell: "P32",
                charts: {
                    id: "C19d35e14162594af1c8",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // X7124 [MASTER]
                cell: "P34",
                charts: {
                    id: "C19d35e13b679465e474",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // parvorbital [MASTER]
                cell: "P36",
                charts: {
                    id: "C19d35e13f784fd7c80a",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Strange Love [MASTER]
                cell: "P38",
                charts: {
                    id: "C19d35e13f7af91b513c",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // macrocosmos [MASTER]
                cell: "P40",
                charts: {
                    id: "C19d35e138fe90318f71",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Acid God [MASTER]
                cell: "P42",
                charts: {
                    id: "C19d35e14190a29b5391",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ΩΩPARTS
                cell: "U30",
                charts: {
                    id: "C19d35e141195076582e",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Invisible Frenzy [MASTER]
                cell: "U32",
                charts: {
                    id: "C19d35e1409dc39e1d19",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Galaxy Collapse [MASTER]
                cell: "U34",
                charts: {
                    id: "C19d35e1426f396379ae",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // TiamaT:F minor [MASTER]
                cell: "U36",
                charts: {
                    id: "C19d35e1382e69ae27db",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // The Devil Incarnate [MASTER]
                cell: "U38",
                charts: {
                    id: "C19d35e141cce8cbe35c",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // OUTRAGE [MASTER]
                cell: "U40",
                charts: {
                    id: "C19d35e1426b5adc0ec0",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // ENDYMION [MASTER]
                cell: "U42",
                charts: {
                    id: "C19d35e13fbaa7b5794a",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // Reverberate [MASTER]
                cell: "AA30",
                charts: {
                    id: "C19d35e13fd2e5c5421d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // LibrariA [MASTER]
                cell: "AA32",
                charts: {
                    id: "C19d35e1418bb7f63256",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // POTENTIAL [MASTER]
                cell: "AA34",
                charts: {
                    id: "C19d35e13fa39f87172c",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // luna blu [ULTIMA]
                cell: "AA36",
                charts: {
                    id: "C19d35e13776b98e3bd6",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 玩具狂奏曲 -終焉- [MASTER]
                cell: "AA38",
                charts: {
                    id: "C19d35e1380680d41f6c",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // Aleph-0 [ULTIMA]
                cell: "AA40",
                charts: {
                    id: "C19d35e138d9c136a88d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
            {
                // 怒槌 [MASTER]
                cell: "AA42",
                charts: {
                    id: "C19d35e137dfdff54d98",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.CLEAR,
                },
            },
        ],
    },
    {
        sheet: "Endgame",
        goals: [
            {
                // Achieve 10 scores of at least 17.65 rating
                cell: "X7",
                charts: {},
                criteria: {
                    mode: "absolute",
                    countNum: 10,
                    key: "calculatedData.rating",
                    value: 17.65,
                },
            },
            {
                // Achieve 30 scores of at least 17.50 rating
                cell: "X8",
                charts: {},
                criteria: {
                    mode: "absolute",
                    countNum: 30,
                    key: "calculatedData.rating",
                    value: 17.5,
                },
            },
            {
                // SSS+ 5 charts with in the Level 15+ folder
                cell: "X9",
                charts: {
                    level: "15+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 5,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS_PLUS,
                },
            },
            {
                // SSS+ 80 charts in the Level 15 folder
                cell: "X10",
                charts: {
                    level: "15",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 80,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS_PLUS,
                },
            },
            {
                // ALL JUSTICE CRITICAL 100 charts of MASTER difficulty
                cell: "X13",
                charts: {
                    difficulty: "MASTER",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 100,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE_CRITICAL,
                },
            },
            {
                // ALL JUSTICE 40 charts in the Level 15 folder
                cell: "X14",
                charts: {
                    level: "15",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 40,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // ALL JUSTICE 130 charts in the Level 14+ folder
                cell: "X15",
                charts: {
                    level: "14+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 130,
                    key: "scoreData.enumIndexes.noteLamp",
                    value: COMBO_LAMPS.ALL_JUSTICE,
                },
            },
            {
                // Clear 40 charts in the Level 15 folder with the Absolute skill (<50 J)
                cell: "X16",
                charts: {
                    level: "15",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 40,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.ABSOLUTE,
                },
            },
            {
                // Clear 18 charts in the Level 15+ folder with the Brave skill (<150 J)
                cell: "X17",
                charts: {
                    level: "15+",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 18,
                    key: "scoreData.enumIndexes.clearLamp",
                    value: CLEAR_LAMPS.BRAVE,
                },
            },
            {
                // SSS Melodiniq ULTIMA
                cell: "X22",
                charts: {
                    id: "C19e107c92745f47dbd7",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
            {
                // SSS Melodiniq ULTIMA
                cell: "X23",
                charts: {
                    id: "C19e107c926fa55bee6d",
                },
                criteria: {
                    mode: "absolute",
                    countNum: 1,
                    key: "scoreData.enumIndexes.grade",
                    value: GRADES.SSS,
                },
            },
        ],
    },
];
