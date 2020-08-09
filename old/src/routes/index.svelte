<script>
  import axios from "axios"
  import { SpinLine } from "svelte-loading-spinners"
  import c from "../helpers"
  import Player from "../components/Player.svelte"
</script>

<svelte:head>
  <title>{c('brand')}</title>
</svelte:head>

{#await axios('http://localhost:3000/status')}
  <section class="flex items-center justify-center">
    <SpinLine size="60" color="#D0021B" unit="px" />
  </section>
{:then { data }}
  {#if data.status === 'offline'}
    <section class="flex flex-col items-center">
      <h1 class="flex my-2 text-3xl capitalize">
        <div class="flex items-center mr-4 text-3xl">
          <span class="relative flex w-3 h-3">
            <span
              class="absolute inline-flex w-full h-full bg-red-400 rounded-full
              opacity-75 animate-ping" />
            <span
              class="relative inline-flex w-3 h-3 bg-red-500 rounded-full" />
          </span>
          <span class="ml-2">{c(data.status)}</span>
        </div>
      </h1>
    </section>
  {:else}
    <section class="flex flex-col">
      <h1 class="flex my-2 text-3xl capitalize">
        <div class="flex items-center mr-4 text-3xl text-gray-500">
          <span class="relative flex w-3 h-3">
            <span
              class="absolute inline-flex w-full h-full bg-green-400
              rounded-full opacity-75 animate-ping" />
            <span
              class="relative inline-flex w-3 h-3 bg-green-500 rounded-full" />
          </span>
          <span class="ml-2">{c(data.status)} {data.viewers}</span>
        </div>
        <span>{data.title}</span>
      </h1>

      <main>
        <Player />
      </main>
    </section>
  {/if}
{:catch error}
  <section class="flex flex-col items-center justify-center">
    <h1 class="flex my-2 text-3xl capitalize">
      <div class="flex items-center mr-4 text-3xl text-gray-200">
        <span class="relative flex w-3 h-3">
          <span
            class="absolute inline-flex w-full h-full bg-red-400 rounded-full
            opacity-75 animate-ping" />
          <span class="relative inline-flex w-3 h-3 bg-red-500 rounded-full" />
        </span>
        <span class="ml-2">{error}</span>
      </div>
    </h1>
    <a href="." class="text-xl text-blue-500 capitalize">{c('refresh')}</a>
  </section>
{/await}
