
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
    EndTime: 1765747800;
    OriginalAirdate: 1763769600;
    RecordEndTime: 1765747830;
    RecordStartTime: 1765745970;
    StartTime: 1765746000;
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
    PlayURL: string;
    CmdURL: string;
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

export function getIdFromDirectoryItem(item: DirectoryItemBase): string
{
    if (isDirectoryItemEpisode(item))
        return (item as DirectoryItemEpisode).CmdURL;
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

