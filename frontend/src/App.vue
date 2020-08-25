<template>
  <div
    class="flex flex-col min-h-screen font-sans antialiased text-white bg-black"
  >
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="theme-color" content="#D0021B" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <title>EdisonMT</title>
    </Head>
    <header class="flex items-center justify-center">
      <Logo />
    </header>
    <main class="flex flex-1 pt-4"><router-view /></main>
    <footer class="flex flex-col items-center justify-center my-1">
      <SocialNetworks />
      <p class="text-xs text-center">
        Ningun video se encuentra alojado en nuestros servidores.
      </p>
    </footer>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue"
import SocialNetworks from "@/components/SocialNetworks.vue"

export default {
  name: "App",
  components: {
    Logo,
    SocialNetworks,
  },
}
</script>
