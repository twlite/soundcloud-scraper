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
        }

        function validateURL(link: string): boolean;
        function getSongInfo(link: string): Promise<SongData>;
    }

    export = SouncloudScraper;

}
