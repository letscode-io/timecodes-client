<script>
  export let isDisabled = false;
  export let onClick = false;
</script>

<style>
  .default-button {
    @apply bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow;
  }

  .default-button:hover {
    @apply bg-gray-100;
  }
</style>

<button
  disabled={isDisabled}
  on:click|preventDefault={onClick}
  class="default-button">
  <slot />
</button>
