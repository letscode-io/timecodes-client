<script>
  import { onMount } from "svelte";

  const ACCESS_TOKEN_KEY = "accessToken";
  const GOOGLE_REVOKE_TOKEN_URL = "https://accounts.google.com/o/oauth2/revoke";

  let accessToken = "";
  let getAuthTokenPromise;

  function handleLogin(e) {
    getAuthTokenPromise = getAuthToken();
  }

  const handleRevoke = async function revokeToken() {
    await fetch(`${GOOGLE_REVOKE_TOKEN_URL}?token=${accessToken}`);
    await removeCachedAuthToken();
    await removeAccessTokenFromStorage();
  };

  function removeCachedAuthToken() {
    return new Promise(function(resolve) {
      chrome.identity.removeCachedAuthToken({ token: accessToken }, function() {
        accessToken = "";
        resolve(true);
      });
    });
  }

  function removeAccessTokenFromStorage(params) {
    return new Promise(function(resolve) {
      chrome.storage.local.remove([ACCESS_TOKEN_KEY], function() {
        console.log("accessToken removed from storage");
        resolve(true);
      });
    });
  }

  function getAuthToken() {
    return new Promise(function(resolve) {
      chrome.identity.getAuthToken({ interactive: true }, function(token) {
        chrome.storage.local.set({ [ACCESS_TOKEN_KEY]: token }, function() {
          accessToken = token;
          resolve(accessToken);
        });
      });
    });
  }

  onMount(() => {
    chrome.storage.local.get([ACCESS_TOKEN_KEY], function(result) {
      if (result.accessToken) {
        getAuthTokenPromise = getAuthToken();
      }
    });
  });
</script>

<div>
  {#if !accessToken}
    {#await getAuthTokenPromise}
      <p>logging...</p>
    {:then token}
      <button on:click|preventDefault={handleLogin} id="auth">Login</button>
    {/await}
  {/if}
  <button on:click|preventDefault={handleRevoke} id="auth">Revoke</button>
</div>
