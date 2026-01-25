/*----------------------------------------------------------------------------
    This shows information about the session:
----------------------------------------------------------------------------*/

import React from 'react';
import '../../App.css';
import { makeStyles, Text } from '@fluentui/react-components';
import { withStyles } from '../../withStyles';
import { hdhrBlueThemeLight } from "../../hdhrBlueTheme";


export interface SessionInfoProps
{
    styles: Record<string, string>;
    Device?: string;
}

export interface SessionInfoState
{
}

const useStyles = makeStyles(
    {
        outerContainer:
        {
            display: 'flex',
            flexDirection: 'row',
            columnGap: '15px',
            alignItems: 'flex-end',
            background: hdhrBlueThemeLight.colorNeutralBackground3,
            justifyContent: 'space-between'
        },
        innerContainer:
        {
            display: 'flex',
            flexDirection: 'row',
            columnGap: '15px',
            alignItems: 'flex-end',

            background: hdhrBlueThemeLight.colorNeutralBackground3,
        },
        item:
            {}
    });

class SessionInfoWithoutStyles extends React.Component<SessionInfoProps, SessionInfoState>
{
    render()
    {
        const connected = this.props.Device ? `Connected to ${this.props.Device}` : "Not connected";

        return (
            <div className={this.props.styles.outerContainer}>
                <div className={this.props.styles.innerContainer}>
                    <Text>
                        Version 0.01
                    </Text>
                </div>
                <div className={this.props.styles.innerContainer}>
                    {connected}
                </div>
            </div>
        );
    }
}

export const SessionInfo = withStyles(useStyles, SessionInfoWithoutStyles);