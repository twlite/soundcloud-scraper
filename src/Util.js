const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");
const User = require("./User.js");
const store = require("./Store");

class Util {

    static parseTime(duration) {
        const hours = duration.substr(2, 2);
        const minutes = duration.substr(5, 2);
        const seconds = duration.substr(8, 2);
        return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
    }

    static validateURL(link) {
        if (typeof link !== "string") return false;
        return /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/.test(link);
    }

    static async parseHTML(link) {
        const res = await fetch(link);
        const HTML = await res.text();
        return HTML;
    }

    static getDom(html) {
        return new JSDOM(html);
    }

    static parseComments(html) {
        let section = html.trim().split("</time>");
        let arr = [];
        section.forEach(item => {
            if (!item.includes("Comment by <a")) return;
            let prop = item.split("Comment by <a")[1];
            let url = prop.split('href="')[1].split('">')[0].trim();
            let username = prop.split(`${url}">`)[1].split("</a>")[0].trim();
            let content = item.split("<p>")[1].split("</p>")[0].trim();
            let timestamp = item.split('pubdate="">')[1];

            let obj = {
                content,
                createdAt: new Date(timestamp),
            };
            if (store.get(username)) obj.author = store.get(username);
            else obj.author = new User({
                name: username,
                followers: 0,
                createdAt: null,
                avatarURL: null,
                profile: url
            }, false);
            arr.push(obj);
        });

        return arr;
    }

}

module.exports = Util;