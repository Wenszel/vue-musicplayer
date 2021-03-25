import axios from 'axios'
const actions = {
    
    getAlbums({ commit }) {
        axios.post('http://localhost:3000/', JSON.stringify({body:{action: 'albums'}}))
        .then(response => {
            commit('SET_DIRS', response.data.dirs);
            commit('SET_FILES', response.data.files);
        })
        .catch(function (error) {
            console.log(error);
        });
    },

    getAlbum({ commit }, album){
        axios.post('http://localhost:3000/', JSON.stringify({body:{action: 'album', album:{album}}}))
        .then(response => {
            commit('SET_FILES', response.data.files);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
export default actions;