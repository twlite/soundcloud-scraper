# SoundCloud Scraper
Scrape data from soundcloud easily.

[![NPM](https://nodei.co/npm/soundcloud-scraper.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/soundcloud-scraper/)

# Installation

```sh
$ npm i DevSnowflake/soundcloud-scraper#rewrite
```

# Example
## Downloading a Song

> Note: This process can take few seconds if you do not provide api key
> because it will first find the api key and then fetch respective track url to get final stream url
> and then download it. To solve this issue, first get your soundcloud key using `SoundCloud.keygen()` and then save it somewhere.
> Later you can pass that key in `SoundCloud.Client` constructor: `new SoundCloud.Client("API_KEY")`.

```js
const SoundCloud = require("soundcloud-scraper");
const client = new SoundCloud.Client();
const fs = require("fs");

client.getSongInfo("https://soundcloud.com/dogesounds/alan-walker-feat-k-391-ignite")
    .then(async song => {
        const stream = await song.downloadProgressive();
        const writer = stream.pipe(fs.createWriteStream(`./${song.title}.mp3`));
        writer.on("finish", () => {
          console.log("Finished writing song!")
          process.exit(1);
        });
    })
    .catch(console.error);
```

# Join Our Discord Server
[![](https://i.imgur.com/f6hNUfc.png)](https://discord.gg/2SUybzb)
