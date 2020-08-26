<template>
  <div class="flex justify-center">
    <VueScriptComponent
      :script="
        `<script type='text/javascript' src='https://stinkyrepetition.com/${apiKey}/invoke.js'></script>`
      "
    />
  </div>
</template>

<script>
import VueScriptComponent from "vue-script-component"

export default {
  name: "Ad",
  components: {
    VueScriptComponent,
  },
  props: {
    apiKey: String,
    format: String,
    height: Number,
    width: Number,
    params: Object,
  },
  mounted() {
    window.atOptions = {
      key: this.apiKey,
      format: this.format,
      height: this.height,
      width: this.width,
      params: this.params,
    }
  },
}
</script>
