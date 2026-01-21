import { HdApiBase } from "./HdApiBase";
import { WebApiInterop } from "../WebApiInterop";
import { IAppContext } from "../AppContext";
import { DirectoryItemBase } from "../../Model/DirectoryItem";
import { MessageTypes } from "../AppContextMessages";

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
