function deleteCookies (isBlocked) {
  if (isBlocked) {
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
  chrome.tabs.query({ active: true }, function (tabs) {
    currentTab = tabs[0]
    
    if (urlRegex.test(currentTab.url)) {
      chrome.storage.local.clear(function() {
        chrome.storage.sync.clear(function() {
          sendMessage('checkBlocked', deleteCookies)
          sendMessage('removeAds', noop)
        })
      })      
    }
  })
}, {url: [{urlMatches : 'https://www.ara.cat/'}]});