import React from 'react';
import './App.css';

import { SessionInfo } from "./Components/Site/SessionInfo";
import { SiteHeader } from './Components/Site/SiteHeader';
import { TestButton } from './Components/TestButton';
import { StatusBoxToast } from "./Components/Site/StatusBoxToast";

export interface AppProps
{
}

export interface AppState
{
}

export class App extends React.Component<AppProps, AppState>
{
    render()
    {
        return (
            <div>
                <SiteHeader/>
                <SessionInfo/>
                <StatusBoxToast/>
                <TestButton/>
            </div>);
    }
}