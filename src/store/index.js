import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import authentication from './modules/authentication'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    authentication
  },
  getters
})

export default store
