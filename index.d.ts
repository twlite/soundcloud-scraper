declare module 'soundcloud-scraper' {

    namespace SouncloudScraper {
        interface SongData {
            title: string,
            author: string,
            duration: number,
            genre: string,
            playCount: number,
            commentsCount: number,
            likeCount: number,
            thumbnail: string
        }

        function validateURL(link: string): boolean;
        function getSongInfo(link: string): Promise<SongData>;
    }

    export = SouncloudScraper;

}
