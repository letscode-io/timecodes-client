<script>
  import { createEventDispatcher } from 'svelte';
  import { onMount } from "svelte";

  let secondsInit = 0;
  let text = '';

  $: seconds = getTime(secondsInit);

  let video;

  const dispatch = createEventDispatcher();

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

  function sendForm() {
    dispatch('submitForm', {
      seconds,
      text
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
  <input name="text" bind:value={text} placeholder="Your comment goes here" />
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
