<script>
  import { onMount } from 'svelte';

  export let visible;
  export let items;

  let video;

  function getTime(seconds) {
    return `${Math.floor(seconds / 60)}:${seconds % 60}`;
  }

  function setTime(seconds) {
    if (video) {
      video.currentTime = seconds;
    }
  }

  onMount(() => {
    video = document.querySelector('video.video-stream');
  });
</script>

<div class="content" class:hidden={!visible}>
  <ul class="list">
    {#await items}
      <li>Loading...</li>
    {:then list}
      {#each list as item}
        <li>
          <a href="#" on:click|preventDefault="{() => setTime(item.seconds)}">
            {getTime(item.seconds)}
          </a> - {item.text}
        </li>
      {/each}
    {:catch error}
      <li>Your princess is in another castle: {error.message}</li>
    {/await}
  </ul>
</div>

<style>
.hidden {
  display: none;
}

.content {
  list-style: none;
  padding-left: 10px;
}

.annotation {
  font-size: 24px;
}
</style>
