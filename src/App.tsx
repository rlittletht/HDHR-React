import React from 'react';
import './App.css';

import { SessionInfo } from "./Components/Site/SessionInfo";
import { SiteHeader } from './Components/Site/SiteHeader';
import { TestButton } from './Components/TestButton';
import { StatusBoxToast } from "./Components/Site/StatusBoxToast";
import { Button, makeStyles } from '@fluentui/react-components';
import { IAppContext, TheAppContext } from "./Controller/AppContext";
import { DirectoryItemBase, isDirectoryItemSeries, getIdFromDirectoryItem, DirectoryItemEpisode } from "./Model/DirectoryItem";
import { DirectoryItemLine } from './Components/DirectoryItemLine';
import { Secrets } from './Secrets';
import { ItemsListWithStyles, ItemsListWithoutStyles, ItemsListProps } from "./Components/ItemsList";
import
{
    TableColumnDefinition,
    createTableColumn,
    TableCellLayout
} from '@fluentui/react-components';
import { DirectoryItemDetails } from "./Components/DirectoryItemDetails";
import { hdhrBlueThemeLight } from "./hdhrBlueTheme";
import { withStyles } from "./withStyles";
import { getTableColumnDefinitionsForDirectoryItemlist } from './Components/DirectoryItemList';
import { DirectoryItemsContainer } from './Components/DirectoryItemsContainer';
import { MessageTypes } from "./Controller/AppContextMessages";
import { ModalPrompt } from "./Components/Site/ModalPrompt";

export interface AppProps
{
}

export interface AppState
{
    items: DirectoryItemBase[];
    selectedItems: Set<TableRowId>;
    itemsDeleting?: DirectoryItemEpisode[],
    deleteConfirmationDetails?: string[],
    isConfirmingDelete?: boolean,
}

const useStyles = makeStyles(
    {
    });

export class AppWithoutStyles extends React.Component<AppProps, AppState>
{
    context!: IAppContext;
    static contextType = TheAppContext;

    constructor(props: AppProps)
    {
        super(props);

        this.state = {
            items: [],
            selectedItems: new Set<TableRowId>(),
            ...this.stateSetNotDeleting()
        };
    }

    async connect()
    {
        this.context.Connect(`http://hdhr-${Secrets.DeviceID}.local`);

        this.setState(
            {
                items: await this.context.HdApi.Directory.GetRootDirectoryListing()
            });
    }

    async openSeries(seriesUrl: string): Promise
    {
        this.setState(
            {
                items: await this.context.HdApi.Directory.GetSeriesDirectoryListing(seriesUrl)
            }
        )
    }


    startConfirmDelete(items: DirectoryItemEpisode[]): void
    {
        const confirmationDetails: string[] = [];

        for (const episode of items)
            confirmationDetails.push(`${episode.Title} (${episode.EpisodeNumber})`);

        if (confirmationDetails.length == 0)
        {
            this.context.Messages.message(
                "Delete episodes",
                ["There is nothing to remove for these episodes."],
                MessageTypes.Toast,
                4000);
            return;
        }

        this.setState(
            {
                isConfirmingDelete: true,
                itemsDeleting: items,
                deleteConfirmationDetails: confirmationDetails
            });
    }

    async deleteEpisode(id: string): Promise
    {
        const items: DirectoryItemEpisode[] = this.state.items.filter((_item) => isDirectoryItemSeries(_item) == false && (_item as DirectoryItemEpisode).Id === id) as DirectoryItemEpisode[];

        this.startConfirmDelete(items);
        return;
    }

    async doDeleteEpisodeNoConfirm(id: string)
    {
        await this.context.HdApi.Commands.DeleteItem(id);

        const newItems = this.state.items.filter((item) => item.Id !== id);
        this.setState(
            {
                items: newItems
            });
    }

    deleteAllSelected()
    {
        if (this.state.selectedItems.size == 0)
        {
            this.context.Messages.message("No episodes selected", ["Please select one or more episodes to delete."], MessageTypes.MessageBar, 2000);
            return;
        }

        const selectedItems: DirectoryItemEpisode[] = this.state.items.filter((_item) => this.state.selectedItems.has(_item.Id));

        this.startConfirmDelete(selectedItems);
    }

    isConfirmingDelete(): boolean
    {
        return this.state.isConfirmingDelete;
    }

    async pauseForNextDelete(ms: number): Promise<void>
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async onDeleteConfirmed()
    {
        const itemsToDelete = (this.state.itemsDeleting ?? []).map((_item) => _item.Id);

        if (itemsToDelete.length == 0)
            return;

        for (const id of itemsToDelete)
        {
            await this.doDeleteEpisodeNoConfirm(id);
            this.context.Messages.message("Episode Deleted", [`Deleted episode with ID ${id}`], MessageTypes.Toast, 2000);
            await this.pauseForNextDelete(500);
        }

        this.onDismiss();
    }

    stateSetNotDeleting()
    {
        return {
            isConfirmingDelete: false,
            itemsDeleting: undefined,
            deleteConfirmationDetails: [],
        };
    }

    onDismiss()
    {
        this.setState(this.stateSetNotDeleting());
    }

    onSelectionChange(selectedItems: Set<TableRowId>)
    {
        this.setState({ selectedItems: selectedItems });
    }

    render()
    {
        //       const items = this.state.items.map(
        //           (item, index) => (
        //               <DirectoryItemLine key={index} item={item}/>));

        const onOpenClicked = this.openSeries.bind(this);
        const onDeleteClicked = this.deleteEpisode.bind(this);
        const onDismiss = this.onDismiss.bind(this);

        const confirmTitle = this.state.isConfirmingDelete ? "Completely delete user?" : "Delete user from group?";
        const onDeleteConfirmed = this.onDeleteConfirmed.bind(this);

        const deleteDetails = this.state.deleteConfirmationDetails.map((_item, _idx) => (<li key={_idx}>{_item}</li>));

        const confirmDeleteDialog = (
            <ModalPrompt title={confirmTitle} confirm="Delete" onDismiss={onDismiss} onSave={onDeleteConfirmed} open={this.isConfirmingDelete()} visible={false}>
                <div>
                    Deleting these user(s) will also delete the following:
                    <ul>{deleteDetails}</ul>
                    Are you sure you want to delete {this.state.itemsDeleting?.length ?? 0} episodes?
                </div>
            </ModalPrompt>);


        return (
            <div>
                {this.isConfirmingDelete() && confirmDeleteDialog}
                <SiteHeader/>
                <SessionInfo/>
                <StatusBoxToast/>
                <Button onClick={this.connect.bind(this)}>
                    Read Root
                </Button>
                <Button onClick={this.deleteAllSelected.bind(this)}>Delete Selected Episodes</Button>

                <DirectoryItemsContainer items={this.state.items} onOpenClicked={onOpenClicked} onDeleteClicked={onDeleteClicked}
                                         onSelectionChange={this.onSelectionChange.bind(this)}
                                         selectedItems={this.state.selectedItems}
                />
            </div>);
    }
}

export const App = withStyles(useStyles, AppWithoutStyles);