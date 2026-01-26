import { HdApiBase } from "./HdApiBase";
import { WebApiInterop, DefaultRequestConfigOptions } from "../WebApiInterop";
import { IAppContext } from "../AppContext";
import { MessageTypes } from "../AppContextMessages";
import { s_staticConfig } from "../../StaticConfig";
import { getCmdApiForEpisodeId, getPlayApiForEpisodeId } from "../../Model/DirectoryItem";

export class Commands extends HdApiBase
{
    constructor(interop: WebApiInterop, appContext: IAppContext)
    {
        super(interop, appContext);
    }

    async DeleteItem(id: string,rerecord: number = 0): Promise<void>
    {
        try
        {
            await this.ApiInterop.FetchPost(getCmdApiForEpisodeId(id, `delete&rerecord=${rerecord}`), null);
        }
        catch (e)
        {
            this.AppContext.Messages.error(["Failed to DeleteItem(${id})", `${e}`], MessageTypes.MessageBar);
        }
    }

    async OpenWindowForEpisode(id: string): Promise<void>
    {
        const api = getPlayApiForEpisodeId(id);

        await this.ApiInterop.OpenWindow(api);
    }
}