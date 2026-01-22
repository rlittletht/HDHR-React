import React from 'react';
import './App.css';

import { SessionInfo } from "./Components/Site/SessionInfo";
import { SiteHeader } from './Components/Site/SiteHeader';
import { TestButton } from './Components/TestButton';
import { StatusBoxToast } from "./Components/Site/StatusBoxToast";
import { Button, makeStyles } from '@fluentui/react-components';
import { IAppContext, TheAppContext } from "./Controller/AppContext";
import { DirectoryItemBase, isDirectoryItemSeries, DirectoryItemBase as IDirectoryItemBase, getIdFromDirectoryItem } from "./Model/DirectoryItem";
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

export interface AppProps
{
}

export interface AppState
{
    items: DirectoryItemBase[];
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
            items: []
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

    render()
    {
        //       const items = this.state.items.map(
        //           (item, index) => (
        //               <DirectoryItemLine key={index} item={item}/>));

        const onOpenClicked = this.openSeries.bind(this);

        return (
            <div>
                <SiteHeader/>
                <SessionInfo/>
                <StatusBoxToast/>
                <TestButton/>
                <Button onClick={this.connect.bind(this)}>
                    CONNECT!
                </Button>
                <DirectoryItemsContainer items={this.state.items} onOpenClicked={onOpenClicked} />
            </div>);
    }
}

export const App = withStyles(useStyles, AppWithoutStyles);