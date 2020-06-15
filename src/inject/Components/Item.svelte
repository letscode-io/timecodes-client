<script>
  import { humanizeTime } from "../helpers/humanizeTime";
  import { accessToken, video } from "../stores";
  import { fetch } from "../helpers/fetch";

  export let isLoggedIn;
  export let item;

  let videoElement;
  let likeDisabled = false;
  let localItem = item;

  video.subscribe(newVideo => (videoElement = newVideo));

  function setTime(seconds) {
    videoElement.currentTime = seconds;
  }

  async function handleLike(item) {
    likeDisabled = true;
    let addon;
    let method;

    if (item.likedByMe) {
      addon = -1;
      method = "delete";
    } else {
      addon = 1;
      method = "post";
    }

    await fetch[method](
      "/auth/timecode_likes",
      { timecodeId: item.id },
      { accessToken: $accessToken }
    );

    localItem = {
      ...item,
      likesCount: item.likesCount + addon,
      likedByMe: !item.likedByMe
    };

    likeDisabled = false;
  }
</script>

<style>
  .timecode a {
    color: rgb(6, 95, 212);
  }
</style>

<div class="description truncate py-2 col-span-2">{localItem.description}</div>
<div class="timecode text-center py-2 col-span-1">
  <a href="#" on:click|preventDefault={() => setTime(localItem.seconds)}>
    {humanizeTime(localItem.seconds)}
  </a>
</div>
{#if isLoggedIn}
  <div class="col-span-1 col-end-6">
    <button
      disabled={likeDisabled}
      on:click|preventDefault={() => handleLike(localItem)}
      class="default-button">
      <div class="flex">
        <div class="px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            width="18px"
            height="18px">
            <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
            <path
              d="M21 8h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59
              7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5
              1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2zm0
              4l-3 7H9V9l4.34-4.34L12.23 10H21v2zM1 9h4v12H1z" />
          </svg>
        </div>
        <div>{localItem.likesCount}</div>
      </div>
    </button>
  </div>
{/if}

