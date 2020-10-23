const SoundCloud = require("../index");

SoundCloud.keygen()
    .then(key => {
        console.log(key.substr(0, 10));
        console.log(SoundCloud.Store.has("SOUNDCLOUD_API_KEY"))
    });