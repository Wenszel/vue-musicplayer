const mutations = {
    
    SET_DIRS(state, dirs) {
        state.dirs = dirs;
        state.currentlyViewedAlbum = dirs[0];
    },
    SET_FILES(state, files) {
        state.files = files;
    },
    SET_CURRENTLY_VIEWED_ALBUM(state, album) {
        state.currentlyViewedAlbum = album;
    },
    //SETTER FOR PLAYER: 
    SET_CURRENT_SONG(state, song) {
        state.player.song = song;
        state.currentSongPath = `http://localhost:3000/static/mp3/${state.player.album}/${state.player.song}`;
    },
    SET_CURRENT_ALBUM(state, album) {
        state.player.album = album;
        state.currentSongPath = `http://localhost:3000/static/mp3/${state.player.album}/${state.player.song}`;
    },
    SET_ALBUM_SONGS(state, songs) {
        state.player.albumSongs = songs;
    },
    SET_SONG_DURATION(state, songDuration){
        state.player.songDuration = songDuration;
    },
    SET_CURRENT_TIME(state, time){
        state.player.currentTime = time;
    },
    SET_IS_CURRENTLY_PLAYING(state, isCurrentlyPlaying){
        state.player.isCurrentlyPlaying = isCurrentlyPlaying;
    },
    
}
export default mutations;