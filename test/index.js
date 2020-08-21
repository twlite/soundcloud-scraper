const soundcloud = require("../index.js");
const fs = require("fs");
const URL = "https://soundcloud.com/nocopyrightmusiic/alan-walker-sing-me-to-sleep-out-now";

soundcloud.download(URL)
.then(stream => {
    console.log(stream);
    const write = stream.pipe(fs.createWriteStream("./SingMeToSleep.mp3"));
    write.on("finish", () => console.log("Done!"));
})
.catch(console.error);