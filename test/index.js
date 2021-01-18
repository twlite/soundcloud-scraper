// SoundCloud
const SoundCloud = require("../index");

// Client(API_KEY, Options)
const client = new SoundCloud.Client(null, { fetchAPIKey: false });

// file system
const fs = require("fs");

/* Fetch api key */
// SoundCloud.keygen()
//     .then(key => {
//         console.log(key);
//         console.log(SoundCloud.Store.has("SOUNDCLOUD_API_KEY"))
//     });

/* Fetch api version */
// client.apiVersion().then(console.log)

// client.getSongInfo("https://soundcloud.com/koni_music/dj-snake-x-justin-bieber-let-me-love-you-koni-remix-ft-emma-heesters", { fetchStreamURL: true })
    // .then(async song => {
        // console.log(song);

        /* HLS Downloader */
        // const stream = await song.downloadHLS();
        // const writer = stream.pipe(fs.createWriteStream(`./${song.title}.flv`));
        // writer.on("finish", () => console.log("Finished writing song!"));

        /* Progressive Downloader */
        // const stream = await song.downloadProgressive();
        // const writer = stream.pipe(fs.createWriteStream(`./${song.title}.mp3`));
        // writer.on("finish", () => console.log("Finished writing song!"));
    // })
    // .catch(console.error);

// client.search("alan walker")
//     .then(x => console.log(x));

// client.getUser("dogesounds").then(x => console.log(x));

client.getPlaylist("https://soundcloud.com/ambreen-kanwal-397095258/sets/albert-vishi")
.then(async playlist => {
    console.log(playlist)
    // const song = playlist.tracks[0];
    // const stream = await song.downloadProgressive();
    // const writer = stream.pipe(fs.createWriteStream(`./${song.title}.mp3`));
    // writer.on("finish", () => console.log("Finished writing song!"));
})
    // .then(x => fs.writeFileSync("./data.json", JSON.stringify(x, null, "\t")))