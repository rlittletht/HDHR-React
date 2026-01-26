import React from 'react';

import { Button, createTableColumn, makeStyles, TableCellLayout, TableColumnDefinition, TableRowId } from "@fluentui/react-components";
import { DirectoryItemBase, getIdFromDirectoryItem, isDirectoryItemEpisode, DirectoryItemEpisode, getSeriesEpisodeFromItem, itemsContainEpisodes, DirectoryItemBase as IDirectoryItemBase } from
    "../Model/DirectoryItem";
import { DirectoryItemDetails } from "./DirectoryItemDetails";
import { ItemsListWithStyles, ItemsListProps, ItemsListWithoutStyles, OnSelectionChangeDelegate } from './ItemsList';
import { withStyles } from '../withStyles';
import { hdhrBlueThemeLight } from "../hdhrBlueTheme";
import { OpenFilled, DeleteFilled, ArrowDownloadFilled } from '@fluentui/react-icons';
import { TheAppContext, IAppContext } from '../Controller/AppContext';
import { MessageTypes } from '../Controller/AppContextMessages';
import { ItemPreview } from './ItemPreview';
import { ItemSource } from "./ItemSource";

export type OpenCallback = (seriesUrl: string) => void;
export type DeleteCallback = (seriesUrl: string) => void;
export type DownloadCallback = (item: DirectoryItemEpisode) => void;

export interface DirectoryItemsContainerProps
{
    styles: Record<string, string>;
    //    title?: string;
    //    children: React.ReactNode;
    items: DirectoryItemBase[];
    onOpenClicked: OpenCallback;
    onDeleteClicked: DeleteCallback;
    onDownloadClicked: DownloadCallback;
    onSelectionChange: OnSelectionChangeDelegate;
    selectedItems: Set<TableRowId>;
}

export interface DirectoryItemsContainerState
{
}

export interface DirectoryItemArgs
{
    onlyEditId?: string;
}

export const DirectoryItemsList: React.ComponentType<ItemsListProps<DirectoryItemBase, DirectoryItemArgs>> =
    ItemsListWithStyles<DirectoryItemBase, DirectoryItemArgs>(ItemsListWithoutStyles < IDirectoryItemBase, DirectoryItemArgs > );

const useStyles = makeStyles(
    {
        thumbnail:
        {
            maxHeight: '1in'
        },
        outerContainer:
        {
            display: 'flex',
            flexDirection: 'column',
            columnGap: '15px',
            alignItems: 'flex-end',
            justifyContent: 'space-between'
        },
        buttons:
        {
            display: 'flex',
            flexDirection: 'row',
            columnGap: '15px',
            justifyContent: 'flex-start',
            height: '2.5em',
            alignItems: 'center'
        }
    });

class DirectoryItemsContainerWithoutStyles extends React.Component<DirectoryItemsContainerProps, DirectoryItemsContainerState>
{
    context!: IAppContext;
    static contextType = TheAppContext;

    constructor(props: DirectoryItemsContainerProps)
    {
        super(props);
    }

    async onOpenButtonClick(event: React.MouseEvent<HTMLButtonElement>, item: DirectoryItemBase, onlyEditId?: string)
    {
        event.stopPropagation();

        if (isDirectoryItemEpisode(item))
            return;

        this.props.onOpenClicked(item.SeriesID);
    }

    async onDeleteButtonClick(event: React.MouseEvent<HTMLButtonElement>, item: DirectoryItemBase, onlyEditId?: string)
    {
        event.stopPropagation();

        if (!isDirectoryItemEpisode(item))
            return;

        const episode = item as DirectoryItemEpisode;

        this.props.onDeleteClicked(episode.Id);
    }

    async onDownloadButtonClick(event: React.MouseEvent<HTMLButtonElement>, item: DirectoryItemBase, onlyEditId?: string)
    {
        event.stopPropagation();

        if (!isDirectoryItemEpisode(item))
            return;

        const episode = item as DirectoryItemEpisode;
        if (this.props.onDownloadClicked)
            await this.props.onDownloadClicked(episode);
    }

    getActionButtons(item: DirectoryItemBase)
    {
        const downloadButton = (
            <Button aria-label="Download" icon={<ArrowDownloadFilled/>} onClick={(event) =>
                this.onDownloadButtonClick(event, item)}/>);

        const deleteButton = (
            <Button aria-label="Open" icon={<DeleteFilled/>} onClick={(event) =>
                this.onDeleteButtonClick(event, item)}/>);

        const openButton = (
            <Button aria-label="Open" icon={<OpenFilled/>} onClick={(event) =>
                this.onOpenButtonClick(event, item)}/>);

        const isEpisode = isDirectoryItemEpisode(item);

        return (
            <div className={this.props.styles.buttons}>
                {!isEpisode && openButton}
                {isEpisode && downloadButton}
                {isEpisode && deleteButton}
            </div>);
    }

    getTableColumnDefinitionsForDirectoryItemlist(items: DirectoryItemBase[], onlyEditId?: string)
    {
        const columns: TableColumnDefinition<DirectoryItemBase>[] = [];
        const seriesEpisodeHeader = itemsContainEpisodes(items) ? "Episode" : "Series";
        columns.push(
            createTableColumn<DirectoryItemBase>(
                {
                    columnId: "title",
                    compare: (left: DirectoryItemBase, right: DirectoryItemBase) =>
                    {
                        return left.Title.localeCompare(right.Title);
                    },
                    renderHeaderCell: () => { return "Series"; },
                    renderCell: (item: DirectoryItemBase) =>
                    {
                        return (
                            <TableCellLayout>
                                <ItemPreview item={item}/>
                            </TableCellLayout>);
                    }
                }));

        if (itemsContainEpisodes(items))
        {
            columns.push(
                createTableColumn<DirectoryItemBase>(
                    {
                        columnId: "source",
                        compare: (left: DirectoryItemBase, right: DirectoryItemBase) =>
                        {
                            const leftSource = isDirectoryItemEpisode(left) ? (left as DirectoryItemEpisode).ChannelName : "N/A";
                            const rightSource = isDirectoryItemEpisode(right) ? (right as DirectoryItemEpisode).ChannelName : "N/A";

                            return leftSource.localeCompare(rightSource);
                        },
                        renderHeaderCell: () => { return "Source"; },
                        renderCell: (item: DirectoryItemBase) =>
                        {
                            return (
                                <TableCellLayout>
                                    <ItemSource item={item}/>
                                </TableCellLayout>);
                        }
                    }));
        }

        columns.push(
            createTableColumn<DirectoryItemBase>(
                {
                    columnId: "series-episode",
                    compare: (left: DirectoryItemBase, right: DirectoryItemBase) =>
                    {
                        const leftS: string = getSeriesEpisodeFromItem(left);
                        const rightS: string = getSeriesEpisodeFromItem(right);
                        return leftS.localeCompare(rightS);
                    },
                    renderHeaderCell: () => {return seriesEpisodeHeader;},
                    renderCell: (item: DirectoryItemBase) =>
                    {
                        return (
                            <TableCellLayout>{getSeriesEpisodeFromItem(item)}</TableCellLayout>);
                    }
                }));

        columns.push(
            createTableColumn<DirectoryItemBase>(
                {
                    columnId: "details",
                    compare: (left: DirectoryItemBase, right: DirectoryItemBase) =>
                    {
                        return left.Title.localeCompare(right.Title);
                    },
                    renderHeaderCell: () => {return "Details";},
                    renderCell: (item: DirectoryItemBase) =>
                    {
                        return (
                            <TableCellLayout>
                                <div className={this.props.styles.outerContainer}>
                                    <DirectoryItemDetails item={item} />
                                </div>
                            </TableCellLayout>);
                    }
                }));
        columns.push(
            createTableColumn<DirectoryItemBase>(
                {
                    columnId: "actions",
                    renderHeaderCell: () => {return "Actions";},
                    renderCell: (item: DirectoryItemBase) =>
                    {
                        return this.getActionButtons(item);
                    }
                }));

        return columns;
    }

    render()
    {
        const getRowId = (item: DirectoryItemBase) => getIdFromDirectoryItem(item);
        const columns = this.getTableColumnDefinitionsForDirectoryItemlist(this.props.items);

        const notCheckable = !itemsContainEpisodes(this.props.items);

        return (<div>
                    <DirectoryItemsList notCheckable={notCheckable} getRowId={getRowId} items={this.props.items} columns={columns} onSelectionChange={this.props.onSelectionChange} selectedItems={this.props
.selectedItems}/>
                </div>);
    }
}

export const DirectoryItemsContainer = withStyles(useStyles, DirectoryItemsContainerWithoutStyles);