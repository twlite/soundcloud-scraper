module.exports = {
    SOUNDCLOUD_BASE_URL: "https://soundcloud.com",
    STREAM_USER_AGENT: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
    STREAM_ACCEPT_ENCODING: "gzip, deflate, br",
    STREAM_ACCEPT: "*/*",
    SOUNDCLOUD_API_VERSION: "/version.txt",
    SOUNDCLOUD_URL_REGEX: /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/,
    SOUNDCLOUD_KEYGEN_URL_REGEX: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    SOUNDCLOUD_API_KEY_REGEX: /(https:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
};