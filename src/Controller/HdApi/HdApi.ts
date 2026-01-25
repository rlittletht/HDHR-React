import { HdApiBase } from "./HdApiBase";
import { Directory } from "./Directory";
import { IAppContext } from "../AppContext";
import { WebApiInterop, IRequestConfigOptions } from "../WebApiInterop";
import { Commands } from "./Commands";

export class HdApi extends HdApiBase
{
    Directory: Directory;
    Commands: Commands;

    constructor(root: string, appContext: IAppContext, requestConfigOptions: IRequestConfigOptions)
    {
        const apiInterop = new WebApiInterop(root, appContext, requestConfigOptions);

        super(apiInterop, appContext);

        this.Directory = new Directory(apiInterop, appContext);
        this.Commands = new Commands(apiInterop, appContext);
    }
}
