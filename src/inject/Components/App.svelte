<script>
  import { onMount } from "svelte";
  import Header from "./Header.svelte";
  import List from "./List.svelte";
  import { fetch } from "../helpers/fetch";
  import { accessToken, isLoggedIn, videoId } from "../stores";

  let visible = false;

  function handleClick(e) {
    e.preventDefault();
    visible = !visible;
  }

  let fetchTimeCodes = async function(id) {
    return await fetch.get(`/timecodes/${id}`);
  };

  $: items = fetchTimeCodes($videoId);

  function handleSubmit(event) {
    fetch
      .post(
        "/auth/timecodes",
        { videoId: $videoId, ...event.detail },
        { accessToken: $accessToken }
      )
      .then(response => {
        items = fetchTimeCodes($videoId);
      })
      .catch(error => {
        console.log(error);
      });
  }
</script>

<style>
  .timecodes {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 20px;
    margin-bottom: 14px;
  }
</style>

<div class="timecodes text-xl">
  <Header
    on:click={handleClick}
    on:submitForm={handleSubmit}
    isLoggedIn={$isLoggedIn} />
  <List {visible} {items} />
</div>
