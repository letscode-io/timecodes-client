chrome.extension.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  chrome.pageAction.show(sender.tab.id);

  switch (request.messageType) {
    case "accessTokenRequest":
      chrome.identity.getAuthToken({ interactive: false }, function (token) {
        chrome.storage.local.set({ ["loggedIn"]: true }, function () {
          console.log("User has logged in.");
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
