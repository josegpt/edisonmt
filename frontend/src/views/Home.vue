<template>
  <Loader v-if="isLoading" />
  <section
    v-else-if="streams.length === 0 || isError"
    class="flex items-center justify-center flex-1"
  >
    <h1 class="flex justify-center text-3xl capitalize">
      <div class="flex items-center text-3xl">
        <span class="relative flex w-3 h-3">
          <span
            class="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"
          />
          <span class="relative inline-flex w-3 h-3 bg-red-500 rounded-full" />
        </span>
        <span class="ml-2 text-2xl font-semibold sm:text-3xl"
          >desconectado</span
        >
      </div>
    </h1>
  </section>
  <section v-else class="flex-1 px-4">
    <div class="container mx-auto">
      <main class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="(stream, i) in streams"
          :key="i"
          :title="stream"
          :url="`/stream/${stream}`"
          :viewers="0"
        />
      </main>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import axios from "axios"
import { parseString } from "xml2js"
import Loader from "@/components/Loader.vue"
import Card from "@/components/Card.vue"

export default {
  name: "Home",
  components: {
    Loader,
    Card,
  },
  computed: {
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
        parseString(response, (err, result) => {
          if (err) this.$store.dispatch("fetchStreamsFailure", err)
          this.$store.dispatch("fetchStreamsSuccess", result)
        })
      })
      .catch((err) => this.$store.dispatch("fetchStreamsFailure", err))
  },
}
</script>
