var Datastore = require('nedb');
//Importing database methods
const songsStore  = new Datastore({
    filename: __dirname + '/liked_songs.db',
    autoload: true
});

var methods = {
    insert: function (song, album) {
        songsStore.insert({song: song, album: album});
    },
    delete: function (song, album) {
        songsStore.remove({song: song, album: album});
    },
    find: function (song, album) {
        console.log(song,album);
        return new Promise((resolve, reject) => {
            songsStore.findOne({song: song, album: album}, (err, result) => {
                err ? reject(err) : result ? resolve(true) : resolve(false);
            })
        });
    }
}
module.exports = methods;
    
    