import React from "react";
import { Button, makeStyles } from '@fluentui/react-components';
import { IAppContext, TheAppContext } from "../Controller/AppContext";
import { MessageTypes } from "../Controller/AppContextMessages";
import { hdhrBlueThemeLight } from "../hdhrBlueTheme";
import { withStyles } from "../withStyles";
import { DirectoryItemBase, isDirectoryItemEpisode, DirectoryItemEpisode } from "../Model/DirectoryItem";
import { DataPair } from "./DataPair";

export interface EpisodeState
{
}

export interface EpisodeProps
{
    item: DirectoryItemEpisode;
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

export class EpisodeWithoutStyles extends React.Component<EpisodeProps, EpisodeState>
{
    context!: IAppContext;
    static contextType = TheAppContext;

    constructor(props: EpisodeProps)
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
        const recordStart = new Date(this.props.item.RecordStartTime * 1000).toLocaleString();
        const recordEnd = new Date(this.props.item.RecordEndTime * 1000).toLocaleString();

        return (
            <div className={this.props.styles.innerContainer}>
                <DataPair heading="Title" data={`${this.props.item.EpisodeTitle} (${this.props.item.EpisodeNumber})`}/>
                <DataPair heading="Record Start" data={recordStart}/>
                <DataPair heading="Record End" data={recordEnd}/>
                <DataPair heading="Season" data={this.props.item.EpisodeNumber}/>
                <DataPair heading="Synopsis" data={this.props.item.Synopsis} />
                <DataPair heading="ID" data={this.props.item.Id} />
            </div>
        );
    }
};

export const Episode = withStyles(useStyles, EpisodeWithoutStyles);