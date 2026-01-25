import { HdApiBase } from "./HdApiBase";
import { WebApiInterop, DefaultRequestConfigOptions } from "../WebApiInterop";
import { IAppContext } from "../AppContext";
import { MessageTypes } from "../AppContextMessages";
import { s_staticConfig } from "../../StaticConfig";

export class Commands extends HdApiBase
{
    constructor(interop: WebApiInterop, appContext: IAppContext)
    {
        super(interop, appContext);
    }

    async DeleteItem(id: string): Promise<void>
    {
        try
        {
            await this.ApiInterop.FetchPost(`recorded/cmd?id=${id}&cmd=delete&rerecord=0`, null);
        }
        catch (e)
        {
            this.AppContext.Messages.error(["Failed to DeleteItem(${id})", `${e}`], MessageTypes.MessageBar);
        }
    }
}