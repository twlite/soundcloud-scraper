const fetch = require('node-fetch');
const JSDOM = require('jsdom').JSDOM;

const parseTime = (duration) => {
    const hours = duration.substr(2, 2);
    const minutes = duration.substr(5, 2);
    const seconds = duration.substr(8, 2);
    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
};

module.exports.validateURL = (link) => /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/.test(link);

module.exports.getSongInfo = async (link) => {
    const res = await fetch(link);
    const sourceHTML = await res.text();
    const dom = new JSDOM(sourceHTML);
    const document = dom.window.document;
    const headerH1 = document.querySelector('header').children[0];
    return {
        title: headerH1.children[0].textContent,
        author: headerH1.children[1].textContent,
        duration: parseTime(document.querySelector('meta[itemprop="duration"]').attributes.item(1).value),
        genre: document.querySelector('meta[itemprop="genre"]').attributes.item(1).value,
        playCount: parseInt(document.querySelectorAll('meta[property="soundcloud:play_count"]')[0].attributes.item(1).value),
        commentsCount: parseInt(document.querySelectorAll('meta[property="soundcloud:comments_count"]')[0].attributes.item(1).value),
        likeCount: parseInt(document.querySelectorAll('meta[property="soundcloud:like_count"]')[0].attributes.item(1).value),
        thumbnail: document.querySelectorAll('meta[property="og:image"]')[0].attributes.item(1).value
    }
};
