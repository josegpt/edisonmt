<script>
  import io from "socket.io-client"
  import c from "../helpers"
  import { SpinLine } from "svelte-loading-spinners"
  import Player from "../components/Player.svelte"
  const socket = io()

  let status = "offline"
  let title
  let viewers
  socket.on("status", (payload) => {
    status = payload.status
    title = payload.title
    viewers = payload.viewers
  })
</script>

<svelte:head>
  <title>
    {c('brand')}
    {status === undefined || status === 'offline' ? '' : ` | ${title}`}
  </title>
</svelte:head>

<!-- <section class="flex items-center justify-center">
    <SpinLine size="60" color="#D0021B" unit="px" />
  </section> -->

{#if status === 'offline'}
  <section class="flex flex-col items-center">
    <h1 class="flex my-2 text-3xl capitalize">
      <div class="flex items-center mr-4 text-3xl">
        <span class="relative flex w-3 h-3">
          <span
            class="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping" />
          <span class="relative inline-flex w-3 h-3 bg-red-500 rounded-full" />
        </span>
        <span class="ml-2">{c(status)}</span>
      </div>
    </h1>
  </section>
{:else}
  <section class="flex flex-col">
    <h1 class="flex my-2 text-3xl capitalize">
      <div class="flex items-center mr-4 text-3xl text-gray-500">
        <span class="relative flex w-3 h-3">
          <span
            class="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping" />
          <span
            class="relative inline-flex w-3 h-3 bg-green-500 rounded-full" />
        </span>
        <span class="ml-2">{c(status)} {viewers}</span>
      </div>
      <span>{title}</span>
    </h1>

    <main>
      <Player />
    </main>
  </section>
{/if}
