const User = require("./src/User");
const Util = require("./src/Util.js");
const BASE_TRACK_SEARCH = (mode) => `https://soundcloud.com/search${mode}?q=`;
const { Readable } = require("stream");

/**
 * Validate url. Returns true if the link given matches with soundcloud url.
 * @param {string} link Any url to validate
 */
module.exports.validateURL = (link) => Util.validateURL(link);

/**
 * Returns soundcloud song info
 * @param {string} link Song url
 * @param {object} options Fetch options
 * @param {boolean} [options.recommended] Set it to true if you want recommended songs
 * @param {boolean} [options.comments] Set it to true if you want comments
 */
module.exports.getSongInfo = async (link, ops = { recommended: false, comments: false }) => {
    if (!Util.validateURL(link)) throw new Error("Invalid url");

    const sourceHTML = await Util.parseHTML(link);
    const dom = Util.getDom(sourceHTML);
    const document = dom.window.document;
    const headerH1 = document.querySelector('header').children[0];
    const time = document.querySelector('header').children[1];
    const scripts = document.getElementsByTagName("script");
    const parsed = scripts[scripts.length - 1].textContent;
    const findFollowers = parsed.split('"followers_count":');

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
        description: document.querySelector('meta[property="og:description"]').attributes.item(1).value,
        duration: Util.parseTime(document.querySelector('meta[itemprop="duration"]').attributes.item(1).value),
        genre: document.querySelector('meta[itemprop="genre"]').attributes.item(1).value,
        playCount: parseInt(document.querySelectorAll('meta[property="soundcloud:play_count"]')[0].attributes.item(1).value),
        commentsCount: parseInt(document.querySelectorAll('meta[property="soundcloud:comments_count"]')[0].attributes.item(1).value),
        likesCount: parseInt(document.querySelectorAll('meta[property="soundcloud:like_count"]')[0].attributes.item(1).value),
        thumbnail: document.querySelectorAll('meta[property="og:image"]')[0].attributes.item(1).value,
        publishedAt: new Date(time.textContent),
        embed: document.querySelector('meta[itemprop="embedUrl"]').attributes.item(1).value,
        comments: ops.comments ? Util.parseComments(document.getElementsByClassName("comments")[0].innerHTML) : [],
        recommendedSongs: ops.recommended ? await this.getRecommendedSongs(link) : [],
        trackURL: sourceHTML.split('},{"url":"')[1].split('","')[0]
    };

    return obj;
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
        profile: sourceHTML.split('"permalink_url":"')[sourceHTML.split('"permalink_url":"').length - 1].split('"')[0]
    });
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
 * @returns {Promise<string|null>}
 */
module.exports.fetchSoundcloudKey = async () => {
    return await Util.keygen();
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