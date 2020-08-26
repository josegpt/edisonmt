import "./assets/styles/index.css"
import Vue from "vue"
import VueSocketIO from "vue-socket.io"
import App from "./App.vue"
import router from "./router"
import store from "./store"

Vue.config.productionTip = false

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "https://api.edisonmt.com",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
    },
  })
)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
