<script>
  import Header from './Header.svelte';
  import List from './List.svelte';

  let visible = false;
  const HOST = 'https://cab71680.ngrok.io';

  function getYouTubeId() {
    return window.location.href.match(/v\=(.+)$/)[1];
  }

  function handleClick(e) {
    e.preventDefault();
    visible = !visible;
  }

  let fetchAnnotations = async function(id) {
    const response = await fetch(HOST + '/annotations/' + id);
    return response.json();
  }

  let items = fetchAnnotations(getYouTubeId());

  function handleSubmit(event) {
    fetch(HOST + "/annotations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...event.detail,
        videoId: getYouTubeId()
      })
    }).then((response) => {
      items = fetchAnnotations(getYouTubeId());
    });
  }
</script>

<div class="timecodes">
  <Header on:click={handleClick} />
  <List visible={visible} items={items} />
</div>

<style>
  .timecodes {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 20px;
    margin-bottom: 14px;
  }
</style>
