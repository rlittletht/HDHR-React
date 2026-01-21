import React from "react";
import { Button, makeStyles } from '@fluentui/react-components';
import { IAppContext, TheAppContext } from "../Controller/AppContext";
import { MessageTypes } from "../Controller/AppContextMessages";
import { hdhrBlueThemeLight } from "../hdhrBlueTheme";
import { withStyles } from "../withStyles";
import { DirectoryItemBase, isDirectoryItemEpisode, DirectoryItemSeries, getEpisode, getSeries } from "../Model/DirectoryItem";
import { Episode } from "./Episode";
import { CommonItems } from "./CommonItems";
import { Series } from "./SeriesInfo";

export interface DirectoryItemDetailsState
{
}

export interface DirectoryItemDetailsProps
{
    item: DirectoryItemBase;
    styles: Record<string, string>;
}

const useStyles = makeStyles(
    {
        innerContainer:
        {
            display: 'flex',
            flexDirection: 'row',
            columnGap: '15px',
            alignItems: 'flex-end',
        },
        item:
            {}
    });

export class DirectoryItemDetailsWithoutStyles extends React.Component<DirectoryItemDetailsProps, DirectoryItemDetailsState>
{
    context!: IAppContext;
    static contextType = TheAppContext;

    constructor(props: DirectoryItemDetailsProps)
    {
        super(props);

        this.state =
        {
        }
    }

    async testButtonClick()
    {
        this.context.Messages.message("title", ["message1", "message2"], MessageTypes.Toast);
    }

    componentDidMount()
    {
    }

    componentWillUnmount()
    {
    }

    render()
    {
        const item = isDirectoryItemEpisode(this.props.item)
                         ? (<Episode item={getEpisode(this.props.item)}/>)
                         : (<Series item={getSeries(this.props.item)}/>);

        return (
            <div>
                {item}
            </div>
        );
    }
};

export const DirectoryItemDetails = withStyles(useStyles, DirectoryItemDetailsWithoutStyles);