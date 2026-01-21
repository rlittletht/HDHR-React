import { HdError } from "../HdError";
import { IAppContext } from "./AppContext";
import { MessageTypes } from "./AppContextMessages";

export class WebApiInterop
{
    private m_sApiRoot: string;
    private m_authToken: string = "";
    private m_appContext: IAppContext;

    constructor(sApiRoot: string, appContext: IAppContext)
    {
        this.m_sApiRoot = sApiRoot;
        this.m_appContext = appContext;
    }

    get isAuthenticated(): boolean { return this.m_authToken !== ""; }

    async FetchJson(sApi: string, args: any[]): Promise<any>
    {
        let rgs: string[] = [];

        for (var arg of args)
        {
            for (var key in arg)
                rgs.push(`${key}=${arg[key]}`);
        }

        let sCall = this.m_sApiRoot.concat("/", sApi, "?", rgs.join("&"));

        const headerVals: any =
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json' // ,
        };

        //        if (this.m_authToken !== "")
        //            headerVals['Authorization'] = "Bearer " + this.m_authToken;

        let result: Response = await fetch(
            sCall,
            {
                mode: 'cors',
                credentials: 'include',
                headers: headerVals
            });

        if (result.status >= 400)
            throw new Error(`FetchJson failed: (${result.status})`);

        try
        {
            return await result.json();
        }
        catch (e)
        {
            if (e instanceof Error)
            {
                if (e.message.indexOf('end of JSON input') > 0)
                    return null;
            }

            throw (e);
        }
    }

    async FetchJsonWithPost(sApi: string, args: any): Promise<any>
    {
        let sCall = this.m_sApiRoot.concat("/", sApi);

        const headerVals: any =
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json' // ,
        };

        //        if (this.m_authToken !== "")
        //            headerVals['Authorization'] = "Bearer " + this.m_authToken;

        let result: Response = await fetch(
            sCall,
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: headerVals,
                body: JSON.stringify(args)
            });

        if (result.status >= 400)
            throw new Error(`FetchJson failed: (${result.status})`);

        try
        {
            return await result.json();
        }
        catch (e)
        {
            if (e instanceof Error)
            {
                if (e.message.indexOf('end of JSON input') > 0)
                    return null;
            }

            throw (e);
        }
    }

    async FetchPost<T>(sApi: string, args: any, errorReturn?: T): Promise<T>
    {
        try
        {
            var json = await this.FetchJsonWithPost(sApi, args);

            return json as T;
        }
        catch (exc)
        {
            if (errorReturn === undefined)
                throw exc;

            this.m_appContext.Messages.error([`Failed to call service function ${sApi}`, `Error: ${exc}`], MessageTypes.MessageBar)
            return errorReturn;
        }
    }

    async Fetch<T>(sApi: string, args: any[], errorReturn?: T): Promise<T>
    {
        try
        {
            var json = await this.FetchJson(sApi, args);

            return json as T;
        }
        catch (exc)
        {
            if (errorReturn === undefined)
                throw exc;

            this.m_appContext.Messages.error([`Failed to call service function ${sApi}`, `Error: ${exc}`, ...HdError.linesFromError(exc)], MessageTypes.MessageBar)
            return errorReturn;
        }
    }

    removeAuth()
    {
        this.m_authToken = "";
    }

    setAuth(token: string)
    {
        this.m_authToken = token;
    }

    public static OptionalParam<T>(key: string, value?: T): any
    {
        if (value === undefined)
            return {};

        return { [key]: value };
    }
}