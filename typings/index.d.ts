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
            title: string,
            author: User,
            duration: number,
            genre: string,
            playCount: number,
            commentsCount: number,
            likesCount: number,
            thumbnail: string,
            publishedAt: Date,
            comments: Comment[];
            recommendedSongs: RecommendedSongs[];
        }

        interface PlaylistData {
            title: string;
            url: string;
            author: User,
            publishedAt: Date,
            duration: number;
            genre: string[]
        }

        interface searchResult {
            url: string;
            title: string;
            type: "track" | "user" | "playlist" | "all"
        }

        function validateURL(link: string): boolean;
        function getSongInfo(link: string): Promise<SongData>;
        function getUserInfo(link: string): Promise<User>;
        function search(query: string, type: "track" | "user" | "playlist" | "all"): Promise<searchResult[]>
        function getPlaylist(link: string): Promise<PlaylistData[]>;
        function getRecommendedSongs(link: string): Promise<RecommendedSongs[]>;
    }

    export = SouncloudScraper;

}
