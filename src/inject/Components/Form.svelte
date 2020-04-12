<script>
  import { createEventDispatcher } from 'svelte';

  let seconds = '';
  let text = '';

  const dispatch = createEventDispatcher();

  function sendForm() {
    dispatch('submitForm', {
      seconds,
      text
    });

    seconds = '';
    text = '';
  }
</script>

<form class="youanno-form" on:submit|preventDefault={sendForm}>
  <input name="seconds" bind:value={seconds} type="number" placeholder="13:37" />
  <input name="text" bind:value={text} placeholder="Your comment goes here" />
  <button type="submit" class="youanno-submit">Submit</button>
</form>
