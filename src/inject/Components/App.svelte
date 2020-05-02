<script>
  import Header from "./Header.svelte";
  import List from "./List.svelte";
  import { fetch } from "../helpers/fetch";
  import { videoId } from '../stores';

  let visible = false;
  const HOST = process.env.APP_HOST;
  const TIMECODES_PATH = "timecodes";

  function handleClick(e) {
    e.preventDefault();
    visible = !visible;
  }

  let fetchTimeCodes = async function(id) {
    const url = [HOST, TIMECODES_PATH, id].join("/");
    return await fetch.get(url);
  };

  $: items = fetchTimeCodes($videoId);

  function handleSubmit(event) {
    const url = [HOST, TIMECODES_PATH].join("/");

    fetch.post(url, {
      ...event.detail,
      videoId: $videoId
    }).then(response => {
      items = fetchTimeCodes($videoId);
    });
  }
</script>

<div class="timecodes">
  <Header on:click={handleClick} on:submitForm={handleSubmit} />
  <List visible={visible} items={items} />
</div>

<style>
  .timecodes {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 20px;
    margin-bottom: 14px;
  }
</style>
