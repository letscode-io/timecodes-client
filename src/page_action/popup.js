chrome.storage.local.get(["accessToken"], function (result) {
  if (result.accessToken) {
    document.getElementById("auth").innerText = "Logged";
    document.getElementById("auth").style.background = "green";
  } else {
    document.getElementById("auth").addEventListener("click", function () {
      chrome.identity.getAuthToken({ interactive: true }, function (token) {
        chrome.storage.local.set({ accessToken: token }, function () {
          console.log("accessToken has been set");
        });
      });
    });
  }
});
