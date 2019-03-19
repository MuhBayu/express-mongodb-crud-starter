import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    user:null,
    status:'guest',
    isLogin:false,
    accessToken:null,
}

const getters = {
    user: (state, getters) => {
        return state.user
    },
    userID: (state, getters) => {
        return localStorage.getItem('user')
    },
    accessToken: (state, getters) => {
        return localStorage.getItem('userToken')
    },
    status: state => {
        return state.status
    }
}

const actions = {
    setUser({commit}, data) {
        commit('setUser', data)
    },
    getAll({ commit }) {
        commit('getAllRequest')
    },
    setStatus({commit}, status) {
        commit('setStatus', status);
    },
    setLogin({commit, dispatch}, data) {
        dispatch('setStatus', 'isLogin')
        dispatch('setUser', data)
        localStorage.setItem('isLoggedin', true)
        localStorage.setItem('user', data._id)
        localStorage.setItem('userToken', data.token)
    },
    logout({commit}) {
        commit('logout')
    }
}
const mutations = {
    setUser(state, data) {
        state.user = data
    },
    getAllRequest(state) {
        state.user = {username:'tesss'}
    },
    setStatus(state, status) {
        state.status = status;
    },
    logout(state) {
        state.status = 'guest'
        state.user = {}
        localStorage.removeItem('isLoggedin')
        localStorage.removeItem('user')
        localStorage.removeItem('userToken')
    },
}

export const user = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}