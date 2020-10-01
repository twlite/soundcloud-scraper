import SoundCloud from "../index.js";

export default SoundCloud;

export const {
    download,
    getSongInfo,
    getUserInfo,
    getUserLikes,
    getPlaylist,
    search,
    validateURL,
    getRecommendedSongs,
    fetchSoundcloudKey,
    fetchSoundcloudVersion,
    getStreamURL,
    getStore,
} = SoundCloud;