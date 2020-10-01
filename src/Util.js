const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");
const User = require("./User.js");
const store = require("./Store");
const URLREG = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
const KEYREG = /(https:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
const https = require("https");

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
            if (store.has(username)) obj.author = store.get(username);
            else obj.author = new User({
                name: username,
                followers: 0,
                createdAt: null,
                avatarURL: null,
                profile: `https://soundcloud.com${url}`
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

        if (store.has(username)) obj.author = store.get(username);
        else obj.author = new User({
            name: username,
            followers: 0,
            createdAt: null,
            avatarURL: null,
            profile: url
        }, false);

        return obj;
    }

    static parseSimilarResults(htmlChunks) {
        const arr = [];
        for (let i = 0; i < htmlChunks.length; i++) {
            const uri = htmlChunks[i].split('href="')[1].split('">')[0];
            const name = htmlChunks[i].split(`${uri}">`)[1].split('</a>')[0];
            const authorURL = htmlChunks[i].split('by <a href="')[1].split('">')[0];
            const author = htmlChunks[i].split(`${authorURL}">`)[1].split('</a>')[0];
            const published = htmlChunks[i].split('pubdate>')[1].split('</time>')[0];

            let obj = {
                title: name,
                url: `https://soundcloud.com${uri}`,
                publishedAt: new Date(published),
                author: store.get(author) || new User({
                    name: author,
                    followers: 0,
                    createdAt: null,
                    avatarURL: null,
                    profile: `https://soundcloud.com${authorURL}`
                }, false)
            };

            arr.push(obj);
        }

        return arr;
    }

    static keygen() {
        return new Promise(async resolve => {
            try {
                const html = await Util.parseHTML("https://soundcloud.com");
                const res = html.split('<script crossorigin src="');
                const urls = [];
                let index = 0;
                let key;

                res.forEach(u => {
                    let url = u.replace('"></script>', "");
                    let chunk = url.split("\n")[0];
                    if (URLREG.test(chunk)) urls.push(chunk);
                });

                while (index !== urls.length && !key) {
                    let url = urls[index];
                    index++;
                    if (KEYREG.test(url)) {
                        const data = await Util.parseHTML(url);
                        if (data.includes(',client_id:"')) {
                            const a = data.split(',client_id:"');
                            key = a[1].split('"')[0];
                            if (index === urls.length) {
                                store.set("SOUNDCLOUD_API_KEY", key);
                                return resolve(store.get("SOUNDCLOUD_API_KEY"));
                            };
                        }
                    }
                };

            } catch(e) {
                resolve(null);
            }
        });
    }

    static apiVersion() {
        return new Promise(async resolve => {
            try {
                const html = await Util.parseHTML("https://soundcloud.com");
                const matches = /__sc_version\s*=\s*"(?<apiVersion>[^"]+)/.exec(html);
                return resolve(matches.groups.apiVersion);
            } catch(e) {
                resolve(null);
            }
        });
    }

    static fetchSongStreamURL(songURL, clientID) {
        return new Promise(async (resolve, reject) => {
            if (!songURL) return reject("ERROR_NO_URL");
            if (!clientID && store.has("SOUNDCLOUD_API_KEY")) clientID = store.get("SOUNDCLOUD_API_KEY");
            const CLIENT_ID = clientID ? clientID : await Util.keygen();
            if (!CLIENT_ID) return reject("ERROR_NO_CLIENT_ID");

            try {
                let res = await fetch(`${songURL}?client_id=${CLIENT_ID}`, {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
                        "Accept": "*/*",
                        "Accept-Encoding": "gzip, deflate, br"
                    },
                });
                res = await res.json();
                if (!res.url) return reject("ERROR_NO_STREAM_URL");

                resolve(res.url);

            } catch(e) {
                reject(new Error("ERROR_URL_PARSE_FAILED"));
            }
        });
    }

    static downloadStream(url, clientID) {
        return new Promise(async (resolve, reject) => {
            try {
                const stream = await Util.fetchSongStreamURL(url, clientID);

                https.get(stream, data => resolve(data));

            } catch(e) {
                reject(new Error("ERROR_DOWNLOAD_FAILED"));
            }
        });
    }

}

module.exports = Util;