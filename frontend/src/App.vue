<template>
  <div
    class="flex flex-col min-h-screen font-sans antialiased text-white bg-black"
  >
    <header class="flex items-center justify-center">
      <Logo />
    </header>
    <main class="flex flex-1 pt-4">
      <router-view :key="$route.path" />
    </main>
    <Ad
      apiKey="3db1d71994426446b256d378e1687d27"
      format="iframe"
      :height="320"
      :width="50"
      :params="{}"
    />
    <footer class="flex flex-col items-center justify-center my-1">
      <SocialNetworks />
      <p class="text-xs text-center">
        Ningun video se encuentra alojado en nuestros servidores.
      </p>
    </footer>
  </div>
</template>

<script>
import Ad from "@/components/Ad.vue"
import Logo from "@/components/Logo.vue"
import SocialNetworks from "@/components/SocialNetworks.vue"

export default {
  name: "App",
  components: {
    Logo,
    SocialNetworks,
    Ad,
  },
}
</script>
