
import React from 'react';
import { hdhrBlueThemeLight } from "../../hdhrBlueTheme";
import * as CSS from "csstype";
import '../../App.css';
import { makeStyles } from '@fluentui/react-components';
import { withStyles } from '../../withStyles';


interface SiteHeaderProps
{
  styles: Record<string, string>;
}


const useStyles = makeStyles(
  {
    outerContainer:
    {
      display: 'flex',
      flexDirection: 'row',
      columnGap: '15px',
      alignItems: 'flex-end',
      background: hdhrBlueThemeLight.colorBrandBackground2,
      justifyContent: 'space-between'
    },
    item:
      {}
  });

class SiteHeaderWithoutStyles extends React.Component<SiteHeaderProps>
{
  render()
  {
    const headerStyles: CSS.Properties =
    {
      background: hdhrBlueThemeLight.colorBrandBackground2,
      textAlign: 'center'
    };

    const productRef: CSS.Properties =
    {
      color: hdhrBlueThemeLight.colorBrandForeground1,
      fontSize: '90%',
      fontVariant: 'small-caps'
    };

    return (
      <div className="SiteHeader" style={headerStyles}>
        <div className={this.props.styles.outerContainer}>
          <div>
            LEFT LOGO HERE
          </div>
          <div>
            <b>hdhr-react</b>
          </div>
          <div>
            RIGHT LOGO HERE
          </div>
        </div>
      </div>
    );
  }
}

export const SiteHeader = withStyles(useStyles, SiteHeaderWithoutStyles);
