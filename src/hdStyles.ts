import { GriffelStyle, shorthands } from "@fluentui/react-components"
import { hdhrBlueThemeLight } from "./hdhrBlueTheme";

export class hdDataGridStyles
{
    static headerRow: GriffelStyle =
    {
        ...shorthands.borderBottom('2pt', 'solid', hdhrBlueThemeLight.colorBrandForeground1),
    };

    static headerCellProps: GriffelStyle =
    {
        fontWeight: 'bold'
    }

    static gridTable: GriffelStyle =
    {
        ...shorthands.border('2pt', 'solid', hdhrBlueThemeLight.colorBrandForeground1),
        ...shorthands.margin("2pt", "0pt", "0pt", "0pt")
    };

    static styles =
    {
        gridTable: hdDataGridStyles.gridTable,
        headerRow: hdDataGridStyles.headerRow,
        headerCellProps: hdDataGridStyles.headerCellProps
    }
}