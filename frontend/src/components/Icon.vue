<template>
  <svg class="w-6 h-6 fill-current">
    <use :xlink:href="`/img/sprite.svg#icon-${name}`" />
  </svg>
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: String,
  },
}
</script>
