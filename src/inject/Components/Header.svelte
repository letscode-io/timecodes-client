<script>
  import Form from "./Form.svelte";
  import { fade } from "svelte/transition";

  let showForm = false;

  export let isLoggedIn;
</script>

<style>
  .timecodes-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }

  .timecodes-button-text {
    color: rgb(96, 96, 96);
    cursor: pointer;
    display: inline-block;
    font-family: Roboto, Arial, sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.007px;
    overflow-x: hidden;
    overflow-y: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
    vertical-align: middle;
  }
</style>

<div class="flex">
  <div class="w-1/3">
    <a href="#" class="timecodes-button" on:click>
      <span class="timecodes-icon">
        <svg
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
          focusable="false">
          <g class="style-scope yt-icon">
            <path
              d="M3.67 8.67h14V11h-14V8.67zm0-4.67h14v2.33h-14V4zm0
              9.33H13v2.34H3.67v-2.34zm11.66 0v7l5.84-3.5-5.84-3.5z" />
          </g>
        </svg>
      </span>
      <span class="timecodes-button-text">TimeCodes</span>
    </a>
  </div>
  {#if isLoggedIn}
    <div class="flex justify-end w-3/4">
      <div class="flex-1">
        {#if showForm}
          <div transition:fade>
            <Form on:submitForm />
          </div>
        {/if}
      </div>

      <div>
        <button
          class="bg-transparent hover:bg-red-500 text-red-700
          hover:text-white py-2 px-4 border border-red-500
          hover:border-transparent rounded"
          on:click={() => (showForm = !showForm)}>
          {#if showForm}Hide{:else}Add timecode{/if}
        </button>
      </div>
    </div>
  {:else}
    <div class="w-1/2">Login to leave your own timecode.</div>
  {/if}
</div>
