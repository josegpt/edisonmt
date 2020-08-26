<template>
  <section class="flex flex-col items-center justify-center flex-1 capitalize">
    <h1 class="flex">
      <div class="flex items-center mr-4 text-gray-200">
        <span class="relative flex w-3 h-3">
          <span
            class="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"
          />
          <span class="relative inline-flex w-3 h-3 bg-red-500 rounded-full" />
        </span>
        <span class="text-6xl text-red-500">404</span>
      </div>
    </h1>
    <span class="text-xl">pagina no disponible</span>
    <router-link to="/" class="text-xl text-blue-500">inicio</router-link>
  </section>
</template>
