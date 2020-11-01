# SoundCloud Scraper
Scrape data from soundcloud easily.

[![NPM](https://nodei.co/npm/soundcloud-scraper.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/soundcloud-scraper/)

# Installation

```sh
$ npm i soundcloud-scraper
```

# Documentation
**[https://soundcloud-scraper.js.org](https://soundcloud-scraper.js.org)**

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

# Responses
## Song Info

<details>
<summary>👉 Preview Response</summary>

```js
Song {
  id: '316547873',
  title: 'Alan Walker feat. K-391 - Ignite [FREE DOWNLOAD]',
  description: 'FREE DOWNLOAD: http://discoverysounds.com/gate/alan-walker-feat-k-391-ignite\n' +
    '\n' +
    'Alan Walker Feat K 391 Ignite Download\n' +
    'Alan Walker Feat K 391 Ignite Mp3 Download\n' +
    'Alan Walker Feat K 391 Ignite New Song 2',
  thumbnail: 'https://i1.sndcdn.com/artworks-000216694368-wsysn4-t500x500.jpg',
  url: 'https://soundcloud.com/dogesounds/alan-walker-feat-k-391-ignite',
  duration: 210000,
  playCount: '771664',
  commentsCount: '371',
  likes: '13514',
  genre: 'Dance & EDM',
  author: {
    name: 'Doge Sounds',
    username: 'dogesounds',
    url: 'https://soundcloud.com/dogesounds',
    avatarURL: 'https://i1.sndcdn.com/avatars-000304905983-a0568r-large.jpg',
    urn: 298449071,
    verified: false,
    followers: 149,
    following: 32
  },
  publishedAt: 2017-04-07T11:02:54.000Z,
  embedURL: 'https://soundcloud.com/oembed?url=https%3A%2F%2Fsoundcloud.com%2Fdogesounds%2Falan-walker-feat-k-391-ignite&format=json',
  embed: null,
  streams: {
    hls: 'https://api-v2.soundcloud.com/media/soundcloud:tracks:316547873/7ccfb0e4-2d57-4f9b-b5df-9d340a3a2dd6/stream/hls',
    progressive: 'https://api-v2.soundcloud.com/media/soundcloud:tracks:316547873/7ccfb0e4-2d57-4f9b-b5df-9d340a3a2dd6/stream/progressive'
  },
  trackURL: 'https://api-v2.soundcloud.com/media/soundcloud:tracks:316547873/7ccfb0e4-2d57-4f9b-b5df-9d340a3a2dd6/stream/progressive',
  comments: [],
  streamURL: null
}
```
</details>

## Song Embed

<details>
<summary>👉 Preview Response</summary>

```js
Embed {
  url: 'https://soundcloud.com/oembed?url=https%3A%2F%2Fsoundcloud.com%2Fdogesounds%2Falan-walker-feat-k-391-ignite&format=json',
  version: 1,
  type: 'rich',
  provider: { name: 'SoundCloud', url: 'https://soundcloud.com' },
  height: 400,
  width: '100%',
  title: 'Alan Walker feat. K-391 - Ignite [FREE DOWNLOAD] by Doge Sounds',
  description: 'FREE DOWNLOAD: http://discoverysounds.com/gate/alan-walker-feat-k-391-ignite\n' +
    '\n' +
    'Alan Walker Feat K 391 Ignite Download\n' +
    'Alan Walker Feat K 391 Ignite Mp3 Download\n' +
    'Alan Walker Feat K 391 Ignite New Song 2017\n' +
    'Alan Walker Feat K 391 Ignite 2017',
  author: { name: 'Doge Sounds', url: 'https://soundcloud.com/dogesounds' },
  thumbnailURL: 'https://i1.sndcdn.com/artworks-000216694368-wsysn4-t500x500.jpg'
}
```
</details>

## Song Comments

<details>
<summary>👉 Preview Response</summary>

```js
[
  {
    text: '����',
    createdAt: 2020-10-30T11:58:13.000Z,
    author: {
      name: 'askaria22',
      username: 'mohamed-askaria-541170196',
      url: 'https://soundcloud.com/mohamed-askaria-541170196'
    }
  },
  {
    text: 'Cool',
    createdAt: 2020-10-28T15:03:21.000Z,
    author: {
      name: 'Matias Ronkainen',
      username: 'matias-ronkainen',
      url: 'https://soundcloud.com/matias-ronkainen'
    }
  },
  {
    text: 'wow nice song i love the beat',
    createdAt: 2020-10-27T05:35:39.000Z,
    author: {
      name: 'saathvika vempati',
      username: 'saathvika-vempati',
      url: 'https://soundcloud.com/saathvika-vempati'
    }
  },
  {
    text: 'tempik',
    createdAt: 2020-10-23T04:49:11.000Z,
    author: {
      name: 'didik8336@gmail.com',
      username: 'didik-saputra-908291434',
      url: 'https://soundcloud.com/didik-saputra-908291434'
    }
  },
  {
    text: '@jazmine-powers-328939011: ew chain mail',
    createdAt: 2020-10-21T18:40:33.000Z,
    author: {
      name: 'FallenQbjYT',
      username: 'fallen-qbj',
      url: 'https://soundcloud.com/fallen-qbj'
    }
  },
  ...
]
```
</details>

## User Info

<details>
<summary>👉 Preview Response</summary>

```js
{
  urn: 298449071,
  username: 'dogesounds',
  name: 'Doge Sounds',
  verified: false,
  createdAt: 2017-03-29T21:35:45.000Z,
  avatarURL: 'https://i1.sndcdn.com/avatars-000304905983-a0568r-large.jpg',
  profile: 'https://soundcloud.com/dogesounds',
  bannerURL: 'https://i1.sndcdn.com/visuals-000298449071-KhchhU-original.jpg',
  followers: 149,
  following: 32,
  likesCount: 6,
  tracksCount: 2,
  tracks: [
    {
      title: 'Alan Walker feat. K-391 - Ignite [FREE DOWNLOAD]',
      url: 'https://soundcloud.com/dogesounds/alan-walker-feat-k-391-ignite',
      publishedAt: 2017-04-07T11:02:54.000Z,
      genre: 'Dance & EDM',
      author: 'dogesounds',
      duration: 210000
    },
    {
      title: 'W&W & Daddy Yankee - Gasolina (Hardwell Mashup) [FREE DOWNLOAD]',
      url: 'https://soundcloud.com/dogesounds/ww-daddy-yankee-gasolina-hardwell-mashup',
      publishedAt: 2017-03-29T21:38:38.000Z,
      genre: 'Dance & EDM',
      author: 'dogesounds',
      duration: 267000
    }
  ],
  likes: [
    {
      title: 'Alan Walker feat. K-391 - Ignite [FREE DOWNLOAD]',
      url: 'https://soundcloud.com/dogesounds/alan-walker-feat-k-391-ignite',
      publishedAt: 2017-04-07T11:02:54.000Z,
      genre: 'Dance & EDM',
      author: {
        name: 'Doge Sounds',
        username: 'dogesounds',
        profile: 'https://soundcloud.com/dogesounds'
      }
    },
    {
      title: 'W&W & Daddy Yankee - Gasolina (Hardwell Mashup) [FREE DOWNLOAD]',
      url: 'https://soundcloud.com/dogesounds/ww-daddy-yankee-gasolina-hardwell-mashup',
      publishedAt: 2017-03-29T21:38:38.000Z,
      genre: 'Dance & EDM',
      author: {
        name: 'Doge Sounds',
        username: 'dogesounds',
        profile: 'https://soundcloud.com/dogesounds'
      }
    }
  ]
}
```

</details>

## Playlist

<details>
<summary>👉 Preview Response</summary>

```js
{ // playlist data
	"id": 60750703,
	"title": "work out or get out.",
	"url": "https://soundcloud.com/maddieparrot/sets/work-out-or-get-out",
	"description": "shuffle this playlist and crush your work out!!",
	"thumbnail": "https://i1.sndcdn.com/artworks-000311026281-fl4m2d-t500x500.jpg",
	"author": {
		"profile": "https://soundcloud.com/maddieparrot",
		"username": "maddieparrot",
		"name": "maddieparrot",
		"urn": 100962348
	},
	"embedURL": "https://soundcloud.com/oembed?url=https%3A%2F%2Fsoundcloud.com%2Fmaddieparrot%2Fsets%2Fwork-out-or-get-out&format=json",
	"embed": null,
	"genre": "Motivational",
	"trackCount": 74,
	"tracks": [
		{ // available track
			"artwork_url": "https://i1.sndcdn.com/artworks-000242209273-w4a69z-large.jpg",
			"caption": null,
			"commentable": true,
			"comment_count": 1373,
			"created_at": "2017-08-07T17:22:30Z",
			"description": "PRODUCED & MIXED BY : @JIMMYDUVAL\n#THEKIDBEFORETRUNKS #MEMBERSONLY5EVERRR IM UP NEXT JU HURD",
			"downloadable": false,
			"download_count": 0,
			"duration": 117535,
			"full_duration": 117535,
			"embeddable_by": "all",
			"genre": "Hip-hop & Rap",
			"has_downloads_left": true,
			"id": 336860131,
			"kind": "track",
			"label_name": null,
			"last_modified": "2020-10-30T18:08:29Z",
			"license": "all-rights-reserved",
			"likes_count": 141173,
			"permalink": "kid-trunks-talk",
			"permalink_url": "https://soundcloud.com/kid-trunksxxx/kid-trunks-talk",
			"playback_count": 8125569,
			"public": true,
			"publisher_metadata": {
				"id": 336860131,
				"urn": "soundcloud:tracks:336860131",
				"artist": "Kid Trunks",
				"contains_music": true,
				"publisher": "Kid Trunks",
				"isrc": "USUYG1165231",
				"writer_composer": "Kid Trunks"
			},
			"purchase_title": null,
			"purchase_url": null,
			"release_date": null,
			"reposts_count": 10528,
			"secret_token": null,
			"sharing": "public",
			"state": "finished",
			"streamable": true,
			"tag_list": "kidtrunks fuckthehaterz",
			"title": "KiD TRUNKS - \"TALK\" (Prod. Jimmy Duval)",
			"uri": "https://api.soundcloud.com/tracks/336860131",
			"urn": "soundcloud:tracks:336860131",
			"user_id": 40663540,
			"visuals": null,
			"waveform_url": "https://wave.sndcdn.com/XzNE7YLW4hBb_m.json",
			"display_date": "2017-08-07T17:22:30Z",
			"media": {
				"transcodings": [
					{
						"url": "https://api-v2.soundcloud.com/media/soundcloud:tracks:336860131/9b6b5e79-716e-46e7-a999-3dd9fbb8ef0a/stream/hls",
						"preset": "mp3_0_0",
						"duration": 117535,
						"snipped": false,
						"format": {
							"protocol": "hls",
							"mime_type": "audio/mpeg"
						},
						"quality": "sq"
					},
					{
						"url": "https://api-v2.soundcloud.com/media/soundcloud:tracks:336860131/9b6b5e79-716e-46e7-a999-3dd9fbb8ef0a/stream/progressive",
						"preset": "mp3_0_0",
						"duration": 117535,
						"snipped": false,
						"format": {
							"protocol": "progressive",
							"mime_type": "audio/mpeg"
						},
						"quality": "sq"
					},
					{
						"url": "https://api-v2.soundcloud.com/media/soundcloud:tracks:336860131/c826566b-c8ed-49f1-8e5e-ab7cc441b11f/stream/hls",
						"preset": "opus_0_0",
						"duration": 117535,
						"snipped": false,
						"format": {
							"protocol": "hls",
							"mime_type": "audio/ogg; codecs=\"opus\""
						},
						"quality": "sq"
					}
				]
			},
			"monetization_model": "NOT_APPLICABLE",
			"policy": "ALLOW",
			"user": {
				"avatar_url": "https://i1.sndcdn.com/avatars-000559586655-0482n7-large.jpg",
				"first_name": "",
				"full_name": "",
				"id": 40663540,
				"kind": "user",
				"last_modified": "2020-06-26T04:11:43Z",
				"last_name": "",
				"permalink": "kid-trunksxxx",
				"permalink_url": "https://soundcloud.com/kid-trunksxxx",
				"uri": "https://api.soundcloud.com/users/40663540",
				"urn": "soundcloud:users:40663540",
				"username": "KiD TRUNKS",
				"verified": false,
				"city": "Broward County",
				"country_code": "US",
				"badges": {
					"pro_unlimited": true,
					"verified": false
				}
			}
    },
    ...
		{ // private or unknown track
			"id": 136870321,
			"kind": "track",
			"monetization_model": "NOT_APPLICABLE",
			"policy": "ALLOW"
		}
	]
}
```

</details>

# Join Our Discord Server
[![](https://i.imgur.com/f6hNUfc.png)](https://discord.gg/2SUybzb)
