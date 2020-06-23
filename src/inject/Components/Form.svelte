<script>
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import { humanizeTime } from "../helpers/humanizeTime";
  import { video } from "../stores";

  let secondsInit = 0;
  let description = "";

  $: seconds = humanizeTime(secondsInit);

  const dispatch = createEventDispatcher();

  function sendForm() {
    dispatch("submitForm", {
      seconds,
      description
    });

    seconds = "";
    description = "";
  }

  onMount(() => {
    secondsInit = Math.floor($video.currentTime);
    $video.addEventListener("timeupdate", function(e) {
      secondsInit = Math.floor(e.target.currentTime);
    });
  });
</script>

<style>
  .form-inner-wrapper {
    @apply flex flex-wrap -mx-3 mb-6;
  }

  .seconds-input-wrapper {
    @apply w-1/6 pr-2;
  }

  .seconds-input {
    @apply w-full text-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight;
  }

  .seconds-input:focus {
    @apply outline-none shadow-outline;
  }

  .description-input-wrapper {
    @apply w-4/6 pr-2;
  }

  .description-input {
    @apply shadow appearance-none border
      rounded w-full py-2 px-3 text-gray-700 leading-tight;
  }

  .description-input:focus {
    @apply outline-none shadow-outline;
  }

  .button-wrapper {
    @apply w-1/6;
  }

  .button {
    @apply bg-red-500 text-white py-2 px-4 rounded;
  }

  .button:hover {
    @apply bg-red-700;
  }
</style>

<form class="timecodes-form" on:submit|preventDefault={sendForm}>
  <div class="form-inner-wrapper">
    <div class="seconds-input-wrapper">
      <input
        name="seconds"
        bind:value={seconds}
        readonly
        placeholder="13:37"
        class="seconds-input" />
    </div>
    <div class="description-input-wrapper">
      <input
        class="description-input"
        name="description"
        bind:value={description}
        placeholder="Your comment goes here" />
    </div>
    <div class="button-wrapper">
      <button class="button" type="submit">Submit</button>
    </div>
  </div>
</form>
