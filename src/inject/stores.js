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
  return window.location.href.match(/v\=(.+)$/)[1];
}
