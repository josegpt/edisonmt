<script>
  import c from "../helpers"
  export let status
  export let error

  const dev = process.env.NODE_ENV === "development"
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<section class="flex flex-col items-center justify-center">
  <h1 class="flex my-2 text-3xl capitalize">
    <div class="flex items-center mr-4 text-3xl text-gray-200">
      <span class="relative flex w-3 h-3">
        <span
          class="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping" />
        <span class="relative inline-flex w-3 h-3 bg-red-500 rounded-full" />
      </span>
      <span class="ml-2">
        <span class="text-red-500">{status}</span>
        &mdash; {c(status)}
      </span>
    </div>
  </h1>
  <a href="." class="text-xl text-blue-500 capitalize">{c('goBack')}</a>
</section>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
