///////////////////////////////////////////
//       Created by Androz2091          //
//  Maintained by Snowflake Studio ❄   //
/////////////////////////////////////////

const Util = require("./src/util/Util");

module.exports = {
    Client: require("./src/Client"),
    Constants: require("./src/constants/Constants"),
    keygen: require("./src/util/keygen"),
    Store: require("./src/store/Store"),
    Util: Util,
    validateURL: Util.validateURL,
    version: require("./package.json").version
};