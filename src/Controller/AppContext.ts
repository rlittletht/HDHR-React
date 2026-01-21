/*----------------------------------------------------------------------------
    AppContext

    This is the context for the entire app, almost available
    in the current component by including int he component definition:

    {
        ...
        context!: IAppContext;
        static contextType = TheAppContext;
        ...
    }
----------------------------------------------------------------------------*/
import React from 'react';
import { IAppContextMessages, AppContextMessages } from "./AppContextMessages";

export interface IAppContext
{
    Messages: IAppContextMessages;
}

export interface AddLogMessageDelegate
{
    (message: string, msecVisible: number): void;
}

export class AppContext implements IAppContext
{
    Messages: AppContextMessages = new AppContextMessages();

    m_addLogMessageDelegate: AddLogMessageDelegate = () => {};
}

export const TheAppContext = React.createContext(new AppContext());
