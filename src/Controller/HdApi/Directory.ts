import { HdApiBase } from "./HdApiBase";
import { WebApiInterop, DefaultRequestConfigOptions } from "../WebApiInterop";
import { IAppContext } from "../AppContext";
import { DirectoryItemBase } from "../../Model/DirectoryItem";
import { MessageTypes } from "../AppContextMessages";
import { s_staticConfig } from "../../StaticConfig";

export class Directory extends HdApiBase
{
	constructor(interop: WebApiInterop, appContext: IAppContext)
	{
		super(interop, appContext);
	}

    async GetRootDirectoryListing(): Promise<DirectoryItemBase[]>
	{
        try
        {
            const test = DefaultRequestConfigOptions;

            if (s_staticConfig.testSources && s_staticConfig.testSources.get("Root"))
            {
                return await WebApiInterop.FetchJsonDirect(s_staticConfig.testSources.get("Root")!, {});
            }

            const result = await this.ApiInterop.Fetch<DirectoryItemBase[]>(
                "recorded_files.json",
                []);

            return result;
        }
        catch (e)
        {
            this.AppContext.Messages.error(["Failed to GetRootDirectoryListing", `${e}`], MessageTypes.MessageBar);
        }

        return [];
	}
}
