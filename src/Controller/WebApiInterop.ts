import { HdError } from "../HdError";
import { IAppContext } from "./AppContext";
import { MessageTypes } from "./AppContextMessages";

export interface IRequestConfigOptions
{
    IncludeCredentials: boolean;
    UseCors: boolean;
    IncludeRequestContentType: boolean;
    AcceptType: string;
}

export const DefaultRequestConfigOptions: IRequestConfigOptions =
{
    IncludeCredentials: true,
    UseCors: true,
    IncludeRequestContentType: true,
    AcceptType: 'application/json'
};

export class WebApiInterop
{
    private m_sApiRoot: string;
    private m_authToken: string = "";
    private m_appContext: IAppContext;
    private m_requestOptions: IRequestConfigOptions = DefaultRequestConfigOptions;

    constructor(sApiRoot: string, appContext: IAppContext, requestOptions: IRequestConfigOptions = DefaultRequestConfigOptions)
    {
        this.m_sApiRoot = sApiRoot;
        this.m_appContext = appContext;
        this.m_requestOptions = requestOptions;
    }

    get isAuthenticated(): boolean {return this.m_authToken !== "";}

    static async FetchJsonDirect(sCall: string, request: any): Promise<any>
    {
        const result :Response  = await fetch(sCall, request);

        if (result.status >= 400)
            throw new Error(`FetchDirect failed: (${result.status})`);

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
            'Accept': this.m_requestOptions.AcceptType
        };

        if (this.m_requestOptions.IncludeRequestContentType)
            headerVals['Content-Type'] = 'application/json';

        const request: any = { headers: headerVals };

        if (this.m_requestOptions.UseCors)
            request.mode = 'cors';

        if (this.m_requestOptions.IncludeCredentials)
            request.credentials = 'include';

        //        if (this.m_authToken !== "")
        //            headerVals['Authorization'] = "Bearer " + this.m_authToken;

        return await WebApiInterop.FetchJsonDirect(sCall, request);
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