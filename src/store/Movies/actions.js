import axios from "axios";

export default {
    index({ commit }, search) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/films?search=${search}`)
                .then(res => {
                    commit('SET_MOVIES', res.data)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    show({ commit }, id) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/films/${id}`)
                .then(res => {
                    commit('SET_MOVIE', res.data)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    showPeople({ commit }, id) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/people/${id}`)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
        })
    },
}