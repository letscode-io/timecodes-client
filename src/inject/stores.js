import { readable } from "svelte/store";

const videoElement = document.querySelector("video.video-stream");

export const video = readable(videoElement);

export const videoId = readable(getVideoId(), function (set) {
  const observer = new MutationObserver(function ([mutation]) {
    if (mutation.target.src) {
      set(getVideoId());
    }
  });

  observer.observe(videoElement, {
    attributeFilter: ["src"],
    attributeOldValue: true,
  });

  return observer.disconnect;
});

function getVideoId() {
  const id = window.location.href.match(/v\=(.+)$/);

  return (id && id[1]) || "";
}

export const isLoggedIn = readable(null, function start(set) {
  chrome.storage.local.get(["loggedIn"], function (result) {
    set(result.loggedIn);
  });

  const onChange = (changes) => {
    for (const key in changes) {
      if (key == "loggedIn") {
        set(changes.loggedIn.newValue);
      }
    }
  };

  chrome.storage.onChanged.addListener(onChange);

  return function stop() {
    chrome.storage.onChanged.removeListener(onChange);
  };
});

export const accessToken = readable(null, function start(set) {
  const sendMessage = () =>
    chrome.runtime.sendMessage({ messageType: "accessTokenRequest" }, function (
      response
    ) {
      set(response.accessToken);
    });

  sendMessage();

  const onChange = (changes) => {
    for (const key in changes) {
      if (key == "loggedIn") {
        sendMessage();
      }
    }
  };

  chrome.storage.onChanged.addListener(onChange);

  return function stop() {
    chrome.storage.onChanged.removeListener(onChange);
  };
});
