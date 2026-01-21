import { WebApiInterop } from "../WebApiInterop";
import { IAppContext } from "../AppContext";

export class HdApiBase
{
    private webApiInterop?: WebApiInterop;
    private appContext?: IAppContext;

    /*----------------------------------------------------------------------------
        %%Function: ApiInterop
        %%Qualified: HdApiBase.ApiInterop
    ----------------------------------------------------------------------------*/
    protected get ApiInterop(): WebApiInterop
    {
        if (this.webApiInterop == null)
            throw new Error("api not initialized");

        return this.webApiInterop;
    }

    protected set ApiInterop(value: WebApiInterop)
    {
        this.webApiInterop = value;
    }

    /*----------------------------------------------------------------------------
        %%Function: AppContext
        %%Qualified: HdApiBase.AppContext
    ----------------------------------------------------------------------------*/
    protected get AppContext(): IAppContext
    {
        if (this.appContext == null)
            throw new Error("api not intialized");

        return this.appContext;
    }

    protected set AppContext(value: IAppContext)
    {
        this.appContext = value;
    }

    /*----------------------------------------------------------------------------
        %%Function: constructor
        %%Qualified: HdApiBase.constructor
    ----------------------------------------------------------------------------*/
    constructor(apiInterop: WebApiInterop, appContext: IAppContext)
    {
        this.ApiInterop = apiInterop;
        this.appContext = appContext;
    }
}