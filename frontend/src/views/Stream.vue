<template>
  <Loader v-if="isLoading" />
  <section
    v-else-if="streams.length === 0 || isError"
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
        <span class="ml-2 text-xl font-semibold sm:text-3xl">
          transmision terminada
        </span>
      </div>
    </h1>
    <router-link to="/" class="text-xl text-blue-500">
      inicio
    </router-link>
  </section>
  <section v-else class="flex items-center flex-1 px-4">
    <div class="container mx-auto">
      <h1 class="flex my-2 text-xl text-white uppercase sm:text-3xl">
        <div class="flex items-center mr-4 text-xl sm:text-3xl">
          <span class="relative flex w-3 h-3">
            <span
              class="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"
            />
            <span
              class="relative inline-flex w-3 h-3 bg-green-500 rounded-full"
            />
          </span>
        </div>
        <span>{{ stream }}</span>
      </h1>

      <main class="relative pb-1/3">
        <Player :url="`https://edisonmt.com/hls/${stream}.m3u8`" />
      </main>
    </div>
  </section>
</template>

<script>
import axios from "axios"
import { parseString } from "xml2js"
import Loader from "@/components/Loader.vue"
import Player from "@/components/Player.vue"

export default {
  name: "Stream",
  components: {
    Player,
    Loader,
  },
  computed: {
    stream() {
      return this.$route.params.stream
    },
    streams() {
      return this.$store.state.streams
    },
    isLoading() {
      return this.$store.state.isLoading
    },
    isError() {
      return this.$store.state.error
    },
  },
  mounted() {
    axios
      .get("https://edisonmt.com/stats")
      .then((response) => {
        parseString(t, (err, result) => {
          if (err) this.$store.dispatch("fetchStreamsFailure", err)
          this.$store.dispatch("fetchStreamsSuccess", result)
        })
      })
      .catch((err) => this.$store.dispatch("fetchStreamsFailure", err))
  },
}
</script>
