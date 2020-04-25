<script>
  import { onMount } from "svelte";

  export let visible;
  export let items;

  let video;

  function getTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - hours * 3600) / 60);
    seconds = seconds - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    let time = hours + ":" + minutes + ":" + seconds;
    return time;
  }

  function setTime(seconds) {
    if (video) {
      video.currentTime = seconds;
    }
  }

  onMount(() => {
    video = document.querySelector("video.video-stream");
  });
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

<div class="content" class:hidden={!visible}>
  <div class="list">
    {#await items}
      <div>Loading...</div>
    {:then list}
      {#if !list.length}
        <div>Nothing to show</div>
      {/if}
      {#each list as item}
        <div class="description">
          {item.text}
        </div>
        <div class="timecode">
          <a href="#" on:click|preventDefault={() => setTime(item.seconds)}>
            {getTime(item.seconds)}
          </a>
        </div>
      {/each}
    {:catch error}
      <div>Your princess is in another castle: {error.message}</div>
    {/await}
  </div>
</div>
