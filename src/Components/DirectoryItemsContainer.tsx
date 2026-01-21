import React from 'react';

import { createTableColumn, makeStyles, TableCellLayout, TableColumnDefinition } from "@fluentui/react-components";
import { DirectoryItemBase, getIdFromDirectoryItem, DirectoryItemBase as IDirectoryItemBase } from "../Model/DirectoryItem";
import { DirectoryItemDetails } from "./DirectoryItemDetails";
import { ItemsListWithStyles, ItemsListProps, ItemsListWithoutStyles } from './ItemsList';
import { withStyles } from '../withStyles';
import { hdhrBlueThemeLight } from "../hdhrBlueTheme";

export interface DirectoryItemsContainerProps
{
    styles: Record<string, string>;
    //    title?: string;
    //    children: React.ReactNode;
    items: DirectoryItemBase[]
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
    });

class DirectoryItemsContainerWithoutStyles extends React.Component<DirectoryItemsContainerProps, DirectoryItemsContainerState>
{
    constructor(props: DirectoryItemsContainerProps)
    {
        super(props);
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
                                <img className={this.props.styles.thumbnail} src={item.ImageURL}/><br/> {item.Title}
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
                                    <DirectoryItemDetails item={item} />
                                </div>
                            </TableCellLayout>);
                    }
                })
            //                ,
            //            createTableColumn<DirectoryItemBase>(
            //                {
            //                    columnId: "actions",
            //                    renderHeaderCell: () => { return "Actions"; },
            //                    renderCell: (item: DirectoryItemBase) =>
            //                    {
            //                        return (
            //                            <Button aria-label="Edit" icon={<EditRegular/>} onClick={(event) => this.onEditButtonClick(event, item)}/>);
            //                    }
            //                }),
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