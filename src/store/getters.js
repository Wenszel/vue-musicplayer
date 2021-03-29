const getters = {
    getAllDirs: function (state) {
        return state.dirs;
    },
    getAllFiles: function (state) {
        return state.files;
    },
    getCurrentlyViewedAlbum: function (state) {
        return state.currentlyViewedAlbum;
    },
    getCurrentSongPath: function (state) {
        return state.currentSongPath;
    },

    //GETTING PLAYER DATA:
    getCurrentSong: function (state) {
        return state.player.song;
    },
    getCurrentAlbum: function (state) {
        return state.player.album;
    },
    getAlbumSongs: function (state) {
        return state.player.albumSongs;
    },
    getSongDuration: function (state) {
        return state.player.songDuration;
    },
    getCurrentTime: function (state) {
        return state.player.currentTime;
    },
    getIsCurrentlyPlaying: function (state) {
        return state.player.isCurrentlyPlaying;
    },
    
    
}
export default getters;