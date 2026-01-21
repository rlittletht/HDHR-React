import React from "react";
import { Button, makeStyles } from '@fluentui/react-components';
import { IAppContext, TheAppContext } from "../Controller/AppContext";
import { MessageTypes } from "../Controller/AppContextMessages";
import { hdhrBlueThemeLight } from "../hdhrBlueTheme";
import { withStyles } from "../withStyles";
import { DirectoryItemBase, isDirectoryItemEpisode, DirectoryItemSeries } from "../Model/DirectoryItem";

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
            flexDirection: 'row',
            columnGap: '15px',
            alignItems: 'flex-end',

            background: hdhrBlueThemeLight.colorNeutralBackground3,
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
        return (
            <div className={this.props.styles.innerContainer}>
                Episodes URL: {this.props.item.episodesURL}
            </div>
        );
    }
};

export const Series = withStyles(useStyles, SeriesWithoutStyles);