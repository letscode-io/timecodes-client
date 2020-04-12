import App from './Components/App.svelte';

chrome.extension.sendMessage({}, function () {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      var ticketShelf = document.getElementById("ticket-shelf");

      if (ticketShelf) {
        clearInterval(readyStateCheckInterval);

        var annotator = document.createElement("div");
        annotator.id = "youanno";

        var primaryInner = document.getElementById("primary-inner");
        var ticketShelf = document.getElementById("ticket-shelf");

        primaryInner.insertBefore(annotator, ticketShelf);

        new App({ target: annotator });
      }
    }
  }, 10);
});
