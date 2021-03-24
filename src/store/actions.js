const actions = {
    
    getAlbums({ commit }) {
        axios.post('http://localhost:3000/', JSON.stringify({body:{action: 'albums'}}))
        .then(response => {
            commit('SET_DIRS', response.dirs);
            commit('SET_FILES', response.files);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    getCover({ commit }) {
        axios.post('http://localhost:3000/', JSON.stringify({body:{action: 'covers'}}))
        .then(response => {
            commit('SET_COVERS', response.covers);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    getAlbum({ commit }){
        axios.post('http://localhost:3000/', JSON.stringify({body:{action: 'album'}}))
        .then(response => {
            commit('SET_FILES', response.files);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
export default actions;