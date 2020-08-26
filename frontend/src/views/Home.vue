<template>
  <Loader v-if="isLoading" />
  <section
    v-else-if="streams.length === 0 || error"
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
          :title="stream.title"
          :url="`/stream/${stream.title}`"
          :viewers="stream.viewers"
        />
      </main>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex"
import Loader from "@/components/Loader.vue"
import Card from "@/components/Card.vue"

export default {
  name: "Home",
  components: {
    Loader,
    Card,
  },
  computed: mapState({
    isLoading: (state) => state.isLoading,
    error: (state) => state.error,
    streams: (state) => state.streams,
  }),
  mounted() {
    this.$store.dispatch("fetchStreamsRequest")
  },
}
</script>
