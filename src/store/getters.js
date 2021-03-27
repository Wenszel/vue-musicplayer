const getters = {
    getAllDirs: function (state) {
        return state.dirs;
    },
    getAllFiles: function (state) {
        return state.files;
    },
    getCurrentSong: function (state) {
        return state.currentSong;
    },
    getCurrentAlbum: function (state) {
        return state.currentAlbum;
    },
    getCurrentTime: function (state) {
        return state.currentTime;
    },
    getCurrentSongDuration: function (state) {
        return state.currentSongDuration;
    },
    getCurrentSongPath: function (state) {
        return state.currentSongPath;
    },
    getIsCurrentlyPlaying: function (state) {
        return state.isCurrentlyPlaying;
    }
}
export default getters;