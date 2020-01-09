import { login, logout } from '@/api/authentication'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import avatar from '@/assets/user.jpg'

const state = {
  token: getToken() ? JSON.parse(getToken()) : null,
  name: getToken() ? JSON.parse(getToken()).username : '',
  avatar: avatar,
  info: getToken() ? JSON.parse(getToken()) : {}
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const item = response.data
        commit('SET_NAME', item.user.username)
        commit('SET_INFO', item.user)
        commit('SET_TOKEN', item.user)
        setToken(JSON.stringify(item.user))
        resolve(item)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_NAME', '')
        commit('SET_INFO', {})
        commit('SET_TOKEN', null)
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_NAME', '')
      commit('SET_INFO', {})
      commit('SET_TOKEN', null)
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

