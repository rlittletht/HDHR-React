import React from "react";
import { Button, makeStyles } from '@fluentui/react-components';
import { IAppContext, TheAppContext } from "../Controller/AppContext";
import { MessageTypes } from "../Controller/AppContextMessages";
import { hdhrBlueThemeLight } from "../hdhrBlueTheme";
import { withStyles } from "../withStyles";
import { DirectoryItemBase, isDirectoryItemCommonItems, DirectoryItemCommonItems } from "../Model/DirectoryItem";

export interface CommonItemsState
{
}

export interface CommonItemsProps
{
    item: DirectoryItemBase;
}

const useStyles = makeStyles(
    {
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

export class CommonItemsWithoutStyles extends React.Component<CommonItemsProps, CommonItemsState>
{
    context!: IAppContext;
    static contextType = TheAppContext;

    constructor(props: CommonItemsProps)
    {
        super(props);

        this.state =
        {
        }
    }

    componentDidMount()
    {
    }

    componentWillUnmount()
    {
    }

    render()
    {
        const startTime = new Date(this.props.item.StartTime * 1000).toLocaleString();

        return (
            <div className={this.props.styles.innerContainer}>
                <div>TItle: {this.props.item.Title} ({this.props.item.CommonItemsNumber})</div>
                <div>Start Time: {startTime}</div>
                <div>Category: {this.props.item.Category}</div>
                <div>SeriesID: {this.props.item.SeriesID}</div>
            </div>
        );
    }
};

export const CommonItems = withStyles(useStyles, CommonItemsWithoutStyles);