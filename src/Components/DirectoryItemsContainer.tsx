import React from 'react';

import { Button, createTableColumn, makeStyles, TableCellLayout, TableColumnDefinition } from "@fluentui/react-components";
import { DirectoryItemBase, getIdFromDirectoryItem, isDirectoryItemEpisode, DirectoryItemEpisode } from "../Model/DirectoryItem";
import { DirectoryItemDetails } from "./DirectoryItemDetails";
import { ItemsListWithStyles, ItemsListProps, ItemsListWithoutStyles } from './ItemsList';
import { withStyles } from '../withStyles';
import { hdhrBlueThemeLight } from "../hdhrBlueTheme";
import { OpenFilled } from '@fluentui/react-icons';
import { TheAppContext, IAppContext } from '../Controller/AppContext';
import { MessageTypes } from '../Controller/AppContextMessages';
import { ItemPreview } from './ItemPreview';

export type OpenCallback = (seriesUrl: string) => void;

export interface DirectoryItemsContainerProps
{
    styles: Record<string, string>;
    //    title?: string;
    //    children: React.ReactNode;
    items: DirectoryItemBase[];
    onOpenClicked: OpenCallback;
}

export interface DirectoryItemsContainerState
{
}

export interface DirectoryItemArgs
{
    onlyEditId?: string;
}

export const DirectoryItemsList: React.ComponentType<ItemsListProps<DirectoryItemBase, DirectoryItemArgs>> =
    ItemsListWithStyles<DirectoryItemBase, DirectoryItemArgs>(ItemsListWithoutStyles < DirectoryItemBase, DirectoryItemArgs > );

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

    getTableColumnDefinitionsForDirectoryItemlist(onlyEditId?: string)
    {
        const columns: TableColumnDefinition<DirectoryItemBase>[] =
        [
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
                }),
            createTableColumn<DirectoryItemBase>(
                {
                    columnId: "seriesId",
                    compare: (left: DirectoryItemBase, right: DirectoryItemBase) =>
                    {
                        return left.Title.localeCompare(right.Title);
                    },
                    renderHeaderCell: () => { return "SeriesID"; },
                    renderCell: (item: DirectoryItemBase) =>
                    {
                        return (
                            <TableCellLayout>{item.SeriesID}</TableCellLayout>);
                    }
                }),
            createTableColumn<DirectoryItemBase>(
                {
                    columnId: "details",
                    compare: (left: DirectoryItemBase, right: DirectoryItemBase) =>
                    {
                        return left.Title.localeCompare(right.Title);
                    },
                    renderHeaderCell: () => { return "Details"; },
                    renderCell: (item: DirectoryItemBase) =>
                    {
                        return (
                            <TableCellLayout>
                                <div className={this.props.styles.outerContainer}>
                                    <DirectoryItemDetails item={item}/>
                                </div>
                            </TableCellLayout>);
                    }
                }),
            createTableColumn<DirectoryItemBase>(
                {
                    columnId: "actions",
                    renderHeaderCell: () => { return "Actions"; },
                    renderCell: (item: DirectoryItemBase) =>
                    {
                        return isDirectoryItemEpisode(item)
                                   ? (<span/>)
                                   : (
                                       <Button aria-label="Open" icon={<OpenFilled/>} onClick={(event) => this.onOpenButtonClick(event, item)}/>);
                    }
                }),
        ];

        return columns;
    }

    render()
    {
        const getRowId = (item: DirectoryItemBase) => getIdFromDirectoryItem(item);
        const columns = this.getTableColumnDefinitionsForDirectoryItemlist();

        return (<div>
                    <DirectoryItemsList getRowId={getRowId} items={this.props.items} columns={columns}/>
                </div>);
    }
}

export const DirectoryItemsContainer = withStyles(useStyles, DirectoryItemsContainerWithoutStyles);