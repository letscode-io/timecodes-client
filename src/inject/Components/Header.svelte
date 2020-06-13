<script>
  import Form from "./Form.svelte";
  import { fade } from "svelte/transition";

  const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/></svg>`;

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
          class="bg-transparent hover:bg-red-500 text-red-700 hover:text-white
          py-2 px-4 border border-red-500 hover:border-transparent rounded"
          on:click={() => (showForm = !showForm)}>
          {#if showForm}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18"
              viewBox="0 0 24 24"
              width="18">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M10.02 6L8.61 7.41 13.19 12l-4.58 4.59L10.02 18l6-6-6-6z" />
            </svg>
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18"
              viewBox="0 0 24 24"
              width="18">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25
                0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02
                0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3
                17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
            </svg>
          {/if}
        </button>
      </div>
    </div>
  {:else}
    <div class="w-1/2">Login to leave your own timecode.</div>
  {/if}
</div>
