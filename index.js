const User = require("./src/User.js");
const Util = require("./src/Util.js");
const BASE_TRACK_SEARCH = (mode) => `https://soundcloud.com/search${mode}?q=`;
const BASE_USER_LIKES = async (urn, clientId, limit, offset) => `https://api-v2.soundcloud.com/users/${urn}/track_likes?offset=${offset || ""}&limit=${limit || 200}&client_id=${clientId}&app_version=${await Util.apiVersion()}&app_locale=en`;
const { Readable } = require("stream");
const Store = require("./src/Store.js");

/**
 * Validate url. Returns true if the link given matches with soundcloud url.
 * @param {string} link Any url to validate
 */
module.exports.validateURL = (link) => Util.validateURL(link);

/**
 * Cache
 */
module.exports.getStore = () => Store;

/**
 * Returns soundcloud song info
 * @param {string} link Song url
 * @param {object} options Fetch options
 * @param {boolean} [options.recommended=false] Set it to true if you want recommended songs
 * @param {boolean} [options.comments=false] Set it to true if you want comments
 * @param {boolean} [options.fetchStreamURL=false] If it should parse stream url
 */
module.exports.getSongInfo = async (link, ops = { recommended: false, comments: false, fetchStreamURL: false }) => {
    if (!Util.validateURL(link)) throw new Error("Invalid url");

    const sourceHTML = await Util.parseHTML(link);
    const dom = Util.getDom(sourceHTML);
    const document = dom.window.document;
    const headerH1 = document.querySelector('header').children[0];
    const time = document.querySelector('header').children[1];
    const scripts = document.getElementsByTagName("script");
    const parsed = scripts[scripts.length - 1].textContent;
    const findFollowers = parsed.split('"followers_count":');

    const safeSelector = str => {
        const res = document.querySelector(str)
        return res && res.attributes.item(1).value
    }
    
    const safeSelectorAll = str => {
        const res = document.querySelectorAll(str)[0]
        return res && res.attributes.item(1).value
    }

    const trackURLBase = sourceHTML.split('},{"url":"')[1];
    let trackURL = '';
    if (trackURLBase) {
        trackURL = trackURLBase.split('","')[0];
    }
    
    let obj = {
        id: sourceHTML.split('content="soundcloud://sounds:')[1].split('">')[0],
        title: headerH1.children[0].textContent,
        author: new User({
            name: headerH1.children[1].textContent,
            followers: parseInt(findFollowers[findFollowers.length - 1].split(',')[0]),
            createdAt: new Date(sourceHTML.split('"created_at":"')[sourceHTML.split('"created_at":"').length - 1].split('","')[0]),
            avatarURL: sourceHTML.split('"avatar_url":"')[sourceHTML.split('"avatar_url":"').length - 1].split('"')[0],
            profile: sourceHTML.split('"permalink_url":"')[sourceHTML.split('"permalink_url":"').length - 1].split('"')[0]
        }),
        description: safeSelector('meta[property="og:description"]'),
        duration: Util.parseTime(safeSelector('meta[itemprop="duration"]')),
        genre: safeSelector('meta[itemprop="genre"]'),
        playCount: parseInt(safeSelectorAll('meta[property="soundcloud:play_count"]')),
        commentsCount: parseInt(safeSelectorAll('meta[property="soundcloud:comments_count"]')),
        likesCount: parseInt(safeSelectorAll('meta[property="soundcloud:like_count"]')),
        thumbnail: safeSelectorAll('meta[property="og:image"]'),
        publishedAt: new Date(time.textContent),
        embed: safeSelector('meta[itemprop="embedUrl"]'),
        comments: ops.comments ? Util.parseComments(document.getElementsByClassName("comments")[0].innerHTML) : [],
        recommendedSongs: ops.recommended ? await this.getRecommendedSongs(link) : [],
        trackURL,
        streamURL: ops.fetchStreamURL ? await this.getStreamURL(sourceHTML.split('},{"url":"')[1].split('","')[0], true) : null
    };

    return obj;
};

/**
 * Returns stream url
 * @param {string} songURL Song url
 * @param {string} [clientID=null] Soundcloud client id
 * @param {boolean} [parsedURL=false] If it is parsed url
 * @returns {Promise<string>}
 */
module.exports.getStreamURL = async (songURL, clientid=null, parsedURL=false) => {
    if (!songURL || typeof songURL !== "string") throw new Error("Invalid url");

    if (!parsedURL) {
        const sourceHTML = await Util.parseHTML(songURL);
        return await Util.fetchSongStreamURL(sourceHTML.split('},{"url":"')[1].split('","')[0], clientid);
    } else {
        return await Util.fetchSongStreamURL(songURL, clientid);
    }
};

/**
 * Fetches user and returns info
 * @param {string} link User profile url
 */
module.exports.getUserInfo = async (link) => {
    if (!Util.validateURL(link)) throw new Error("Invalid url");
    const sourceHTML = await Util.parseHTML(link);
    const dom = Util.getDom(sourceHTML);
    const document = dom.window.document;
    const header = document.querySelector('header');
    const scripts = document.getElementsByTagName("script");
    const parsed = scripts[scripts.length - 1].textContent;
    const findFollowers = parsed.split('"followers_count":');

    return new User({
        name: header.children[0].textContent,
        username: header.children[1].textContent,
        followers: parseInt(findFollowers[findFollowers.length - 1].split(',')[0]),
        createdAt: new Date(sourceHTML.split('"created_at":"')[sourceHTML.split('"created_at":"').length - 1].split('","')[0]),
        avatarURL: sourceHTML.split('"avatar_url":"')[sourceHTML.split('"avatar_url":"').length - 1].split('"')[0],
        profile: sourceHTML.split('"permalink_url":"')[sourceHTML.split('"permalink_url":"').length - 1].split('"')[0],
        urn: parseInt(/soundcloud:users:(?<urn>\d+)/.exec(sourceHTML).groups.urn)
    });
};

/**
 * Fetches user likes and returns info
 * @param {string} link User profile url
 * @returns {Promise<JSON>}
 */
module.exports.getUserLikes = async (link, limit) => {
    const user = await this.getUserInfo(link);
    const url = await BASE_USER_LIKES(user.urn, await Util.keygen(), limit);
    return JSON.parse(await Util.parseHTML(url)).collection;
};

/**
 * Search something on soundcloud
 * @param {string} query query to search
 * @param {"track" | "user" | "playlist" | "all"} type Search type
 */
module.exports.search = async (query, type = "track") => {
    if (!query) throw new Error('Missing search query!');
    let path;
    switch (type) {
        case "track":
            path = "/sounds";
            break;
        case "playlist":
            path = "/sets";
            break;
        case "user":
            path = "/people";
            break;
        case "all":
            path = "";
            break;
        default:
            throw new Error(`Search type must be one of "track", "playlist" or "user"`);
    }
    const buildURL = `${BASE_TRACK_SEARCH(path)}${encodeURIComponent(query)}`;
    const source = await Util.parseHTML(buildURL);
    const dom = Util.getDom(source);
    const document = dom.window.document;

    const items = document.getElementsByTagName("ul");
    if (items.length < 2) return [];
    const res = items[1].children;
    const arr = [];

    for (let i = 0; i < res.length; i++) {
        const parsed = Util.parseTrackSearch(res[i].innerHTML);
        arr.push(parsed);
    }

    return arr;
};

/**
 * Returns Array of playlist tracks
 * @param {string} link playlist url
 */
module.exports.getPlaylist = async (link) => {
    if (!Util.validateURL(link) || !link.includes("/sets/")) throw new Error("Invalid url");
    const sourceHTML = await Util.parseHTML(link);
    const dom = Util.getDom(sourceHTML);
    const document = dom.window.document;

    const trackList = document.getElementsByClassName("tracklist")[0];
    if (!trackList) return [];
    const chunks = trackList.innerHTML.split('<article itemprop="track" itemscope="" itemtype="http://schema.org/MusicRecording">\n');
    chunks.shift();
    let arr = [];
    for (let i = 0; i < chunks.length; i++) {
        const parsed = Util.parseRawPlaylist(chunks[i]);
        arr.push(parsed);
    }
    return arr;
};

/**
 * Returns recommended songs
 * @param {string} link Soundcloud video url
 */
module.exports.getRecommendedSongs = async (link) => {
    if (!Util.validateURL(link)) throw new Error("Invalid url.");

    try {
        const sourceHTML = await Util.parseHTML(`${link}/recommended`);
        const dom = Util.getDom(sourceHTML);
        const document = dom.window.document;

        const section = document.getElementsByTagName('section');
        if (!section.length) return [];
        const partials = sourceHTML.split('<h2 itemprop="name">');
        partials.shift();
        const chunks = [];
        partials.forEach(x => {
            const d = x.split('</article>')[0].trim();
            chunks.push(d);
        });
        return Util.parseSimilarResults(chunks);
    } catch (e) {
        return [];
    }
};

/**
 * Fetches soundcloud api key
 * @param {boolean} [force=false] if it should forcefully parse key
 * @returns {Promise<string|null>}
 */
module.exports.fetchSoundcloudKey = async (force=false) => {
    if (!force && Store.has("SOUNDCLOUD_API_KEY")) return Store.get("SOUNDCLOUD_API_KEY");
    return await Util.keygen();
};

/**
 * Fetches soundcloud api version
 * @returns {Promise<number|null>}
 */
module.exports.fetchSoundcloudVersion = async () => {
    return await Util.apiVersion();
};

/**
 * Downloads soundcloud stream
 * @param {string} url Soundcloud track url
 * @param {string} clientID Soundcloud client id [optional]
 * @returns {Promise<Readable>}
 */
module.exports.download = async (url, clientID) => {
    if (!Util.validateURL(url)) throw new Error("Invalid url.");
    const BASE = await this.getSongInfo(url);
    if (!BASE || !BASE.trackURL) throw new Error("Couldn't parse track info.");

    const stream = await Util.downloadStream(BASE.trackURL, clientID);
    return stream;
};