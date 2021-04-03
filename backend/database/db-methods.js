var Datastore = require('nedb');
//Importing database methods
const songsStore  = new Datastore({
    filename: './database/liked_songs.db',
    autoload: true
});

var methods = {
    insert: function (song, album) {
        songsStore.insert({song: song, album: album});
    },
    delete: function (song) {
        songsStore.remove({song: song});
    }
}
module.exports = methods;
    
    