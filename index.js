const User = require("./src/User");
const Util = require("./src/Util.js");

/**
 * Validate url. Returns true if the link given matches with soundcloud url.
 * @param {string} link Any url to validate
 */
module.exports.validateURL = (link) => Util.validateURL(link);

/**
 * Returns soundcloud song info
 * @param {string} link Song url
 */
module.exports.getSongInfo = async (link) => {
    if (!Util.validateURL(link)) throw new Error("Invalid url");

    const sourceHTML = await Util.parseHTML(link);
    const dom = Util.getDom(sourceHTML);
    const document = dom.window.document;
    const headerH1 = document.querySelector('header').children[0];
    const time = document.querySelector('header').children[1];
    const scripts = document.getElementsByTagName("script");
    const parsed = scripts[scripts.length - 1].textContent;
    const findFollowers = parsed.split('"followers_count":');

    return {
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
        comments: Util.parseComments(document.getElementsByClassName("comments")[0].innerHTML)
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
        profile: sourceHTML.split('"permalink_url":"')[sourceHTML.split('"permalink_url":"').length - 1].split('"')[0]
    });
};