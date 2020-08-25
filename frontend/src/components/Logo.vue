<template>
  <router-link to="/" class="py-4">
    <img src="/img/name-logo.png" alt="EdisonMT" class="h-10 sm:hidden" />
    <img src="/img/side-logo.png" alt="EdisonMT" class="hidden h-20 sm:block" />
  </router-link>
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: String,
  },
}
</script>
