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

console.log(scraper.getSongInfos('https://soundcloud.com/nocopyrightsounds/alan-walker-fade-ncs-release'));
/*
{
    title: 'Alan Walker - Fade [NCS Release]',
    author: 'NCS',
    duration: 'PT00H04M24S',
    genre: 'Electro House',
    playCount: 42970864,
    commentsCount: 16932,
    likeCount: 616519,
    thumbnail: 'https://i1.sndcdn.com/avatars-000703438633-4jlywq-t500x500.jpg'
}
*/
```
