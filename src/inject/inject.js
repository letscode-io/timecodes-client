var icon = `
<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false">
  <g class="style-scope yt-icon">
    <path d="M3.67 8.67h14V11h-14V8.67zm0-4.67h14v2.33h-14V4zm0 9.33H13v2.34H3.67v-2.34zm11.66 0v7l5.84-3.5-5.84-3.5z"></path>
  </g>
</svg>
`;

chrome.extension.sendMessage({}, function() {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      var annotator = document.createElement('div');
      annotator.className = 'youanno';
      annotator.id = 'youanno';

      var videoLink = `${location.pathname}${location.search}`
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
          <ul>
            <li>
              <a href="${videoLink}&t=65s" data-skip="65">1:05</a> - Start
            </li>
            <li>
              <a href="${videoLink}&t=65s" data-skip="165">1:05</a> - Middle
            </li>
            <li>
              <a href="${videoLink}&t=65s" data-skip="265">1:05</a> - Wow
            </li>
            <li>
              <a href="${videoLink}&t=65s" data-skip="365">1:05</a> - End
            </li>
          </ul>
        </div>
      `;

      var video = document.querySelector('video.video-stream');

      annotator.addEventListener('click', function(e) {
        e.preventDefault();

        if (e.target.tagName == 'A') {
          video.currentTime = e.target.dataset.skip;
        }
      });

      annotator.querySelector('.youanno-button').addEventListener('click', function(e) {
        e.preventDefault();

        var content = annotator.querySelector('.youanno-content');
        content.classList.toggle('youanno-hidden');
      });

      var primaryInner = document.getElementById('primary-inner');
      var ticketShelf = document.getElementById('ticket-shelf');

      primaryInner.insertBefore(annotator, ticketShelf);
    }
  }, 10);
});
