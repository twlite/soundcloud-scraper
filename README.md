# SoundCloud Scraper

☁️ Get basic informations about a song from a Soundcloud URL.

## Installation

```sh
npm install soundcloud-scraper --save
```

## TO-DO

* Support for SoundCloud playlists.
* Support for SoundCloud albums.
* Support for SoundCloud search.
* Add library tests (with `jest` or `mocha`).

## Example

```js
const scraper = require('soundcloud-scraper');

console.log(scraper.validateURL('https://soundcloud.com/nocopyrightsounds/alan-walker-fade-ncs-release'));
// true
console.log(scraper.validateURL('https://google.com'));
// false

scraper.getSongInfo('https://soundcloud.com/nocopyrightsounds/alan-walker-fade-ncs-release').then(console.log);
/*
{
  title: 'Alan Walker - Fade [NCS Release]',
  author: User {
    name: 'NCS',
    username: 'NCS',
    followers: 1299289,
    createdAt: 2012-04-29T12:00:22.000Z,
    avatarURL: 'https://i1.sndcdn.com/avatars-000703438633-4jlywq-large.jpg',
    profile: 'https://soundcloud.com/nocopyrightsounds'
  },
  description: 'Support on iTunes: http://smarturl.it/ncsuplifting\n' +
    'Listen on Spotify: http://smarturl.it/ncsupliftingspotify\n' +
    'Listen on YouTube: https://www.youtube.com/watch?v=bM7SZ5SBzyY\n',
  duration: 264000,
  genre: 'Electro House',
  playCount: 42976273,
  commentsCount: 16941,
  likesCount: 616593,
  thumbnail: 'https://i1.sndcdn.com/avatars-000703438633-4jlywq-t500x500.jpg',
  publishedAt: 2014-11-19T16:40:24.000Z,
  embed: 'https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F177671751&auto_play=false&show_artwork=true&visual=true&origin=schema.org',
  comments: [
    {
      content: '✌✌✌✌✌',
      createdAt: 2020-08-14T17:56:45.000Z,
      author: [User]
    },
    ...
    {
      content: 'eeeee',
      createdAt: 2020-08-09T20:47:12.000Z,
      author: [User]
    }
  ]
}
*/
```


# Response Samples
## Song Info

```js
{
  title: 'Alan Walker - Fade [NCS Release]',
  author: User {
    name: 'NCS',
    username: 'NCS',
    followers: 1299335,
    createdAt: 2012-04-29T12:00:22.000Z,
    avatarURL: 'https://i1.sndcdn.com/avatars-000703438633-4jlywq-large.jpg',
    profile: 'https://soundcloud.com/nocopyrightsounds'
  },
  description: 'Support on iTunes: http://smarturl.it/ncsuplifting\n' +
    'Listen on Spotify: http://smarturl.it/ncsupliftingspotify\n' +
    'Listen on YouTube: https://www.youtube.com/watch?v=bM7SZ5SBzyY\n',
  duration: 264000,
  genre: 'Electro House',
  playCount: 42977691,
  commentsCount: 16943,
  likesCount: 616606,
  thumbnail: 'https://i1.sndcdn.com/avatars-000703438633-4jlywq-t500x500.jpg',
  publishedAt: 2014-11-19T16:40:24.000Z,
  embed: 'https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F177671751&auto_play=false&show_artwork=true&visual=true&origin=schema.org',
  comments: [
    {
      content: '@user-812800306',
      createdAt: 2020-08-15T08:01:37.000Z,
      author: [User]
    },
    {
      content: '@enzo-castro-263198533',
      createdAt: 2020-08-15T07:55:08.000Z,
      author: [User]
    },
    {
      content: '✌✌✌✌✌',
      createdAt: 2020-08-14T17:56:45.000Z,
      author: [User]
    },
    {
      content: 'nice',
      createdAt: 2020-08-14T05:00:14.000Z,
      author: [User]
    },
    {
      content: 'i like',
      createdAt: 2020-08-13T18:33:33.000Z,
      author: [User]
    },
    {
      content: 'jxpqux1phsoqhzlqjzoqjxqjz',
      createdAt: 2020-08-13T16:30:46.000Z,
      author: [User]
    },
    {
      content: 'zakass',
      createdAt: 2020-08-13T15:09:25.000Z,
      author: [User]
    },
    {
      content: 'REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
      createdAt: 2020-08-13T15:04:10.000Z,
      author: [User]
    },
    {
      content: 'well done',
      createdAt: 2020-08-13T10:40:09.000Z,
      author: [User]
    },
    {
      content: 'para gemers',
      createdAt: 2020-08-13T10:11:47.000Z,
      author: [User]
    },
    {
      content: 'EXCELENTE',
      createdAt: 2020-08-13T10:01:14.000Z,
      author: [User]
    },
    {
      content: 'My Bst Song',
      createdAt: 2020-08-13T05:10:18.000Z,
      author: [User]
    },
    {
      content: 'tyt',
      createdAt: 2020-08-13T05:09:46.000Z,
      author: [User]
    },
    {
      content: 'the best song',
      createdAt: 2020-08-12T23:47:07.000Z,
      author: [User]
    },
    {
      content: 'Why is there a gap here?',
      createdAt: 2020-08-12T22:20:01.000Z,
      author: [User]
    },
    {
      content: 'Great Music',
      createdAt: 2020-08-12T13:03:08.000Z,
      author: [User]
    },
    {
      content: '♥♥♥♥♥♥',
      createdAt: 2020-08-11T19:06:06.000Z,
      author: [User]
    },
    {
      content: 'amazing',
      createdAt: 2020-08-11T18:12:37.000Z,
      author: [User]
    },
    {
      content: '@user-311302874 on other one really you are a robot made to tap kids and bait them into getting a virus on their device',
      createdAt: 2020-08-11T18:09:13.000Z,
      author: [User]
    },
    {
      content: 'hello',
      createdAt: 2020-08-11T17:54:44.000Z,
      author: [User]
    },
    {
      content: 'memorys',
      createdAt: 2020-08-11T13:31:56.000Z,
      author: [User]
    },
    {
      content: 'memorys',
      createdAt: 2020-08-11T13:31:56.000Z,
      author: [User]
    },
    {
      content: 'great',
      createdAt: 2020-08-11T10:45:28.000Z,
      author: [User]
    },
    {
      content: 'بدر',
      createdAt: 2020-08-11T10:04:49.000Z,
      author: [User]
    },
    {
      content: 'love it',
      createdAt: 2020-08-11T01:40:56.000Z,
      author: [User]
    },
    {
      content: 'Love ❤',
      createdAt: 2020-08-10T16:51:56.000Z,
      author: [User]
    },
    {
      content: 'Nice',
      createdAt: 2020-08-10T16:49:19.000Z,
      author: [User]
    },
    {
      content: 'solo the best',
      createdAt: 2020-08-10T14:16:20.000Z,
      author: [User]
    },
    {
      content: 'ffdddddfgrdgrdgtr',
      createdAt: 2020-08-09T20:47:30.000Z,
      author: [User]
    },
    {
      content: 'eeeee',
      createdAt: 2020-08-09T20:47:12.000Z,
      author: [User]
    }
  ]
}

```

## Search Result

```js
[
  {
    url: 'https://soundcloud.com/odesza/zhu-faded-odesza-remix',
    title: 'ZHU - Faded (ODESZA Remix) - Out June 29 on Mind of a Genius',
    type: 'track'
  },
  {
    url: 'https://soundcloud.com/osiasmusic/alan-walker-faded-osias-trap-remix',
    title: 'Alan Walker - Faded (Osias Trap Remix)',
    type: 'track'
  },
  {
    url: 'https://soundcloud.com/djsnake/zhu-dj-snake-dj-mustard-faded-20',
    title: 'Zhu - Dj Snake - Dj Mustard "Faded 2.0"',
    type: 'track'
  },
  {
    url: 'https://soundcloud.com/sheshizm2/alan-walker-faded-original-copy',
    title: 'Alan Walker - Faded || ( Medium Quality )',
    type: 'track'
  },
  {
    url: 'https://soundcloud.com/nickraymondg/zhu-faded',
    title: 'ZHU - Faded',
    type: 'track'
  },
  {
    url: 'https://soundcloud.com/actually_martin/faded-prod-by-sp-the-producer',
    title: 'Faded',
    type: 'track'
  },
  {
    url: 'https://soundcloud.com/tink_g/2-faded-qz57a1809171',
    title: 'Faded',
    type: 'track'
  },
  {
    url: 'https://soundcloud.com/jimmyprime/faded',
    title: 'Faded',
    type: 'track'
  },
  {
    url: 'https://soundcloud.com/vintageculturemusic/zhu-faded-vintage-culture-zerb-remix',
    title: 'Zhu - Faded (Vintage Culture &amp; Zerb Remix)',
    type: 'track'
  },
  {
    url: 'https://soundcloud.com/rickyxsan/faded',
    title: 'Faded',
    type: 'track'
  }
]

```

## Playlist

```js
[
  {
    title: 'Alan walker (play for me&amp;unity&amp;faded&amp;alone) (mix).mp3',
    url: 'https://soundcloud.com//zizozero12/alan-walker-play-for-meunityfadedalone-mixmp3',
    publishedAt: 2019-10-29T10:44:53.000Z,
    duration: 163000,
    genre: [ 'Electronic' ],
    author: User {
      name: 'abdo',
      username: 'abdo',
      followers: 0,
      createdAt: null,
      avatarURL: null,
      profile: 'https://soundcloud.com//zizozero12'
    }
  },
  {
    title: 'Alan Walker, K-391 &amp; Emelie Hollow - Lily (original mix) ❤️. Mp3',
    url: 'https://soundcloud.com//zizozero12/alan-walker-k-391-emelie-hollow-lily-lyrics',
    publishedAt: 2019-01-29T12:04:36.000Z,
    duration: 178000,
    genre: [ 'Dance', 'EDM' ],
    author: User {
      name: 'abdo',
      username: 'abdo',
      followers: 0,
      createdAt: null,
      avatarURL: null,
      profile: 'https://soundcloud.com//zizozero12'
    }
  },
  {
    title: 'Alanwalker Darkside(originalmix).mp3',
    url: 'https://soundcloud.com//zizozero12/alanwalker-darkside',
    publishedAt: 2018-08-08T21:18:24.000Z,
    duration: 188000,
    genre: [],
    author: User {
      name: 'abdo',
      username: 'abdo',
      followers: 0,
      createdAt: null,
      avatarURL: null,
      profile: 'https://soundcloud.com//zizozero12'
    }
  },
  {
    title: 'Alan Walker - Do It All For You (ft. Trevor Guthrie)mp3',
    url: 'https://soundcloud.com//zizozero12/lkkkk-mp3',
    publishedAt: 2019-09-25T13:30:24.000Z,
    duration: 166000,
    genre: [],
    author: User {
      name: 'abdo',
      username: 'abdo',
      followers: 0,
      createdAt: null,
      avatarURL: null,
      profile: 'https://soundcloud.com//zizozero12'
    }
  },
  {
    title: 'AlanWalker_Ft_Ava_Max_-_Alone_Pt_II',
    url: 'https://soundcloud.com//zizozero12/alan_walker_ft_ava_max_alone_pt_ii-2',
    publishedAt: 2019-12-29T23:08:28.000Z,
    duration: 194000,
    genre: [ 'Dance', 'EDM' ],
    author: User {
      name: 'abdo',
      username: 'abdo',
      followers: 0,
      createdAt: null,
      avatarURL: null,
      profile: 'https://soundcloud.com//zizozero12'
    }
  }
]

```

## User Info

```js
User {
  name: 'NCS',
  username: 'NCS',
  followers: 1299336,
  createdAt: 2012-04-29T12:00:22.000Z,
  avatarURL: 'https://i1.sndcdn.com/avatars-000703438633-4jlywq-large.jpg',
  profile: 'https://soundcloud.com/nocopyrightsounds'
}

```