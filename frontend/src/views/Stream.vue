<template>
  <Loader v-if="isLoading" />
  <section
    v-else-if="!isLive || error"
    class="flex flex-col items-center justify-center flex-1 capitalize"
  >
    <h1 class="flex">
      <div class="flex items-center mr-4 text-gray-200">
        <span class="relative flex w-3 h-3">
          <span
            class="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"
          />
          <span class="relative inline-flex w-3 h-3 bg-red-500 rounded-full" />
        </span>
        <span class="ml-2 text-xl font-semibold sm:text-3xl"
          >transmision terminada</span
        >
      </div>
    </h1>
    <router-link to="/" class="text-xl text-blue-500">inicio</router-link>
  </section>
  <section v-else class="flex items-center flex-1 px-4">
    <div class="container mx-auto">
      <header class="flex justify-between">
        <h1 class="flex my-2 font-semibold uppercase sm:text-3xl">
          <div class="flex items-center">
            <span class="relative flex w-3 h-3">
              <span
                class="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"
              />
              <span
                class="relative inline-flex w-3 h-3 bg-green-500 rounded-full"
              />
            </span>
            <span class="ml-2 text-white">{{ isLive.title }}</span>
          </div>
        </h1>
        <div class="flex items-center ml-4 font-semibold text-gray-500">
          <svg class="w-4 h-4 fill-current">
            <use xlink:href="/img/sprite.svg#icon-eye" />
          </svg>
          <span class="ml-1">{{ isLive.viewers }}</span>
        </div>
      </header>
      <main class="relative pb-1/3">
        <Player :url="`https://edisonmt.com/hls/${isLive.title}.m3u8`" />
      </main>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import Loader from "@/components/Loader.vue"
import Player from "@/components/Player.vue"

export default {
  name: "Stream",
  components: {
    Player,
    Loader,
  },
  computed: {
    isLive() {
      const { stream } = this.$route.params
      return this.$store.getters.isStreamLive(stream)
    },
    ...mapState({
      isLoading: (state) => state.isLoading,
      error: (state) => state.error,
    }),
  },
  mounted() {
    this.$store.dispatch("fetchStreamsRequest")
    this.$socket.emit("joinStream", this.$route.params.stream)
  },
  beforeRouteLeave(to, from, next) {
    this.$socket.emit("leaveStream", from.params.stream)
    next()
  },
}
</script>
