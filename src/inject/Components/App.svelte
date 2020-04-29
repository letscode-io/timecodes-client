<script>
  import Header from "./Header.svelte";
  import List from "./List.svelte";

  let visible = false;
  const HOST = process.env.APP_HOST;
  const TIMECODES_PATH = "timecodes";

  function getYouTubeId() {
    return window.location.href.match(/v\=(.+)$/)[1];
  }

  function handleClick(e) {
    e.preventDefault();
    visible = !visible;
  }

  let fetchAnnotations = async function(id) {
    const url = [HOST, TIMECODES_PATH, id].join("/");
    const response = await fetch(url);
    return response.json();
  };

  let items = fetchAnnotations(getYouTubeId());

  function handleSubmit(event) {
    const url = [HOST, TIMECODES_PATH].join("/");

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...event.detail,
        videoId: getYouTubeId()
      })
    }).then(response => {
      items = fetchAnnotations(getYouTubeId());
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
