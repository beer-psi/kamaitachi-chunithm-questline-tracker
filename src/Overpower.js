// SPDX-License-Identifier: MIT
/**
 * OVERPOWER (OP) computation, obviously stolen from chuni penguin.
 *
 * All values are kept in integer "micro-units" (OP * 1000000).
 */

/**
 * @param {number} levelNum The chart's internal level (e.g. 14.5).
 * @returns {number} internal_level * 10000, as an exact integer.
 */
function il10000FromLevelNum(levelNum) {
    return Math.round(levelNum * 10000);
}

/**
 * The "whole rating" (rating * 10000) for a score on a chart, as an integer.
 * @param {number} score
 * @param {number} il10000 internal_level * 10000
 * @returns {number}
 */
function calculateWholeRating(score, il10000) {
    if (score >= 1009000) return il10000 + 21500;
    if (score >= 1007500) return il10000 + 20000 + (score - 1007500);
    if (score >= 1005000) return il10000 + 15000 + (score - 1005000) * 2;
    if (score >= 1000000) return il10000 + 10000 + (score - 1000000);
    if (score >= 975000) return il10000 + Math.floor((score - 975000) * 2 / 5);
    if (score >= 900000) {
        const effective = Math.max(il10000 - 50000, 0);
        return Math.floor(effective + (score - 900000) / 75000 * (il10000 - effective));
    }
    if (score >= 800000) {
        const effective = Math.max(il10000 - 50000, 0);
        return Math.floor(effective / 2 + (score - 800000) / 100000 * (effective / 2));
    }
    if (score >= 500000) {
        const effective = Math.max(il10000 - 50000, 0);
        return Math.floor((score - 500000) / 300000 * (effective / 2));
    }
    return 0;
}

/**
 * The base OP for a score on a chart, in micro-units.
 * @param {number} score
 * @param {number} il10000
 * @returns {number} OP base * 1000000
 */
function overpowerBaseMicro(score, il10000) {
    let rawMicro;

    if (score >= 1007500) {
        // internal_level * 5 + 10 + (score - 1007500) / 10000 * 15, in micro
        rawMicro = il10000 * 500 + 10000000 + 1500 * (score - 1007500);
    } else {
        // whole_rating / 10000 * 5, in micro
        rawMicro = calculateWholeRating(score, il10000) * 500;
    }

    const stepMicro = score >= 975000 ? 5000 : 50000;
    return Math.floor(rawMicro / stepMicro) * stepMicro;
}

/**
 * Play OP for a personal best: base OP plus combo-lamp bonuses, in micro-units.
 * @param {number} score
 * @param {number} il10000
 * @param {number} noteLamp 0 = NONE, 1 = FULL COMBO, 2 = ALL JUSTICE, 3 = ALL JUSTICE CRITICAL
 * @returns {number}
 */
function playOverpowerMicro(score, il10000, noteLamp) {
    let op = overpowerBaseMicro(score, il10000);

    if (noteLamp >= 1) op += 500000; // FULL COMBO
    if (noteLamp >= 2) op += 500000; // ALL JUSTICE
    if (noteLamp === 3) op += 250000; // ALL JUSTICE CRITICAL

    return op;
}

/**
 * The theoretical maximum OP for a chart, in micro-units: internal_level * 5 + 15.
 * @param {number} il10000
 * @returns {number}
 */
function overpowerMaxMicro(il10000) {
    return il10000 * 500 + 15000000;
}

/**
 * Compute achieved and maximum OP (both in micro-units) for a set of charts.
 *
 * - aggregate "chart": every chart contributes independently (used for level-folder totals).
 * - aggregate "song": only the best chart per song contributes (used for the overall total).
 *   The numerator picks the song's chart with the highest *achieved* OP (which may be a lower
 *   difficulty); the denominator picks the song's chart with the highest *possible* OP.
 *
 * @param {ChartDocument[]} relevantCharts
 * @param {Map<string, PersonalBest>} pbByChartId
 * @param {"chart" | "song"} aggregate
 * @returns {{ achievedMicro: number; maxMicro: number; }}
 */
function computeOverpower(relevantCharts, pbByChartId, aggregate) {
    const charts = relevantCharts.filter((c) => c.levelNum > 0);

    if (aggregate === "song") {
        /** @type {Map<string, { achieved: number; max: number; }>} */
        const bySong = new Map();

        for (const chart of charts) {
            const il10000 = il10000FromLevelNum(chart.levelNum);
            const chartMax = overpowerMaxMicro(il10000);
            const pb = pbByChartId.get(chart.id);
            const chartAchieved = pb
                ? playOverpowerMicro(pb.scoreData.score, il10000, pb.scoreData.enumIndexes.noteLamp)
                : 0;

            const entry = bySong.get(chart.songID);

            if (entry) {
                if (chartAchieved > entry.achieved) entry.achieved = chartAchieved;
                if (chartMax > entry.max) entry.max = chartMax;
            } else {
                bySong.set(chart.songID, { achieved: chartAchieved, max: chartMax });
            }
        }

        let achievedMicro = 0;
        let maxMicro = 0;

        for (const entry of bySong.values()) {
            achievedMicro += entry.achieved;
            maxMicro += entry.max;
        }

        return { achievedMicro, maxMicro };
    }

    let achievedMicro = 0;
    let maxMicro = 0;

    for (const chart of charts) {
        const il10000 = il10000FromLevelNum(chart.levelNum);
        maxMicro += overpowerMaxMicro(il10000);

        const pb = pbByChartId.get(chart.id);
        if (pb) {
            achievedMicro += playOverpowerMicro(pb.scoreData.score, il10000, pb.scoreData.enumIndexes.noteLamp);
        }
    }

    return { achievedMicro, maxMicro };
}
