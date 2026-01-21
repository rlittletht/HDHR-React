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

export interface DirectoryItemLineState
{
}

export interface DirectoryItemLineProps
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

export class DirectoryItemLineWithoutStyles extends React.Component<DirectoryItemLineProps, DirectoryItemLineState>
{
    context!: IAppContext;
    static contextType = TheAppContext;

    constructor(props: DirectoryItemLineProps)
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
            <div className={this.props.styles.outerContainer}>
                <CommonItems item={this.props.item}/>
                {item}
            </div>
        );
    }
};

export const DirectoryItemLine = withStyles(useStyles, DirectoryItemLineWithoutStyles);