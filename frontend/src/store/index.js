import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    error: null,
    streams: [],
  },
  getters: {
    isStreamLive: (state) => (streamId) =>
      state.streams.find((stream) => streamId === stream.name._text),
  },
  mutations: {
    fetchStreamsRequest(state) {
      state.isLoading = true
    },
    fetchStreamsSuccess(state, payload) {
      state.isLoading = false
      state.streams = payload
    },
    fetchStreamsFailure(state, payload) {
      state.isLoading = false
      state.error = payload
    },
  },
  actions: {
    SOCKET_streams({ commit }, payload) {
      commit("fetchStreamsSuccess", payload)
    },
    SOCKET_error({ commit }, payload) {
      commit("fetchStreamsFailure", payload)
    },
    fetchStreamsRequest({ commit }) {
      commit("fetchStreamsRequest")
    },
  },
})
