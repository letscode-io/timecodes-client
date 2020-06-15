<script>
  import { onMount } from "svelte";

  const LOGGED_IN_KEY = "loggedIn";
  const GOOGLE_REVOKE_TOKEN_URL = "https://accounts.google.com/o/oauth2/revoke";

  let accessToken = "";
  let loggedIn = false;
  let getAuthTokenPromise;

  function handleLogin(e) {
    getAuthTokenPromise = getAuthToken();
  }

  const handleRevoke = async function revokeToken() {
    await fetch(`${GOOGLE_REVOKE_TOKEN_URL}?token=${accessToken}`);
    await removeCachedAuthToken();
    await unserLoggedIn();
  };

  function removeCachedAuthToken() {
    return new Promise(function(resolve) {
      chrome.identity.removeCachedAuthToken({ token: accessToken }, function() {
        loggedIn = false;

        resolve(false);
      });
    });
  }

  function unserLoggedIn() {
    return new Promise(function(resolve) {
      chrome.storage.local.remove([LOGGED_IN_KEY], function() {
        console.log("User has been logged out.");

        resolve(false);
      });
    });
  }

  function getAuthToken() {
    return new Promise(function(resolve) {
      chrome.identity.getAuthToken({ interactive: !loggedIn }, function(token) {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError.message);

          loggedIn = false;
          resolve(loggedIn);
          return;
        }

        loggedIn = !!token;

        accessToken = token;

        chrome.storage.local.set({ [LOGGED_IN_KEY]: loggedIn }, function() {
          resolve(loggedIn);
        });
      });
    });
  }

  onMount(() => {
    chrome.storage.local.get([LOGGED_IN_KEY], function(result) {
      loggedIn = result.loggedIn || loggedIn;

      // Run non-interactive login for previosly logged in user
      if (loggedIn) {
        getAuthTokenPromise = getAuthToken();
      }
    });
  });
</script>

<style>
  .popup {
    min-width: 12rem;
    min-height: 7rem;
  }
</style>

<div class="popup bg-gray-200">
  <div class="flex h-screen">
    <div class="m-auto">
      {#if loggedIn}
        <div>
          <p class="text-center text-base mb-2">You're logged in.</p>
          <div class="flex justify-center">
            <button
              on:click|preventDefault={handleRevoke}
              class="default-button">
              Log out
            </button>
          </div>
        </div>
      {:else}
        {#await getAuthTokenPromise}
          <p class="text-center text-base">Logging in...</p>
        {:then result}
          <div class="flex justify-center">
            <button
              on:click|preventDefault={handleLogin}
              class="default-button ">
              Login
            </button>
          </div>
        {/await}
      {/if}
    </div>
  </div>
</div>
