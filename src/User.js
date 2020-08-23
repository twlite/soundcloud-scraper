const store = require("./Store.js");

class User {

    constructor(data, cache=true) {
        this._patch(data, cache);
    }

    _patch(data, cache) {        
        /**
         * Username
         */
        this.name = data.name || null;
        /**
         * Username
         */
        this.username = data.username || this.name;
        /**
         * Followers count
         */
        this.followers = data.followers || 0;
        /**
         * Account created at
         */
        this.createdAt = data.createdAt || null;
        /**
         * Avatar
         */
        this.avatarURL = data.avatarURL || null;
        /**
         * Profile url
         */
        this.profile = data.profile || null;
        /**
         * Profile id
         */
        this.urn = data.urn || null;

        if (cache) store.set(this.name, this);
    }

    /**
     * User id
     */
    get id() {
        if (!this.profile) return null;
        return this.profile.split("soundcloud.com/")[1];
    }

    /**
     * Avatar id
     */
    get avatar() {
        if (!this.avatarURL) return null;
        return this.avatarURL.split(".com/")[1]
        .replace(/.jpg/, "").replace(/.png/, "");
    }

    /**
     * Created timestamp
     */
    get createdTimestamp() {
        if (!this.createdAt) return null;
        return this.createdAt.getTime();
    }

    /**
     * Account age in ms
     */
    get age() {
        if (!this.createdTimestamp) return 0;
        return Date.now() - this.createdTimestamp;
    }

    /**
     * String representation of the user
     */
    toString() {
        return this.name || "";
    }

}

module.exports = User;