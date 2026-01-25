import React from "react";
import { Button, makeStyles } from '@fluentui/react-components';
import { IAppContext, TheAppContext } from "../Controller/AppContext";
import { MessageTypes } from "../Controller/AppContextMessages";
import { hdhrBlueThemeLight } from "../hdhrBlueTheme";
import { withStyles } from "../withStyles";

export interface DataPairState
{
}

export interface DataPairProps
{
    heading: string;
    data: string;
}

const useStyles = makeStyles(
    {
        innerContainer:
        {
            display: 'flex',
            flexDirection: 'row',
            columnGap: '15px',
            alignItems: 'flex-start',
        },
        heading:
        {
            fontWeight: hdhrBlueThemeLight.fontWeightSemibold,
        },
        data:
            {},
        item:
            {}
    });

export class DataPairWithoutStyles extends React.Component<DataPairProps, DataPairState>
{
    context!: IAppContext;
    static contextType = TheAppContext;

    constructor(props: DataPairProps)
    {
        super(props);
    }

    componentDidMount()
    {
    }

    componentWillUnmount()
    {
    }

    render()
    {
        return (
            <div className={this.props.styles.innerContainer}>
                <div className={this.props.styles.heading}>{this.props.heading}:</div>
                <div className={this.props.styles.data}>{this.props.data}</div>
            </div>
        );
    }
};

export const DataPair = withStyles(useStyles, DataPairWithoutStyles);