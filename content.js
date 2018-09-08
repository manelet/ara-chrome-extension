chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'checkBlocked') {
      var blockedDiv = document.getElementsByClassName('md-suscriptionV2')
      sendResponse(blockedDiv && blockedDiv.length)
    }

    if (msg.text === 'reload') {
      window.location.reload()
    }
});