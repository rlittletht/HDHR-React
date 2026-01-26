import React from "react";
import { Button, makeStyles } from '@fluentui/react-components';
import { IAppContext, TheAppContext } from "../Controller/AppContext";
import { MessageTypes } from "../Controller/AppContextMessages";
import { hdhrBlueThemeLight } from "../hdhrBlueTheme";
import { withStyles } from "../withStyles";
import { DirectoryItemBase, isDirectoryItemEpisode, DirectoryItemEpisode } from "../Model/DirectoryItem";
import { DataPair } from "./DataPair";

export interface ItemSourceState
{
}

export interface ItemSourceProps
{
    item: DirectoryItemBase;
}

const useStyles = makeStyles(
    {
        thumbnail:
        {
            maxHeight: '0.5in',
            backgroundColor: 'black'
        },
        innerContainer:
        {
            display: 'flex',
            flexDirection: 'column',
            columnGap: '15px',
            alignItems: 'flex-start',
        },
        channel:
        {
        },
        item:
            {}
    });

export class ItemSourceWithoutStyles extends React.Component<ItemSourceProps, ItemSourceState>
{
    context!: IAppContext;
    static contextType = TheAppContext;

    constructor(props: ItemSourceProps)
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
        const channelImage = isDirectoryItemEpisode(this.props.item)
                                 ? (<div className={this.props.styles.channel}>
                                        <img className={this.props.styles.thumbnail} src={this.props.item.ChannelImageURL}/>
                                    </div>)
                                 : (<div/>);

        const lastRecording = new Date(this.props.item.StartTime * 1000).toLocaleString();
        const channelName = isDirectoryItemEpisode(this.props.item) ? (this.props.item as DirectoryItemEpisode).ChannelName : "";
        const channelNumber = isDirectoryItemEpisode(this.props.item) ? (this.props.item as DirectoryItemEpisode).ChannelNumber : "";

        const channelInfo = (
            <div>{channelName}&nbsp;({channelNumber})</div>);

        return (
            <div className={this.props.styles.innerContainer}>
                {channelImage}
                { isDirectoryItemEpisode(this.props.item) && channelInfo }
            </div>
        );
    }
};

export const ItemSource = withStyles(useStyles, ItemSourceWithoutStyles);