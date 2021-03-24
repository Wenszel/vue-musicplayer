
import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex);

// state
import state from './state'
// getters
import getters from './getters'
// actions
import actions from './actions'
// mutations
import mutations from './mutations'

//export store 
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
