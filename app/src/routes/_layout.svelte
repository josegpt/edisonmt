<script>
  import Logo from "../components/Logo.svelte"
  import Icon from "../components/Icon.svelte"
  import c from "../helpers"

  export let segment
</script>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

<header class="flex items-center justify-center">
  <Logo />
</header>
<main class="flex items-center justify-center flex-1 px-4">
  <div class="container">
    <slot />
  </div>
</main>
<footer class="flex flex-col items-center justify-center my-1">
  <div class="flex my-4">
    <span class="mr-2 font-semibold capitalize">{c('followUs')}</span>
    {#each c('socialNetwork') as item}
      <a
        href={item.url}
        target="_blank"
        rel="external"
        class="mr-4 hover:{item.hoverColor}">
        <Icon name={item.icon} />
      </a>
    {/each}
  </div>
  <p class="text-xs text-center">{c('notice')}</p>
</footer>
