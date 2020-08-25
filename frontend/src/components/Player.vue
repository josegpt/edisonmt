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
            live: "en vivo",
            back_to_live: "volver a transmission en vivo",
            disabled: "deshabilitado",
            playback_not_supported:
              "Su navegador no admite la reproducción de este video. Intente utilizar un navegador diferente.",
            default_error_title: "No se pudo reproducir el video.",
            default_error_message:
              "Hubo un problema al intentar cargar el video.",
          },
        },
        watermark: {
          image: "/img/player-logo.png",
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
