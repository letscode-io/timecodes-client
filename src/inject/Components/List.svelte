<script>
  import Item from "./Item.svelte";
  import { fade } from "svelte/transition";

  export let isLoggedIn;
  export let items;
  export let visible;
</script>

<style>
  .content {
    padding: 1rem 0 1rem 3px;
  }
</style>

{#if visible}
  <div class="content" transition:fade>
    <div class="grid grid-cols-4 gap-4">
      {#await items}
        <div>Loading...</div>
      {:then list}
        {#if !list.length}
          <div>Nothing to show</div>
        {/if}
        {#each list as item}
          <Item {item} {isLoggedIn} />
        {/each}
      {:catch error}
        <div>Your princess is in another castle: {error.message}</div>
      {/await}
    </div>
  </div>
{/if}
