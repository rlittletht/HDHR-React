import { HdApiBase } from "./HdApiBase";
import { WebApiInterop, DefaultRequestConfigOptions } from "../WebApiInterop";
import { IAppContext } from "../AppContext";
import { DirectoryItemBase, DirectoryItemEpisode, extractIdFromUrl } from "../../Model/DirectoryItem";
import { MessageTypes } from "../AppContextMessages";
import { s_staticConfig } from "../../StaticConfig";

interface DirectoryItemEpisodeWire extends Omit<DirectoryItemEpisode, 'Id'>
{
    PlayURL: string;
    CmdURL: string;
}

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
            let results: DirectoryItemBase;

            if (s_staticConfig.testSources && s_staticConfig.testSources.get("Root"))
                results = await WebApiInterop.FetchJsonDirect(s_staticConfig.testSources.get("Root")!, {});
            else
            {
                results = await this.ApiInterop.Fetch<DirectoryItemBase[]>(
                    "recorded_files.json",
                    []);
            }
            const uniqueResults = new Map<string, DirectoryItemEpisodeWire>();

            for (const result of results)
            {
                uniqueResults.set(result.SeriesID, result);
            }

            const seriesResults = [];
            for (const result of uniqueResults.values())
            {
                seriesResults.push(result);
            }
            return seriesResults;
        }
        catch (e)
        {
            this.AppContext.Messages.error(["Failed to GetRootDirectoryListing", `${e}`], MessageTypes.MessageBar);
        }

        return [];
    }

    private static convertWireToEpisodeInPlace(itemWire: DirectoryItemEpisodeWire): DirectoryItemEpisode
    {
        const item: DirectoryItemEpisode = itemWire as any as DirectoryItemEpisode;

        const id = extractIdFromUrl(itemWire.PlayURL);

        if (id !== extractIdFromUrl(itemWire.CmdURL))
            throw new Error(`Mismatched IDs in PlayURL and CmdURL: ${itemWire.PlayURL} vs ${itemWire.CmdURL}`);

        item.Id = id;

        return item;
    }

    async GetSeriesDirectoryListing(seriesId: string): Promise<DirectoryItemEpisode[]>
    {
        try
        {
            let results: DirectoryItemEpisode;

            if (s_staticConfig.testSources && s_staticConfig.testSources.get(seriesId))
                results = await WebApiInterop.FetchJsonDirect(s_staticConfig.testSources.get(seriesId)!, {});
            else
            {
                results = await this.ApiInterop.Fetch<DirectoryItemBase[]>(
                    `recorded_files.json`,
                    [
                        {
                            'SeriesID': seriesId
                        }
                    ]);
            }

            const uniqueResults = new Map<string, DirectoryItemEpisodeWire>();

            for (const result of results)
            {
                Directory.convertWireToEpisodeInPlace(result as DirectoryItemEpisodeWire);
                uniqueResults.set(result.Id, result as DirectoryItemEpisodeWire);
            }

            const episodes = [];

            for (const result of uniqueResults.values())
            {
                episodes.push(result as DirectoryItemEpisode);
            }

            return episodes;
        }
        catch (e)
        {
            this.AppContext.Messages.error(["Failed to GetSeriesDirectoryListing(${seriesId})", `${e}`], MessageTypes.MessageBar);
        }

        return [];
    }
}