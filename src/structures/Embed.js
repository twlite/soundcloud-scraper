const Util = require("../util/Util");

class Embed {

    /**
     * SoundCloud Rich Embed
     * @param {object} data Raw data to instantiate this class
     * @param {?string} embedURL embed url
     */
    constructor(data, embedURL = null) {
        this.url = typeof embedURL !== "string" ? null : embedURL;
        this._patch(data);
    }

    /**
     * Patch raw data
     * @param {object} data Raw data to patch
     * @private
     * @ignore
     * @returns {void}
     */
    _patch(data) {
        if (!data) return;
        this.version = data.version || 1.0;
        this.type = data.type || "rich";
        this.provider = {
            name: data.provider_name || "SoundCloud",
            url: data.provider_url || "https://soundcloud.com"
        };
        this.height = data.height || null;
        this.width = data.width || null;
        this.title = data.title || null;
        this.description = data.description || null;
        this.author = {
            name: data.author_name || null,
            url: data.author_url || null
        };
        this.thumbnailURL = data.thumbnail_url || null;
        
        // raw data
        Object.defineProperty(this, "_raw", { value: data || null });
    }

    /**
     * Embed visualizer url
     */
    get visualizer() {
        const $ = Util.loadHTML(this.toHTML());
        const url = $("iframe").attr("src");
        return url;
    }

    /**
     * Returns embed html
     * @returns {string}
     */
    toHTML() {
        if (this._raw && this._raw.html) return this._raw.html;
        return "";
    }

    /**
     * Returns JSON version of the data
     */
    toJSON() {
        return this._raw || {};
    }

    /**
     * String representation of this embed
     */
    toString() {
        return this.url || "";
    }

}

module.exports = Embed;