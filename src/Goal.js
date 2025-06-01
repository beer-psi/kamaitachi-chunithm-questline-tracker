// SPDX-License-Identifier: MIT
/**
 * @param {string} criteriaKey 
 * @param {number} criteriaValue 
 */
function humanizeGoalCriteria(criteriaKey, criteriaValue) {
    switch (criteriaKey) {
        case "scoreData.enumIndexes.clearLamp":
            return ["FAILED", "CLEAR", "HARD", "BRAVE", "ABSOLUTE", "CATASTROPHY"][criteriaValue];
        case "scoreData.enumIndexes.noteLamp":
            return ["NONE", "FULL COMBO", "ALL JUSTICE", "ALL JUSTICE CRITICAL"][criteriaValue];
        case "scoreData.enumIndexes.grade":
            return ["D", "C", "B", "BB", "BBB", "A", "AA", "AAA", "S", "S+", "SS", "SS+", "SSS", "SSS+"][criteriaValue];
        case "scoreData.score":
            return criteriaValue.toString();
        case "calculatedData.rating":
            return criteriaValue.toString();        
        default:
            throw new Error(`Unknown criteria key ${criteriaKey}. Please update humanizeGoalCriteria.`);
    }
}

/**
 * @param {string} grade 
 */
function wrapGrade(grade) {
    return (grade.endsWith("+") || grade.endsWith("-")) ? `(${grade})` : grade;
}

/**
 * 
 * @param {string} criteriaKey 
 * @param {number} criteriaValue 
 * @param {object} pb 
 */
function humanizeGoalProgress(criteriaKey, criteriaValue, pb) {
    const outOf = humanizeGoalCriteria(criteriaKey, criteriaValue);

    // fail fast if the user has not played this before
    if (!pb) {
        return `NO PLAY / ${outOf}`;
    }

    let progress = null;

    if (criteriaKey === "scoreData.enumIndexes.grade") {
        const gradeBoundaryIndex = pb.scoreData.enumIndexes.grade;
        const scoreGradeBoundary = GRADE_BOUNDARIES[gradeBoundaryIndex];
        const upperGradeBoundary = GRADE_BOUNDARIES[gradeBoundaryIndex + 1];

        if (upperGradeBoundary && gradeBoundaryIndex + 1 === criteriaValue) {
            // if an upper boundary exists, and the upper bound is relevant to the grade we're looking for
            // e.g. the goal is SSS+ and the user's boundaries are SSS+500/(SSS+)-1000
            // we prefer (SSS+)-1000

            // this will automatically have a - because score is lower than upper grade's lower bound
            progress = `${wrapGrade(upperGradeBoundary.name)}${pb.scoreData.score - upperGradeBoundary.lowerBound}`;
        } else if (upperGradeBoundary) {
            // there's an upper bound but it isn't relevant to our goal, so pick the closer delta
            const upperDelta = upperGradeBoundary.lowerBound - pb.scoreData.score;
            const lowerDelta = pb.scoreData.score - scoreGradeBoundary.lowerBound;
            
            if (lowerDelta <= upperDelta) {
                progress = `${wrapGrade(scoreGradeBoundary.name)}+${pb.scoreData.score - scoreGradeBoundary.lowerBound}`;   
            } else {
                // this will automatically have a - because score is lower than upper grade's lower bound
                progress = `${wrapGrade(upperGradeBoundary.name)}${pb.scoreData.score - upperGradeBoundary.lowerBound}`;
            }
        } else {
            // there's no upper bound, so lower wins            
            progress = `${wrapGrade(scoreGradeBoundary.name)}+${pb.scoreData.score - scoreGradeBoundary.lowerBound}`;
        }
    } else {
        progress = humanizeGoalCriteria(criteriaKey, _getValue(pb, criteriaKey));
    }

    return `${progress} / ${outOf}`;    
}

/**
 * Returns a background color for the cell given the goal's progress (out of 1)
 * @param {number} progress 
 */
function getProgressColor(progress) {
    if (progress >= 5 / 6) {
        return "#38761d";
    // SS+
    } else if (progress >= 2 / 3) {
        return "#93c47d";
    // SS
    } else if (progress >= 1 / 2) {
        return "#ffd966";
    // S+
    } else if (progress >= 1 / 3) {
        return "#f9cb9c";
    // S
    } else if (progress >= 1 / 6) {
        return "#e69138";
    // <S
    } else if (progress > 0) {
        return "#cc0000";
    }

    return null;
}

/**
 * @param {number} score 
 */
function getProgressColorFromScore(score) {
    if (score >= 1006500) {
        return "#38761d";
    // SS+
    } else if (score >= 1005000) {
        return "#93c47d";
    // SS
    } else if (score >= 1000000) {
        return "#ffd966";
    // S+
    } else if (score >= 990000) {
        return "#f9cb9c";
    // S
    } else if (score >= 975000) {
        return "#e69138";
    // <S
    } else {
        return "#cc0000";
    }
}
