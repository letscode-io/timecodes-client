chrome.extension.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  chrome.pageAction.show(sender.tab.id);

  switch (request.messageType) {
    case "accessTokenRequest":
      chrome.identity.getAuthToken({ interactive: false }, function (token) {
        const loggedIn = !!token;

        chrome.storage.local.set({ ["loggedIn"]: loggedIn }, function () {
          console.log("loggedIn", loggedIn);
        });

        sendResponse({ accessToken: token });
      });

      break;
    default:
      sendResponse();
      break;
  }

  return true;
});
