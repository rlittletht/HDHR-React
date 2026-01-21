import React from 'react';
import './App.css';

import { SessionInfo } from "./Components/Site/SessionInfo";
import { SiteHeader } from './Components/Site/SiteHeader';
import { TestButton } from './Components/TestButton';
import { StatusBoxToast } from "./Components/Site/StatusBoxToast";
import { Button } from '@fluentui/react-components';
import { IAppContext, TheAppContext } from "./Controller/AppContext";
import { DirectoryItemBase } from "./Model/DirectoryItem";
import { DirectoryItemLine } from './Components/DirectoryItemLine';
import { Secrets } from './Secrets';

export interface AppProps
{
}

export interface AppState
{
    items: DirectoryItemBase[];
}

export class App extends React.Component<AppProps, AppState>
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

    render()
    {
        const items = this.state.items.map(
            (item, index) => (
                <DirectoryItemLine key={index} item={item}/>));

        return (
            <div>
                <SiteHeader/>
                <SessionInfo/>
                <StatusBoxToast/>
                <TestButton/>
                <Button onClick={this.connect.bind(this)}>
                    CONNECT!
                </Button>
                {items}
            </div>);
    }
}