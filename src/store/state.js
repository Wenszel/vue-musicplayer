const state = {
    dirs: [], // All albums names
    files: [], // Names of songs in currently viewed album
    currentlyViewedAlbum: '', // Information which album is currently on screen 
    currentSongPath: '', // Link to track on server
    player: { // All information about the currently playing track     
        song: '',
        album: '',
        albumSongs: [], // Other songs of album
        songDuration: '',
        currentTime: '',  
        shuffle: false,
        repeat: false,
        isCurrentlyPlaying: false,
    },
}
export default state;