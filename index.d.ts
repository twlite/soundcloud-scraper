/**
 * Typings by ZYROUGE
 * Maintained by Snowflake Studio ❄
 */

import m3u8stream from "m3u8stream";
import { RequestOptions, IncomingMessage } from "http";
import { Response } from "node-fetch";
import { load as CherrioLoad } from "cheerio";

declare interface SimpleJSON {
    [s: string]: any;
}

declare interface ClientOptions {
    fetchAPIKey?: boolean;
}

declare class Client {
    constructor(API_KEY?: string, ClientOptions?: ClientOptions);
    API_KEY: string;
    options: ClientOptions;
    apiVersion(force?: boolean): Promise<string | null>;
    getSongInfo(
        url: string,
        options?: {
            fetchEmbed: boolean;
            fetchComments: boolean;
            fetchStreamURL: boolean;
        }
    ): Promise<Song>;
    getPlaylist(
        url: string,
        options?: PlaylistParseOptions
    ): Promise<Playlist>;
    search(
        query: string,
        type?: "all" | "artist" | "playlist" | "track"
    ): Promise<SearchResult[]>;
    getUser(username: string): Promise<UserInfo>;
    getEmbed(embedURL: string): Promise<Embed>;
    createAPIKey(KEY?: string | null, fetch?: boolean): Promise<void>;
    fetchStreamURL(trackURL: string): Promise<string | null>;
}

declare const Constants: SimpleJSON;
declare const Store: Map<any, any>;
declare const version: string;

type validateURL = (url?: string) => boolean;
type keygen = (force?: boolean) => Promise<string | null>;
declare class Util {
    static last(arr?: any[]): any;
    static validateURL: validateURL;
    static request(
        url?: RequestInfo,
        options?: RequestInit
    ): Promise<Response>;
    static parseHTML(
        url?: RequestInfo,
        options?: RequestInit
    ): Promise<string>;
    static loadHTML(html?: string | null): ReturnType<typeof CherrioLoad>;
    static parseDuration(duration: string): number;
    static parseComments(commentSection: string): Comment[];
    static fetchSongStreamURL(
        songURL: string,
        clientID: string | null
    ): Promise<string>;
    static keygen: keygen;
}

type downloadHLS = (
    url: string,
    options?: m3u8stream.Options
) => Promise<m3u8stream.Stream>;

type downloadProgressive = (
    url: string,
    options?: RequestOptions
) => Promise<IncomingMessage>;

declare class StreamDownloader {
    static downloadHLS: downloadHLS;
    static downloadProgressive: downloadProgressive;
}

declare class Embed {
    constructor(data: object, embedURL?: string | null);
    url: string;
    version: number;
    type: string;
    provider: {
        name: string;
        url: string;
    };
    height: number;
    width: number;
    title: string;
    description: string;
    author: {
        name: string;
        url: string;
    };
    thumbnailURL: string;
    visualizer: string;
    toHTML(): string;
    toJSON(): SimpleJSON;
    toString(): string;
}

declare interface SongAuthor {
    name: string;
    username: string;
    url: string;
    avatarURL: string;
    urn: number;
    verified: boolean;
    followers: number;
    following: number;
}

declare interface Comment {
    text: string;
    createdAt: Date;
    author: {
        name: string;
        username: string;
        url: string;
    };
}

declare interface SongData {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    duration: number;
    playCount: string;
    commentsCount: string;
    likes: string;
    genre: string;
    author: SongAuthor;
    publishedAt: Date;
    embedURL: string;
    embed: Embed | null;
    track: {
        hls: string;
        progressive: string;
    };
    trackURL: string;
    streamURL: string;
    comments: Comment[];
}

declare class Song {
    constructor(data: SimpleJSON);
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    duration: number;
    playCount: number;
    commentsCount: number;
    likes: number;
    genre: string;
    author: SongAuthor;
    publishedAt: Date;
    embedURL: string;
    embed: Embed;
    streams: {
        hls: string;
        progressive: string;
    };
    trackURL: string;
    comments: Comment[];
    streamURL: string;
    age: number;
    publishedTimestamp: number;
    downloadHLS: downloadHLS;
    downloadProgressive: downloadProgressive;
    toString(): string;
    toJSON(): SongData;
}

declare interface PlaylistParseOptions {
    fetchEmbed?: boolean;
}

declare interface Playlist {
    id: number;
    title: string;
    url: string;
    description: string;
    thumbnail: string;
    author: {
        name: string;
        username: string;
        urn: number;
        profile: string;
    };
    embedURL: string;
    embed: Embed | null;
    genre: string;
    trackCount: number;
    tracks: SimpleJSON[];
}

declare interface SearchResult {
    index: number;
    artist: string | null;
    url: string;
    itemName: string;
    name: string;
    type: "track" | "artist" | "playlist" | "unknown";
}

declare interface UserTracks {
    title: string;
    url: string;
    publishedAt: Date;
    genre: string;
    author: string;
    duration: number;
}

declare interface UserLikes {
    title: string;
    url: string;
    publishedAt: Date;
    author: {
        name: string;
        username: string;
        profile: string;
    };
}

declare interface UserInfo {
    urn: number;
    username: string;
    name: string;
    verified: boolean;
    createdAt: Date;
    avatarURL: string | null;
    profile: string;
    bannerURL: string | null;
    followers: number;
    following: number;
    likesCount: number;
    tracksCount: number;
    tracks: UserTracks[];
    likes: UserLikes[];
}