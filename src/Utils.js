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
 * Find charts that are relevant to the provided goal.
 * @param {ChartDocument[]} charts 
 * @param {Goal} goal 
 */
function filterRelevantCharts(charts, goal) {
    return charts.filter((c) => {
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
}

/**
 * Converts a cell coordinate in A1 notation to a { rowIndex, columnIndex } object.
 * @param {string} cell 
 * @returns {{ rowIndex: number; columnIndex: number; }}
 */
function convertA1ToRowColumn(cell) {    
    const match = cell.match(/(?<column>[A-Z]+)(?<row>[0-9]+)/u);

    if (!match) {
        throw new Error(`Invalid A1 notation: ${cell}`);
    }

    let columnIndex = 0;

    for (let i = match.groups.column.length - 1; i >= 0; i--) {
        columnIndex += Math.pow(26, i) * (match.groups.column.charCodeAt(i) - 64);
    }    

    return {
        rowIndex: Number(match.groups.row) - 1,
        columnIndex: columnIndex - 1,
    };
}

/**
 * 
 * @param {string} color 
 * @returns {{ red: number; green: number; blue: number; alpha: number; }}
 */
function convertHexColor(color) {
    const match = color.match(/#(?<r>[0-9a-f]{2})(?<g>[0-9a-f]{2})(?<b>[0-9a-f]{2})(?<a>[0-9a-f]{2})?/ui);

    if (!match) {
        throw new Error(`Invalid hex color code: ${color}`);
    }

    const red = Number.parseInt(match.groups.r, 16) / 255;
    const green = Number.parseInt(match.groups.g, 16) / 255;
    const blue = Number.parseInt(match.groups.b, 16) / 255;
    const alpha = (match.groups.a ? Number.parseInt(match.groups.a, 16) : 255) / 255;

    return { red, green, blue, alpha };
}

/**
 * Returns whether the cell is part of the objective checklist (true) or task
 * charts (false).
 * @param {string} sheet
 * @param {{ rowIndex: number; }} coordinates
 */
function isObjectiveChecklistCell(sheet, coordinates) {
    const checklistLastIndex = (sheet.includes("Rainbow") || sheet === "Endgame")
        ? 23
        : 17;

    return coordinates.rowIndex <= checklistLastIndex;
}

/**
 * Return the default cell color for a specific checkbox.
 * @param {string} sheet
 * @param {{ rowIndex: number; }} coordinates
 */
function getCellDefaultColor(sheet, coordinates) {
    if (isObjectiveChecklistCell(sheet, coordinates)) {
        // checklist table
        return coordinates.rowIndex % 2 === 0
            ? "#ffffff"
            : "#efefef";
    } else {
        // chart goals
        return "#efefef";
    }
}
