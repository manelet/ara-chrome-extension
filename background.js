function deleteCookies (isBlocked) {
  if (isBlocked) {
<<<<<<< HEAD
    chrome.cookies.getAll({}, function (cookies) {      
      if (cookies.length) {
        for (var i = 0; i < cookies.length; i++) {
          var url = 'https://' + (cookies[i].domain.indexOf('www') === -1 ? 'www' + cookies[i].domain : cookies[i].domain)
          chrome.cookies.remove({url: url, name: cookies[i].name});
        }
        chrome.storage.local.clear(function () {
          chrome.storage.sync.clear(function () {
            sendMessage('reload', noop)
          })
        })
      }
=======
    chrome.cookies.getAll({ domain: ".ara.cat" }, function (cookies) {
      for (var i = 0; i < cookies.length; i++) {
        chrome.cookies.remove({url: "https://" + cookies[i].domain  + cookies[i].path, name: cookies[i].name});
      }
      sendMessage('reload', noop)
>>>>>>> 4cd35eec522a14607037f5ea842d77a5aa3eeb71
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
<<<<<<< HEAD
  chrome.tabs.query({ active: true }, function (tabs) {
    currentTab = tabs[0]
    
    if (urlRegex.test(currentTab.url)) {
      chrome.storage.local.clear(function() {
        chrome.storage.sync.clear(function() {
          sendMessage('checkBlocked', deleteCookies)
          sendMessage('removeAds', noop)
        })
      })      
=======
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    currentTab = tabs[0]
    if (urlRegex.test(currentTab.url)) {
      sendMessage('checkBlocked', deleteCookies)
      sendMessage('removeAds', noop)
>>>>>>> 4cd35eec522a14607037f5ea842d77a5aa3eeb71
    }
  })
}, {url: [{urlMatches : 'https://www.ara.cat/'}]});