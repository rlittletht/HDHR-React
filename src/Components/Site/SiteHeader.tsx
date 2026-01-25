
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
            background: hdhrBlueThemeLight.colorBrandBackground2,
            justifyContent: 'space-between',
            height: '2.5em',
            alignItems: 'center'
        },
        siteHeader:
        {
            fontSize: hdhrBlueThemeLight.fontSizeHero700,
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
            textAlign: 'center',
        };

        const leftLogo = "";
        const rightLogo = "";

        return (
            <div className={this.props.styles.outerContainer}>
                <div>
                    {leftLogo}
                </div>
                <div className={this.props.styles.siteHeader}>
                    <b>hdhr-tools</b>
                </div>
                <div>
                    {rightLogo}
                </div>
            </div>
        );
    }
}

export const SiteHeader = withStyles(useStyles, SiteHeaderWithoutStyles);