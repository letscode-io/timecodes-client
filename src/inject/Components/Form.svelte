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

<form class="timecodes-form" on:submit|preventDefault={sendForm}>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-1/6 pr-2">
      <input
        name="seconds"
        bind:value={seconds}
        readonly
        placeholder="13:37"
        class="w-full text-center shadow appearance-none border rounded py-2
        px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div class="w-4/6 pr-2">
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3
        text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="description"
        bind:value={description}
        placeholder="Your comment goes here" />
    </div>
    <div class="w-1/6">
      <button
        class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
        type="submit">
        Submit
      </button>
    </div>
  </div>
</form>
