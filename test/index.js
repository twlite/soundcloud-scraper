const soundcloud = require("../index.js");
const ytdl = require("discord-ytdl-core");
const URL = "https://soundcloud.com/dogesounds/alan-walker-feat-k-391-ignite";
const fs = require("fs");

// fetch stream url
// soundcloud.getStreamURL(URL)
//     .then(url => {

//         // use discord-ytdl-core to download
//         const stream = ytdl.arbitraryStream(url, {
//             opusEncoded: false,
//             fmt: "mp3",
//             encoderArgs: ["-af", "asetrate=44100*1.3"]
//         });

//         // write file
//         stream.pipe(fs.createWriteStream("Ignite Nightcore.mp3"))
//             .on("finish", () => {
//                 console.log("Done!");
//             });
//     });

soundcloud.getSongInfo(URL)
    .then(console.log)