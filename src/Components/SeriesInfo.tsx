import React from "react";
import { Button, makeStyles } from '@fluentui/react-components';
import { IAppContext, TheAppContext } from "../Controller/AppContext";
import { MessageTypes } from "../Controller/AppContextMessages";
import { hdhrBlueThemeLight } from "../hdhrBlueTheme";
import { withStyles } from "../withStyles";
import { DirectoryItemBase, isDirectoryItemEpisode, DirectoryItemSeries } from "../Model/DirectoryItem";
import { DataPair } from "./DataPair";

export interface SeriesState
{
}

export interface SeriesProps
{
    item: DirectoryItemSeries;
}

const useStyles = makeStyles(
    {
        innerContainer:
        {
            display: 'flex',
            flexDirection: 'column',
            columnGap: '15px',
            alignItems: 'flex-start',
        },
        item:
            {}
    });

export class SeriesWithoutStyles extends React.Component<SeriesProps, SeriesState>
{
    context!: IAppContext;
    static contextType = TheAppContext;

    constructor(props: SeriesProps)
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
        const lastRecording = new Date(this.props.item.StartTime * 1000).toLocaleString();
        return (
            <div className={this.props.styles.innerContainer}>
                <DataPair heading="Series Name:" data={this.props.item.Title} /> 
                <DataPair heading="Last Recording:" data={lastRecording} />
                <DataPair heading="Series ID:" data={this.props.item.SeriesID} />
                <DataPair heading="URL" data={this.props.item.EpisodesURL} />
            </div>
        );
    }
};

export const Series = withStyles(useStyles, SeriesWithoutStyles);