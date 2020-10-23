const store = require("../store/Store");
const Constants = require("../constants/Constants");
const Util = require("./Util");

/**
 * Fetches soundcloud api key
 * @param {boolean} [force=false] Forcefully parse soundcloud key
 * @returns {Promise<?string>}
 */
module.exports = (force = false) => {
    return new Promise(async resolve => {
        if (store.has("SOUNDCLOUD_API_KEY") && !force) return resolve(store.get("SOUNDCLOUD_API_KEY"));
        try {
            const html = await Util.parseHTML(Constants.SOUNDCLOUD_BASE_URL);
            const res = html.split('<script crossorigin src="');
            const urls = [];
            let index = 0;
            let key;

            res.forEach(u => {
                let url = u.replace('"></script>', "");
                let chunk = url.split("\n")[0];
                if (Constants.SOUNDCLOUD_KEYGEN_URL_REGEX.test(chunk)) {
                    urls.push(chunk);
                };
            });

            while (index !== urls.length && !key) {
                let url = urls[index];
                index++;
                if (Constants.SOUNDCLOUD_API_KEY_REGEX.test(url)) {
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
};