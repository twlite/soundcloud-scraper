const SoundCloud = require("soundcloud-scraper");
const client = new SoundCloud.Client();
const fs = require("fs");

client.getSongInfo("https://soundcloud.com/nocopyrightsounds/unknown-brain-im-sorry-mom-ft-kyle-reynolds-ncs-release")
    .then(async song => {
        const stream = await song.downloadProgressive();
        const writer = stream.pipe(fs.createWriteStream(`./${song.title}.mp3`));
        writer.on("finish", () => console.log("Finished writing song!"));
    })
    .catch(console.error);