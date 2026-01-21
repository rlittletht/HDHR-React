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

export interface IAppContext
{
}

export class AppContext implements IAppContext
{
}

export const TheAppContext = React.createContext(new AppContext());