import React from "react";
import { Button, makeStyles } from '@fluentui/react-components';
import { IAppContext, TheAppContext } from "../Controller/AppContext";
import { MessageTypes } from "../Controller/AppContextMessages";
import { hdhrBlueThemeLight } from "../hdhrBlueTheme";
import { withStyles } from "../withStyles";
import { DirectoryItemBase, isDirectoryItemEpisode, DirectoryItemEpisode } from "../Model/DirectoryItem";

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
            flexDirection: 'row',
            columnGap: '15px',
            alignItems: 'flex-end',

            background: hdhrBlueThemeLight.colorNeutralBackground3,
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
        const recordStart = new Date(this.props.item.RecordStart * 1000).toLocaleString();

        return (
            <div className={this.props.styles.innerContainer}>
                <div>Title: {this.props.item.EpisodeTitle} ({this.props.item.EpisodeNumber})</div>
                <div>Record Start: {recordStart}</div>
                <div>Season: {this.props.item.EpisodeNumber}</div>
                <div>Synopsis: {this.props.item.Synopsis}</div>
            </div>
        );
    }
};

export const Episode = withStyles(useStyles, EpisodeWithoutStyles);