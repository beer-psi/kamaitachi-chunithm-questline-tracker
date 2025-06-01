declare namespace GoogleAppsScript {
    namespace Sheets {
        namespace Schema {
            interface ColorStyle {
                rgbColor?: Sheets.Schema.Color | undefined;
                themeColor?: string | undefined;
            }

            interface CellFormat {
                backgroundColorStyle?: Sheets.Schema.ColorStyle | undefined;

                /**
                 * @deprecated use `backgroundColorStyle` instead
                 * @see https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/cells#cellformat
                 */
                backgroundColor?: Sheets.Schema.Color | undefined;
            }
        }
    }
}
