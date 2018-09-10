function deleteCookies (isBlocked) {
  if (isBlocked) {
    chrome.cookies.getAll({ domain: ".ara.cat" }, function (cookies) {
      for (var i = 0; i < cookies.length; i++) {
        chrome.cookies.remove({url: "https://" + cookies[i].domain  + cookies[i].path, name: cookies[i].name});
      }
      sendMessage('reload', noop)
    })
  }
}

function noop () {}

function sendMessage (msg, cb) {
  chrome.tabs.sendMessage(currentTab.id, { text: msg }, cb);
}

var currentTab;
var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?ara\.cat/;

chrome.webNavigation.onCompleted.addListener(function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    currentTab = tabs[0]
    if (urlRegex.test(currentTab.url)) {
      sendMessage('checkBlocked', deleteCookies)
      sendMessage('removeAds', noop)
    }
  })
}, {url: [{urlMatches : 'https://www.ara.cat/'}]});