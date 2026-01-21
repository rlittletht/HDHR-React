import { HdApiBase } from "./HdApiBase";
import { Directory } from "./Directory";
import { IAppContext } from "../AppContext";
import { WebApiInterop, IRequestConfigOptions } from "../WebApiInterop";

export class HdApi extends HdApiBase
{
    Directory: Directory;

    constructor(root: string, appContext: IAppContext, requestConfigOptions: IRequestConfigOptions)
    {
        const apiInterop = new WebApiInterop(root, appContext, requestConfigOptions);

        super(apiInterop, appContext);

        this.Directory = new Directory(apiInterop, appContext);
    }
}
