<script>
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  import { humanizeTime } from '../helpers/humanizeTime';

  let secondsInit = 0;
  let description = '';

  $: seconds = humanizeTime(secondsInit);

  let video;

  const dispatch = createEventDispatcher();

  function sendForm() {
    dispatch('submitForm', {
      seconds,
      description
    });

    seconds = '';
    text = '';
  }

  onMount(() => {
    video = document.querySelector("video.video-stream");
    secondsInit = Math.ceil(video.currentTime);
    video.addEventListener('timeupdate', function(e) {
      secondsInit = Math.ceil(e.target.currentTime);
    })
  });
</script>

<form class="youanno-form" on:submit|preventDefault={sendForm}>
  <input name="seconds" bind:value={seconds} readonly placeholder="13:37" class="time" />
  <input name="description" bind:value={description} placeholder="Your comment goes here" />
  <button type="submit" class="youanno-submit">Submit</button>
</form>

<style>
  .time {
    width: 65px;
  }

  input {
    border: 1px solid #ccc;
    border-radius: 2px;
    box-shadow: inset 0 1px 2px #eee;
    padding: 3px 7px 3px 12px;
    font-size: 14px;
  }

  input:focus {
    border: 1px solid #1c62b9;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
    outline: none;
  }

  button {
    padding: 1px 7px 2px;
    border: 1px solid #d3d3d3;
    background-color: #f8f8f8;
    border-radius: 2px;
  }

  button:hover {
    border-color: #c6c6c6;
    background-color: #f0f0f0;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  }

  button:focus {
    background-color: #e9e9e9;
  }
</style>
