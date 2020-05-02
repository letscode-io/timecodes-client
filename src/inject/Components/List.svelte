<script>
  import { fade } from 'svelte/transition';
  import { humanizeTime } from '../helpers/humanizeTime';
  import { video } from '../stores';

  export let visible;
  export let items;

  function setTime(seconds) {
    $video.currentTime = seconds;
  }
</script>

<style>
  .hidden {
    display: none;
  }

  .content {
    padding: 1rem 0 1rem 3px;
  }

  .list {
    display: inline-grid;
    grid-template-columns: auto auto;
    grid-gap: 0.5rem 1rem;
    font-size: 14px;
  }

  .timecode a {
    color: rgb(6, 95, 212);
  }
</style>

{#if visible}
  <div class="content" transition:fade>
    <div class="list">
      {#await items}
        <div>Loading...</div>
      {:then list}
        {#if !list.length}
          <div>Nothing to show</div>
        {/if}
        {#each list as item}
          <div class="description">
            {item.description}
          </div>
          <div class="timecode">
            <a href="#" on:click|preventDefault={() => setTime(item.seconds)}>
              {humanizeTime(item.seconds)}
            </a>
          </div>
        {/each}
      {:catch error}
        <div>Your princess is in another castle: {error.message}</div>
      {/await}
    </div>
  </div>
{/if}
