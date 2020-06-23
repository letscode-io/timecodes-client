<script>
  import "../../Tailwind.svelte";

  import Header from "./Header.svelte";
  import List from "./List.svelte";
  import { fetch } from "../helpers/fetch";
  import { accessToken, isLoggedIn, videoId } from "../stores";

  let visible = false;

  function handleClick(e) {
    e.preventDefault();
    visible = !visible;
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  let fetchTimeCodes = async function(id) {
    if ($isLoggedIn === null) {
      await sleep(20);
    }

    const path =
      $isLoggedIn === true ? `/auth/timecodes/${id}` : `/timecodes/${id}`;
    const options = $isLoggedIn === true ? { accessToken: $accessToken } : {};

    return await fetch.get(path, undefined, options);
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

    @apply text-2xl;
  }
</style>

<div class="timecodes">
  <Header
    on:click={handleClick}
    on:submitForm={handleSubmit}
    isLoggedIn={$isLoggedIn} />
  <List {visible} {items} isLoggedIn={$isLoggedIn} />
</div>
