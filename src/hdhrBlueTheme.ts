
import { createDarkTheme, createLightTheme, GriffelStyle, shorthands } from '@fluentui/react-components';
import { BrandVariants, Theme } from '@fluentui/react-components';

const hdhrBlueTheme: BrandVariants = {
  10: "#020305",
  20: "#111820",
  30: "#172837",
  40: "#1B344A",
  50: "#1E415E",
  60: "#214E73",
  70: "#235C88",
  80: "#236A9E",
  90: "#2379B4",
  100: "#2287CB",
  110: "#1E97E2",
  120: "#4EA4EA",
  130: "#71B2ED",
  140: "#8FBFF1",
  150: "#A9CDF4",
  160: "#C3DBF8"
};

export const hdhrBlueThemeLightBase: Theme = {
  ...createLightTheme(hdhrBlueTheme),
};

export const hdhrBlueThemeLight: Theme =
{
  ...hdhrBlueThemeLightBase,
  //    colorNeutralBackground1: '#ff0000',
  //    colorNeutralBackground2: '#00ff00',
  //    colorNeutralBackground3: '#0000ff'
};

export const rexBlueThemeDark: Theme = {
  ...createDarkTheme(hdhrBlueTheme),
};

rexBlueThemeDark.colorBrandForeground1 = hdhrBlueTheme[110];
rexBlueThemeDark.colorBrandForeground2 = hdhrBlueTheme[120];

export const rexDataTableStyleProps: GriffelStyle =
{
  ...shorthands.border('2pt', 'solid', hdhrBlueThemeLight.colorBrandForeground1),
  background: hdhrBlueThemeLight.colorBrandBackground2,
  borderCollapse: 'collapse',
  width: '100%'
}