
export interface StaticConfig
{
    version: string,
    globalLogging: boolean,
    debuggingInfo: boolean,
    isLocalHost: boolean;
    cdnRoot: string;
    perfTimers: boolean;
    appLogging: boolean;
    showDebug: boolean;
}

const isLocalHost = window.location.host.indexOf('localhost') > -1;

export const s_staticConfig: StaticConfig =
{
    version: "0.0.0.1",
    globalLogging: true && isLocalHost,
    debuggingInfo: false && isLocalHost,
    isLocalHost: isLocalHost,
    cdnRoot: isLocalHost ? "https://localhost:3000" : "<<no production - localhost only>>",
    perfTimers: isLocalHost,
    appLogging: true && isLocalHost,
    showDebug: true && isLocalHost
}
