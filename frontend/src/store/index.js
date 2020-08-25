import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    error: null,
    streams: [],
    stream: {},
  },
  actions: {
    fetchStreamsRequest({ state }) {
      state.isLoading = true
    },
    fetchStreamsSuccess({ state }, payload) {
      state.isLoading = false
      state.streams = payload
    },
    fetchStreamsFailure({ state }, err) {
      state.isLoading = false
      state.error = err
    },
    fetchStreamRequest({ state }) {
      state.isLoading = true
    },
    fetchStreamSuccess({ state }, payload) {
      state.isLoading = false
      state.stream = payload
    },
    fetchStreamFailure({ state }, err) {
      state.isLoading = false
      state.error = err
    },
  },
  modules: {},
})
