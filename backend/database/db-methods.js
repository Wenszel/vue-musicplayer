var Datastore = require('nedb');
//Init database
const songsStore  = new Datastore({
    filename: __dirname + '/liked_songs.db',
    autoload: true
});
//Database control methods
var methods = {
    // Inserting new song to db
    insert: function (file, album, size) {
        songsStore.insert({
            file: file, 
            album: album,
            size: size
        });
    },
    // Deleting song from database by song and album names
    delete: function (file, album) {
        songsStore.remove({file: file, album: album});
    },
    // Checks if song is saved to db
    find: function (file, album) {
        return new Promise((resolve, reject) => {
            songsStore.findOne({file: file, album: album}, (err, result) => {
                err ? reject(err) : result ? resolve(true) : resolve(false);
            })
        });
    },
    // Finds all song in database - used to return songs to vue
    findAll: function () {
        return new Promise((resolve, reject) => {
            songsStore.find({}, (err, result) => {
                err ? reject(err) : resolve(result);
            })
        });
    }
}
module.exports = methods;
    
    