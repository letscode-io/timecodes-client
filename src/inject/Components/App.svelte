<script>
  import { onMount } from "svelte";
  import Header from "./Header.svelte";
  import List from "./List.svelte";
  import { fetch } from "../helpers/fetch";
  import { videoId } from "../stores";

  let visible = false;
  let accessToken = "";

  function handleClick(e) {
    e.preventDefault();
    visible = !visible;
  }

  let fetchTimeCodes = async function(id) {
    return await fetch.get(`/timecodes/${id}`);
  };

  $: items = fetchTimeCodes($videoId);
  $: chrome.runtime.sendMessage({ messageType: "accessTokenRequest" }, function(
    response
  ) {
    accessToken = response.accessToken;
  });

  function handleSubmit(event) {
    fetch
      .post(
        "/auth/timecodes",
        { videoId: $videoId, ...event.detail },
        { accessToken: accessToken }
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

<div class="timecodes">
  <Header
    on:click={handleClick}
    on:submitForm={handleSubmit}
    hasAccessToken={!!accessToken} />
  <List {visible} {items} />
</div>
