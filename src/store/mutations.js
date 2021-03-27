const mutations = {
    
    SET_DIRS(state, dirs) {
        state.dirs = dirs;
        state.currentAlbum = dirs[0];
    },
    SET_FILES(state, files) {
        state.files = files;
        state.currentSong = files[0].file;
    },
    SET_CURRENT_SONG(state, song) {
        state.currentSong = song;
    },
    SET_CURRENT_ALBUM(state, album) {
        state.currentAlbum = album;
    },
    SET_CURRENT_SONG_DURATION(state, songDuration){
        state.currentSongDuration = songDuration;
    },
    SET_CURRENT_TIME(state, time){
        state.currentTime = time;
    },
    SET_CURRENT_SONG_PATH(state){
        state.currentSongPath = `http://localhost:3000/static/mp3/${state.currentAlbum}/${state.currentSong}`;
    },
    SET_IS_CURRENTLY_PLAYING(state, isCurrentlyPlaying){
        state.isCurrentlyPlaying = isCurrentlyPlaying;
    },
    
}
export default mutations;