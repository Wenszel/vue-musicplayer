import axios from 'axios'
const actions = {
    
    getAlbums({ commit }) {
        axios.post('http://localhost:3000/', JSON.stringify({body:{action: 'albums'}}))
        .then(response => {
            console.log(response);
            commit('SET_DIRS', response.data.dirs);
            commit('SET_FILES', response.data.files);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    getCovers({ commit }) {
        axios.post('http://localhost:3000/', JSON.stringify({body:{action: 'covers'}}))
        .then(response => {
            commit('SET_COVERS', response.data.covers);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    getAlbum({ commit }){
        axios.post('http://localhost:3000/', JSON.stringify({body:{action: 'album'}}))
        .then(response => {
            commit('SET_FILES', response.data.files);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
export default actions;