import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    error: null,
    streams: [],
  },
  actions: {
    fetchStreamsRequest({ state }) {
      state.isLoading = true
    },
    fetchStreamsSuccess({ state }, payload) {
      state.isLoading = false
      console.log(payload)
      const payloadPath = payload.rtmp.server[0].application[0].live[0]
      if (payloadPath && payloadPath.stream && payloadPath.stream[0].name) {
        state.streams = [...payloadPath.stream[0].name]
      }
    },
    fetchStreamsFailure({ state }, err) {
      state.isLoading = false
      console.log(err)
      state.error = err
    },
  },
  modules: {},
})
