chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      var annotator = document.createElement('div');
      Object.assign(annotator.style, {
        background: 'red',
        height: '100px',
        padding: '15px 30px'
      });

      var videoLink = `${location.pathname}${location.search}`
      annotator.innerHTML = `
        <div>Annotations</div>
        <div>
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

      var primaryInner = document.getElementById('primary-inner');
      var ticketShelf = document.getElementById('ticket-shelf');

      primaryInner.insertBefore(annotator, ticketShelf);
    }
  }, 10);
});
