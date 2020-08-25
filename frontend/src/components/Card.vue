<template>
  <router-link
    :to="url"
    class="relative block px-4 py-12 text-center text-gray-500 bg-gray-800 rounded hover:text-gray-600 hover:bg-gray-900"
  >
    <span class="text-2xl font-semibold capitalize">{{ title }}</span>
    <!-- <span class="absolute top-0 right-0 p-4 text-xs font-semibold lowercase">
      {{ viewers }} {{ viewers === 1 ? "espectador" : "espectadores" }}
    </span> -->
  </router-link>
</template>

<script>
export default {
  name: "Card",
  props: {
    url: String,
    title: String,
    viewers: Number,
  },
}
</script>
