///////////////////////////////////////////
//       Created by Androz2091          //
//  Maintained by Snowflake Studio ❄   //
/////////////////////////////////////////

const Util = require("./src/util/Util");
const Client = require("./src/Client");
const Constants = require("./src/constants/Constants");
const keygen = Util.keygen;
const Store = require("./src/store/Store");
const StreamDownloader = require("./src/util/Downloader");
const validateURL = Util.validateURL;
const version = require("./package.json").version;

/**
 * @typedef {object} SoundCloud
 * @property {Client} Client SoundCloud Client
 * @property {Constants} Constants SoundCloud Utility constants
 * @property {Util.keygen} keygen SoundCloud key generator
 * @property {Store} Store SoundCloud Scraper cache
 * @property {Util} Util SoundCloud Scraper Utility
 * @property {StreamDownloader} StreamDownloader stream downloader
 * @property {Util.validateURL} validateURL Validate soundcloud url
 * @property {string} version Package version
 */

module.exports = {
    Client,
    Constants,
    keygen,
    Store,
    StreamDownloader,
    Util,
    validateURL,
    version
};