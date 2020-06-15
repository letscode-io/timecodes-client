// import "../app.pcss";
import App from "./Components/App.svelte";

chrome.extension.sendMessage({}, function () {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      var ticketShelf = document.getElementById("ticket-shelf");

      if (ticketShelf) {
        clearInterval(readyStateCheckInterval);

        var timecodesContainer = document.createElement("div");
        timecodesContainer.id = "timecodes";

        var primaryInner = document.getElementById("primary-inner");
        var ticketShelf = document.getElementById("ticket-shelf");

        primaryInner.insertBefore(timecodesContainer, ticketShelf);

        new App({ target: timecodesContainer });
      }
    }
  }, 10);
});
