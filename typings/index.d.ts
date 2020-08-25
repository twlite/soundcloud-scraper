import { Readable } from "stream";

declare module 'soundcloud-scraper' {

    namespace SouncloudScraper {
        
        class User {
            public constructor(data?: object);
            public name: string | null;
            public username: string | null;
            public followers: number;
            public createdAt: Date | null;
            public avatarURL: string | null;
            public profile: string | null;
            public readonly id: string | null;
            public readonly avatar: string | null;
            public readonly createdTimestamp: string | null;
            public readonly age: number;
            public urn: number;
            public toString(): string;
            private _patch(data?: object, cache?: boolean): any;
        }

        interface RecommendedSongs {
            title: string;
            url: string;
            publishedAt: Date;
            author: User;
        }

        interface Comment {
            content: string;
            createdAt: Date;
            author: User;
        }

        interface SongData {
            id: string;
            title: string;
            author: User;
            duration: number;
            genre: string;
            playCount: number;
            commentsCount: number;
            likesCount: number;
            thumbnail: string;
            publishedAt: Date;
            comments: Comment[];
            recommendedSongs: RecommendedSongs[];
            trackURL: string;
        }

        interface PlaylistData {
            title: string;
            url: string;
            author: User,
            publishedAt: Date,
            duration: number;
            genre: string[];
        }

        interface searchResult {
            url: string;
            title: string;
            type: "track" | "user" | "playlist" | "all"
        }

        interface FetchOptions {
            recommended?: boolean;
            comments?: boolean;
        }

        /**
         * Validates soundcloud url
         * @param link URL to validate
         */
        function validateURL(link: string): boolean;

        /**
         * Fetches track info
         * @param link Track url
         * @param options Search options
         */
        function getSongInfo(link: string, options?: FetchOptions): Promise<SongData>;

        /**
         * Fetches user info
         * @param link User profile url
         */
        function getUserInfo(link: string): Promise<User>;

        /**
         * Fetches user likes
         * @param link User profile url
         */
        function getUserLikes(link: string, limit: number): Promise<JSON>;

        /**
         * Search something on soundcloud
         * @param query Search query
         * @param type Search type
         */
        function search(query: string, type: "track" | "user" | "playlist" | "all"): Promise<searchResult[]>;

        /**
         * Fetches tracks from a playlist
         * @param link Playlist url
         */
        function getPlaylist(link: string): Promise<PlaylistData[]>;

        /**
         * Fetches recommended songs
         * @param link Track url
         */
        function getRecommendedSongs(link: string): Promise<RecommendedSongs[]>;

        /**
         * Fetches soundcloud api key
         */
        function fetchSoundcloudKey(): Promise<string|null>;

        /**
         * Fetches soundcloud api version
         */
        function fetchSoundcloudVersion(): Promise<string|null>;

        /**
         * Downloads soundcloud stream
         * @param link Soundcloud track url
         */
        function download(link: string): Promise<Readable>;
    }

    export = SouncloudScraper;

}
