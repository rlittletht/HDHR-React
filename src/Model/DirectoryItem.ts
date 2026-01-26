export declare type DirectoryItemCategory = "series";

export interface DirectoryItemBase
{
    SeriesID: string;
    Title: string;
    Category: DirectoryItemCategory;
    ImageURL: string;
    StartTime: number;
    New: number;
}

export interface DirectoryItemSeries extends DirectoryItemBase
{
    EpisodesURL: string;
}

export interface DirectoryItemEpisode extends DirectoryItemBase
{
    EndTime: number;
    OriginalAirdate: number;
    RecordEndTime: number;
    RecordStartTime: number;
    RecordSuccess: 1;
    ChannelImageURL: string;
    ChannelName: string;
    ChannelNumber: string;
    EpisodeNumber: string;
    EpisodeTitle: string;
    ProgramID: string;
    Synopsis: string;
    Title: string;
    Filename: string;
    Id: string;
}

export function extractIdFromUrl(url: string): string
{
    const urlObj = new URL(url);
    return urlObj.searchParams.get("id");
}

export function isDirectoryItemSeries(item: DirectoryItemBase): boolean
{
    if ((item as DirectoryItemSeries).EpisodesURL !== undefined)
        return true;

    return false;
}

export function isDirectoryItemEpisode(item: DirectoryItemBase): boolean
{
    if ((item as DirectoryItemEpisode).ProgramID !== undefined)
        return true;

    return false;
}

export function getSeriesEpisodeFromItem(item: DirectoryItemBase): string
{
    if (isDirectoryItemEpisode(item))
    {
        const episodeNumber = (item as DirectoryItemEpisode).EpisodeNumber;

        return episodeNumber || "";
    }

    return item.SeriesID;
}

export function getIdFromDirectoryItem(item: DirectoryItemBase): string
{
    if (isDirectoryItemEpisode(item))
        return (item as DirectoryItemEpisode).Id;
    else if (isDirectoryItemSeries(item))
        return (item as DirectoryItemSeries).EpisodesURL;

    throw new Error("unknown item type");
}

export function getSeries(item: DirectoryItemBase): DirectoryItemSeries | null
{
    if (isDirectoryItemSeries(item))
        return item as DirectoryItemSeries;
    return null;
}

export function getEpisode(item: DirectoryItemBase): DirectoryItemEpisode | null
{
    if (isDirectoryItemEpisode(item))
        return item as DirectoryItemEpisode;
    return null;
}


export function itemsContainEpisodes(items: DirectoryItemBase[]): boolean
{
    for (const item of items)
    {
        if (isDirectoryItemEpisode(item))
            return true;
    }
    return false;
}

export function getCmdApiForEpisodeId(episode: string, cmd: string): string
{
    return `recorded/cmd?id=${episode}&cmd=${cmd}`;
}

export function getPlayApiForEpisodeId(episode: string): string
{
    return `recorded/play?id=${episode}`;
}

export async function copyPathToClipboard(episode: DirectoryItemEpisode): Promise<void>
{
    try
    {
        await navigator.clipboard.writeText(episode.Filename);
    }
    catch (error)
    {
        console.error("Failed to copy path to clipboard:", error);
        throw error;
    }
}
