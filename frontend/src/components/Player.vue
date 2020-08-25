<template>
  <v-clappr
    el="player"
    :source="source"
    :options="options"
    class="absolute w-full h-full"
  />
</template>

<script>
import VClappr from "v-clappr"

export default {
  name: "Player",
  props: {
    url: String,
  },
  components: {
    VClappr,
  },
  data() {
    return {
      source: this.url,
      options: {
        height: "100%",
        width: "100%",
        autoplay: false,
        poster: "/img/youtube-banner.jpg",
        ga: {},
        i18n: {
          en: {
            live: "live",
            back_to_live: "back to live",
            disabled: "Disabled",
            playback_not_supported:
              "Your browser does not support the playback of this video. Please try using a different browser.",
            default_error_title: "Could not play video.",
            default_error_message:
              "There was a problem trying to load the video.",
          },
        },
        watermark: {
          image: "/img/icon.png",
          url: "https://edisonmt.com",
          position: "top-left",
        },
      },
    }
  },
}
</script>

<style>
.play-wrapper[data-poster] {
  display: flex;
  justify-content: center;
}
</style>
