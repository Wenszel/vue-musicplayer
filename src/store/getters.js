const getters = {
    getAllDirs: function (state) {
        return state.dirs;
    },
    getAllCovers: function (state) {
        return state.covers;
    },
    getAllFiles: function (state) {
        return state.files;
    }
}
export default getters;