import m3u8stream from "m3u8stream";
import { RequestOptions, IncomingMessage } from "http";
import { RequestInfo, RequestInit, Response } from "node-fetch";
import { load as CherrioLoad } from "cheerio";

declare module "soundcloud-scraper" {
    export interface SimpleJSON {
        [s: string]: any;
    }

    export interface ClientOptions {
        fetchAPIKey?: boolean;
    }

    export class Client {
        constructor(API_KEY?: string, ClientOptions?: ClientOptions);
        API_KEY: string;
        options: ClientOptions;
        apiVersion(force?: boolean): Promise<string | null>;
        getSongInfo(url: string, options?: {
            fetchEmbed: boolean;
            fetchComments: boolean;
            fetchStreamURL: boolean;
        }): Promise<Song>;
        getPlaylist(url: string, options?: PlaylistParseOptions): Promise<Playlist>;
        search(query: string, type?: "all" | "artist" | "playlist" | "track"): Promise<SearchResult[]>;
        getUser(username: string): Promise<UserInfo>;
        getEmbed(embedURL: string): Promise<Embed>;
        createAPIKey(KEY?: string | null, fetch?: boolean): Promise<void>;
        fetchStreamURL(trackURL: string): Promise<string | null>;
    }

    export type validateURL = (url?: string) => boolean;
    export type keygen = (force?: boolean) => Promise<string | null>;
    export class Util {
        static last(arr?: any[]): any;
        static validateURL: validateURL;
        static request(url?: RequestInfo, options?: RequestInit): Promise<Response>;
        static parseHTML(url?: RequestInfo, options?: RequestInit): Promise<string>;
        static loadHTML(html?: string | null): ReturnType<typeof CherrioLoad>;
        static parseDuration(duration: string): number;
        static parseComments(commentSection: string): Comment[];
        static fetchSongStreamURL(songURL: string, clientID: string | null): Promise<string>;
        static keygen: keygen;
    }

    export type downloadHLS = (options?: m3u8stream.Options) => Promise<m3u8stream.Stream>;
    export type downloadProgressive = (options?: RequestOptions) => Promise<IncomingMessage>; 
    export class StreamDownloader {
        static downloadHLS: downloadHLS;
        static downloadProgressive: downloadProgressive;
    }

    export class Embed {
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

    export interface SongAuthor {
        name: string;
        username: string;
        url: string;
        avatarURL: string;
        urn: number;
        verified: boolean;
        followers: number;
        following: number;
    }

    export interface Comment {
        text: string;
        createdAt: Date;
        author: {
            name: string;
            username: string;
            url: string;
        };
    }

    export interface SongData {
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

    export class Song {
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

    export interface PlaylistParseOptions {
        fetchEmbed?: boolean;
    }

    export interface Playlist {
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
        tracks: any[];
    }

    export interface SearchResult {
        index: number;
        artist: string | null;
        url: string;
        itemName: string;
        name: string;
        type: "track" | "artist" | "playlist" | "unknown";
    }

    export interface UserTracks {
        title: string;
        url: string;
        publishedAt: Date;
        genre: string;
        author: string;
        duration: number;
    }

    export interface UserLikes {
        title: string;
        url: string;
        publishedAt: Date;
        author: {
            name: string;
            username: string;
            profile: string;
        };
    }

    export interface UserInfo {
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

    interface SoundCloud {
        Client: Client;
        Constants: SimpleJSON;
        keygen: keygen;
        Store: Map<any, any>;
        StreamDownloader: StreamDownloader;
        Util: Util;
        validateURL: validateURL;
        version: string;
    }
    export = SoundCloud;
}