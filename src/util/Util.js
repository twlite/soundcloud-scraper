const fetch = require("node-fetch");
const Constants = require("../constants/Constants");
const cheerio = require("cheerio");

class Util {

    /**
     * SoundCloud Scraper Utility
     */
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
    }

    /**
     * Validates soundcloud url
     * @param {string} url URL to validate
     */
    static validateURL(url = null) {
        if (typeof url !== "string") return false;
        return Constants.SOUNDCLOUD_URL_REGEX.test(url);
    }

    /**
     * Request a url
     * @param {RequestInfo} url URL to request
     * @param {RequestInit} options Request options
     * @returns {Promise<Response>}
     */
    static request(url = null, options = {}) {
        return fetch(url, options);
    }

    /**
     * Parse HTML from a url
     * @param {RequestInfo} url URL to parse HTML from
     * @param {RequestInit} options Request options
     * @returns {Promise<string>}
     */
    static parseHTML(url = null, options = {}) {
        return new Promise((resolve) => {
            Util.request(url, options)
                .then(res => res.text())
                .then(body => resolve(body))
                .catch(() => resolve(""));
        });
    }

    /**
     * Loads html
     * @param {?string} html HTML to load
     */
    static loadHTML(html = null) {
        if (!html) throw new Error("No data to load");
        const $ = cheerio.load(html);

        return $;
    }

}

module.exports = Util;