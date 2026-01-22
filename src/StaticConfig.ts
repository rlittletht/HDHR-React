

export interface IStaticConfig
{
    version: string,
    globalLogging: boolean,
    debuggingInfo: boolean,
    isLocalHost: boolean;
    cdnRoot: string;
    perfTimers: boolean;
    appLogging: boolean;
    showDebug: boolean;
    testSources?: Map<string, string>;
}

const isLocalHost = window.location.host.indexOf('localhost') > -1;

export const s_staticConfig: IStaticConfig =
{
    version: "0.0.0.1",
    globalLogging: true && isLocalHost,
    debuggingInfo: false && isLocalHost,
    isLocalHost: isLocalHost,
    cdnRoot: isLocalHost ? "https://localhost:3000" : "<<no production - localhost only>>",
    perfTimers: isLocalHost,
    appLogging: true && isLocalHost,
    showDebug: true && isLocalHost,
    testSources: new Map([["Root", "./TestContent/Root.json"], ["C329265ENHFRI", "./TestContent/C329265ENHFRI.json"]])
}
