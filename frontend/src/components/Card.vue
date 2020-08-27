<template>
  <router-link
    :to="url"
    class="relative block px-4 py-12 text-center text-gray-400 bg-gray-700 rounded group hover:bg-gray-800"
  >
    <span class="text-2xl font-semibold capitalize group-hover:text-gray-500">{{
      title
    }}</span>
    <div
      class="absolute top-0 right-0 flex items-center px-3 py-1 m-2 bg-gray-600 rounded-full group-hover:text-gray-500 group-hover:bg-gray-700"
    >
      <svg class="w-4 h-4 fill-current">
        <use xlink:href="/img/sprite.svg#icon-eye" />
      </svg>
      <span class="ml-2 text-sm font-semibold">{{ viewers }}</span>
    </div>
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
