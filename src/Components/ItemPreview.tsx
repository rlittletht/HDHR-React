import React from "react";
import { Button, makeStyles } from '@fluentui/react-components';
import { IAppContext, TheAppContext } from "../Controller/AppContext";
import { MessageTypes } from "../Controller/AppContextMessages";
import { hdhrBlueThemeLight } from "../hdhrBlueTheme";
import { withStyles } from "../withStyles";
import { DirectoryItemBase, isDirectoryItemEpisode, DirectoryItemEpisode } from "../Model/DirectoryItem";
import { DataPair } from "./DataPair";

export interface ItemPreviewState
{
}

export interface ItemPreviewProps
{
    item: DirectoryItemBase;
}

const useStyles = makeStyles(
    {
        thumbnail:
        {
            maxHeight: '1in'
        },
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

export class ItemPreviewWithoutStyles extends React.Component<ItemPreviewProps, ItemPreviewState>
{
    context!: IAppContext;
    static contextType = TheAppContext;

    constructor(props: ItemPreviewProps)
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
        const preview = isDirectoryItemEpisode(this.props.item)
                            ? (<a href={(this.props.item as DirectoryItemEpisode).PlayURL} download={(this.props.item as DirectoryItemEpisode).Filename}>
                                   <img className={this.props.styles.thumbnail} src={this.props.item.ImageURL}/>
                               </a>)
                            : (<img className={this.props.styles.thumbnail} src={this.props.item.ImageURL}/>);

        const lastRecording = new Date(this.props.item.StartTime * 1000).toLocaleString();
        return (
            <div className={this.props.styles.innerContainer}>
                {preview}
                {this.props.item.Title}
            </div>
        );
    }
};

export const ItemPreview = withStyles(useStyles, ItemPreviewWithoutStyles);