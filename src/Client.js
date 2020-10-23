const keygen = require("./util/keygen");
const Util = require("./util/Util");

class SoundCloud {

    /**
     * SoundCloud Scraper
     * @param {?string} API_KEY Existing API key (if any). Else SoundCloud scraper will try to fetch one for you :)
     */
    constructor(API_KEY = null) {

        /**
         * Default api key
         */
        this.API_KEY = null;

        /**
         * Update api key
         */
        this.createAPIKey(API_KEY);
    }

    /**
     * Creates API key
     * @param {?string} KEY Existing API key (if any). Else SoundCloud scraper will try to fetch one for you :)
     */
    async createAPIKey(KEY = null) {
        if (!KEY) {
            const key = await keygen();
            if (key && typeof key === "string") this.API_KEY = key;
            else this.API_KEY = null;
        } else {
            this.API_KEY = KEY;
        }
    }
}

module.exports = SoundCloud;