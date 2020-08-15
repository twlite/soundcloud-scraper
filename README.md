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
    {
      content: 'Wlkkar fade',
      createdAt: 2020-08-14T17:50:39.000Z,
      author: [User]
    },
    {
      content: 'nice',
      createdAt: 2020-08-14T05:00:14.000Z,
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
