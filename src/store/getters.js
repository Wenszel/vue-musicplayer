const getters = {
    getAllDirs: function (state) {
        return state.dirs;
    },
    getCurrentSong: function (state) {
        return state.currentSong;
    },
    getAllFiles: function (state) {
        return state.files;
    }
}
export default getters;