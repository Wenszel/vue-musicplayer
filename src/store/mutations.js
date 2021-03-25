const mutations = {
    
    SET_DIRS(state, dirs) {
        state.dirs = dirs;
    },
    SET_FILES(state, files) {
        state.files = files;
    },
    SET_CURRENT_SONG(state,song) {
        state.currentSong = song;
    }
}
export default mutations;