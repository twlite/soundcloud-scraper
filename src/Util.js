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

    static parseTrackSearch(html) {
        const cleaned = html.replace(/<h2>/g, "").replace(/<\/h2>/g, "");
        const uri = cleaned.split('href="')[1].split('">')[0];
        const name = cleaned.split('">')[1].split('</a>')[0].trim();
        const obj = {
            url: `https://soundcloud.com${uri}`,
            title: name
        };

        const chunk = uri.split("/").filter(x => x.length > 0);

        switch(chunk.length) {
            case 1:
                obj.type = "user";
                break;
            case 2:
                obj.type = "track";
                break;
            case 3:
                obj.type = "playlist";
                break;
            default:
                obj.type = "all";
        }

        return obj;
    }

    static parseRawPlaylist(html) {
        const NameAndURL = html.split('href="')[1].split('">');
        const URI = NameAndURL[0];
        const name = NameAndURL[1].split('</a>')[0];
        const AuthorAndProfile = html.split("by <a")[1].split("</a>")[0];
        const genre = html.split('itemprop="genre" content="')[1];
        const username = AuthorAndProfile.split('">')[1];
        const url = `https://soundcloud.com/${AuthorAndProfile.split('href="')[1].split('">')[0]}`;

        let obj = {
            title: name,
            url: `https://soundcloud.com/${URI}`,
            publishedAt: new Date(html.split('pubdate="">')[1].split('</time>')[0]),
            duration: Util.parseTime(html.split('itemprop="duration" content="')[1].split('">')[0]),
            genre: genre ? genre.split('">')[0].split(' &amp; ') : []
        }

        if (store.get(username)) obj.author = store.get(username);
        else obj.author = new User({
            name: username,
            followers: 0,
            createdAt: null,
            avatarURL: null,
            profile: url
        }, false);

        return obj;
    }

}

module.exports = Util;