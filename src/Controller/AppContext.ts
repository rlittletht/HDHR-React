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
import { HdApi } from "./HdApi/HdApi";
import { IRequestConfigOptions } from "./WebApiInterop";

export interface IAppContext
{
    Messages: IAppContextMessages;

    Connect(host: string): Promise<void>;
    readonly HdApi: HdApi;
}

export interface AddLogMessageDelegate
{
    (message: string, msecVisible: number): void;
}

export class AppContext implements IAppContext
{
    Messages: AppContextMessages = new AppContextMessages();

    m_addLogMessageDelegate: AddLogMessageDelegate = () => {};

    m_hdApi: HdApi | undefined;

    get HdApi(): HdApi
    {
        return this.m_hdApi!;
    }

    async Connect(host: string): Promise<void>
    {
        const options: IRequestConfigOptions =
        {
            "IncludeCredentials": false,
            "UseCors": false,
            IncludeRequestContentType: false,
            AcceptType: '*/*'
        };

        this.m_hdApi = new HdApi(host, this, options);
    }
}

export const TheAppContext = React.createContext(new AppContext());