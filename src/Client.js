const Util = require("./util/Util");
const Constants = require("./constants/Constants");
const Store = require("./store/Store");
const Embed = require("./structures/Embed");
const Song = require("./structures/Song");

/**
 * SoundCloud Scraper
 * @author Snowflake Studio ❄
 * @license MIT
 */
class SoundCloud {

    /**
     * SoundCloud Scraper
     * @param {?string} API_KEY Existing API key (if any). Else SoundCloud scraper will try to fetch one for you :)
     * @param {object} ClientOptions SoundCloud client options
     * @param {boolean} [ClientOptions.fetchAPIKey=true] If it should fetch and store soundcloud api key on startup
     */
    constructor(API_KEY = null, ClientOptions = { fetchAPIKey: true }) {

        /**
         * Default api key
         */
        this.API_KEY = null;

        /**
         * Client options
         */
        this.options = ClientOptions;

        /**
         * Update api key
         */
        this.createAPIKey(API_KEY, !!this.options.fetchAPIKey);
    }

    /**
     * Returns API version
     * @param {boolean} [force=false] IF it should forcefully parse version
     * @returns {Promise<?string>}
     */
    apiVersion(force = false) {
        return new Promise((resolve) => {
            const existing = Store.get("SOUNDCLOUD_API_VERSION");
            if (existing && !force) return resolve(existing);

            Util.parseHTML(`${Constants.SOUNDCLOUD_BASE_URL}${Constants.SOUNDCLOUD_API_VERSION}`)
                .then(version => {
                    Store.set("SOUNDCLOUD_API_VERSION", version);
                    resolve(version);
                })
                .catch(() => {
                    resolve(null);
                });
        });
    }

    /**
     * Returns soundcloud song info
     * @param {string} url Soundcloud song URL
     * @param {object} options SoundCloud song info options
     * @param {boolean} [options.fetchEmbed=false] If it should fetch embed
     * @param {boolean} [options.fetchComments=false] If it should fetch comments
     * @param {boolean} [options.fetchStreamURL=false] If it should fetch stream url
     * @returns {Promise<Song>}
     */
    getSongInfo(url, options = { fetchEmbed: false, fetchComments: false, fetchStreamURL: false }) {
        return new Promise(async (resolve, reject) => {
            if (typeof url !== "string") return reject(new TypeError(`URL type must be a string, received "${typeof url}"!`));
            if (!Util.validateURL(url)) return reject(new TypeError("Invalid song url!"));
            const raw = await Util.parseHTML(url);
            if (!raw) return reject(new Error("Couldn't parse html!"));
            const $ = Util.loadHTML(raw);

            // <temporary>
            const duration = raw.split('<meta itemprop="duration" content="') && raw.split('<meta itemprop="duration" content="')[1] && raw.split('<meta itemprop="duration" content="')[1].split('" />')[0];
            const name = raw.split("<h1 itemprop=\"name\">") && raw.split("<h1 itemprop=\"name\">")[1].split("by <a")[1] && raw.split("<h1 itemprop=\"name\">")[1].split("by <a")[1].split(">")[1] && raw.split("<h1 itemprop=\"name\">")[1].split("by <a")[1].split(">")[1].split("</a>")[0].replace("</a", "")
            const trackURLBase = raw.split('},{"url":"')[1];
            let trackURL = null;
            if (trackURLBase) trackURL = trackURLBase.split('","')[0];
            const commentSection = raw.split("<section class=\"comments\">") && raw.split("<section class=\"comments\">")[1].split("</section>")[0]
            // </temporary>

            const obj = {
                id: $("meta[property=\"al:ios:url\"]").attr("content").split(":").pop(),
                title: $("meta[property=\"og:title\"]").attr("content"),
                description: $("meta[property=\"og:description\"]").attr("content"),
                thumbnail: $("meta[property=\"og:image\"]").attr("content"),
                url: $("link[rel=\"canonical\"]").attr("href"),
                duration: duration ? Util.parseDuration(duration) : 0,
                playCount: $("meta[property=\"soundcloud:play_count\"]").attr("content"),
                commentsCount: $("meta[property=\"soundcloud:comments_count\"]").attr("content"),
                likes: $("meta[property=\"soundcloud:like_count\"]").attr("content"),
                genre: raw.split(",\"genre\":\"")[1] && raw.split(",\"genre\":\"")[1].split("\",\"")[0].replace(/\\u0026/g, "&"),
                author: {
                    name: name || null,
                    username: $("meta[property=\"soundcloud:user\"]").attr("content").replace("https://soundcloud.com/", ""),
                    url: $("meta[property=\"soundcloud:user\"]").attr("content"),
                    avatarURL: raw.split('"avatar_url":"') && raw.split('"avatar_url":"')[raw.split('"avatar_url":"').length - 1].split('"')[0] || null,
                    urn: parseInt(Constants.USER_URN_PATTERN.exec(raw).groups.urn) || null,
                    verified: !raw.includes("\",\"verified\":false,\"visuals\""),
                    followers: parseInt(raw.split(",\"followers_count\":") && raw.split(",\"followers_count\":")[1].split(",")[0]) || 0,
                    following: parseInt(raw.split(",\"followings_count\":") && raw.split(",\"followings_count\":")[1].split(",")[0]) || 0,
                },
                publishedAt: new Date(raw.split("<time pubdate>")[1] && raw.split("<time pubdate>")[1].split("</time>")[0]) || null,
                embedURL: $("link[type=\"text/json+oembed\"]").attr("href"),
                embed: !!options.fetchEmbed ? await this.getEmbed($("link[type=\"text/json+oembed\"]").attr("href")) : null,
                track: {
                    hls: trackURL.replace("/progressive", "/hls"),
                    progressive: trackURL
                },
                trackURL: trackURL,
                comments: !!options.fetchComments ? Util.parseComments(commentSection) : []
            };

            if (!!options.fetchStreamURL) {
                const url = await this.fetchStreamURL(obj.trackURL);
                obj.streamURL = url || "";
            } else obj.streamURL = "";

            return resolve(new Song(obj));
        });
    }

    /**
     * Returns SoundCloud song embed
     * @param {string} embedURL SoundCloud song embed url
     * @returns {Promise<Embed>}
     */
    getEmbed(embedURL) {
        return new Promise((resolve) => {
            if (typeof embedURL !== "string") throw new Error(`embedURL type must be a string, received "${typeof embedURL}"!`);
            Util.request(embedURL)
                .then(res => res.json())
                .then(json => {
                    const embed = new Embed(json, embedURL);
                    resolve(embed);
                })
                .catch(() => {
                    resolve(null);
                });
        });
    }

    /**
     * Creates API key
     * @param {?string} KEY Existing API key (if any). Else SoundCloud scraper will try to fetch one for you :)
     * @param {boolean} [fetch=true] If it should fetch one
     * @returns {Promise<void>}
     */
    async createAPIKey(KEY = null, fetch = true) {
        if (!KEY && !!fetch) {
            const key = await Util.keygen();
            if (key && typeof key === "string") this.API_KEY = key;
            else this.API_KEY = null;
        } else if (KEY){
            this.API_KEY = KEY;
            Store.set("SOUNDCLOUD_API_KEY", this.API_KEY);
        } else {
            this.API_KEY = null;
        }
    }

    /**
     * Fetch stream url from soundcloud track url
     * @param {string} trackURL Track url to fetch stream from
     * @returns {Promise<?string>}
     */
    async fetchStreamURL(trackURL) {
        if (!trackURL || typeof trackURL !== "string") throw new Error(`Expected track url, received "${typeof trackURL}"!`);
        try {
            const url = await Util.fetchSongStreamURL(trackURL, Store.get("SOUNDCLOUD_API_KEY"));
            const streamURL = url && typeof url === "string" ? url : null;
            return streamURL;
        } catch(e) {
            return null;
        }
    }
}

module.exports = SoundCloud;