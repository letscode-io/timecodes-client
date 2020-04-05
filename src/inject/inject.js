var icon = `
<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false">
  <g class="style-scope yt-icon">
    <path d="M3.67 8.67h14V11h-14V8.67zm0-4.67h14v2.33h-14V4zm0 9.33H13v2.34H3.67v-2.34zm11.66 0v7l5.84-3.5-5.84-3.5z"></path>
  </g>
</svg>
`;

chrome.extension.sendMessage({}, function () {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      var annotator = document.createElement("div");
      annotator.className = "youanno";
      annotator.id = "youanno";

      var getAnno = fetch("https://78e0e858.ngrok.io/annotations/0zU3AaX6APo");

      var videoLink = `${location.pathname}${location.search}`;
      annotator.innerHTML = `
        <div>
          <a href="#" class="youanno-button">
            <span class="youanno-icon">
              ${icon}
            </span>
            <span class="youanno-button-text">
              YouAnno
            </span>
          </a>
        </div>
        <div class="youanno-content youanno-hidden">
          <ul class="youanno-list">
          </ul>
        </div>
        <div>
          <form class="youanno-form" action="">
            <input class="youanno-form-seconds" name="seconds" type="number" placeholder="Seconds" />
            <input class="youanno-form-text" name="text" placeholder="Text" />
            <button type="submit" class="youanno-submit">Submit</button>
          </form>
        </div>
      `;

      var updateAnnotations = function () {
        getAnno.then(
          (response) => {
            response.json().then((annotations) => {
              var html = annotations
                .map((ann) => {
                  var time = `${Math.floor(ann.seconds / 60)}:${
                    ann.seconds % 60
                  }`;

                  return `
                <li class="youanno-annotation">
                  <a href="${videoLink}" data-skip="${ann.seconds}">${time}</a> - ${ann.text}
                </li>
              `;
                })
                .join("");

              annotator.querySelector(".youanno-list").innerHTML = html;
            });
          },
          () => {
            annotator.querySelector(".youanno-list").innerHTML =
              "Ай ай ай!!!!!";
          }
        );
      };
      updateAnnotations();

      var video = document.querySelector("video.video-stream");

      annotator.addEventListener("click", function (e) {
        e.preventDefault();

        if (e.target.tagName == "A") {
          video.currentTime = e.target.dataset.skip;
        }
      });

      annotator
        .querySelector(".youanno-button")
        .addEventListener("click", function (e) {
          e.preventDefault();

          var content = annotator.querySelector(".youanno-content");
          content.classList.toggle("youanno-hidden");
        });

      document.addEventListener("click", function (e) {
        if (e.target.classList.contains("youanno-submit")) {
          e.preventDefault();
          console.log("YouAnno: ", e);
          var formTag = document.querySelector(".youanno-form");
          var form = {
            text: formTag.querySelector("[name=text]").value,
            seconds: formTag.querySelector("[name=seconds]").value,
          };

          fetch("https://78e0e858.ngrok.io/annotation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(form),
          }).then((response) => {
            formTag.reset();
            updateAnnotations();
          });
        }
      });

      var primaryInner = document.getElementById("primary-inner");
      var ticketShelf = document.getElementById("ticket-shelf");

      primaryInner.insertBefore(annotator, ticketShelf);
    }
  }, 10);
});
