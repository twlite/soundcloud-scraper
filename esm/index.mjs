import SoundCloud from "../index.js";

export default SoundCloud;

export const {
    download,
    getSongInfo,
    getUserInfo,
    getPlaylist,
    search,
    validateURL,
    getRecommendedSongs,
    fetchSoundcloudKey
} = SoundCloud;