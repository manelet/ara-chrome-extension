function remove(id) {
  var els = document.querySelectorAll(id)

  if (els.length) {
    for (var i = 0; i < els.length; i++) {
      els[i].remove()
    }
  }

  return els.length
}

function removeElements (elements) {
  var EMPTY = true

  for (var i = 0; i < elements.length; i++) {
    var length = remove(elements[i])

    if (length) {
      EMPTY = false
    }
  }

  var mce = document.getElementsByClassName('mce')  
  if (mce.length) {
    for (var i = 0; i < mce.length; i++) {
      mce[i].style.display = 'block'
    }
  }

  return EMPTY
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {  
  if (msg.text === 'checkBlocked') {
    var blockedDiv = document.getElementsByClassName('md-suscriptionV3')
    sendResponse(blockedDiv && blockedDiv.length)
  }

  if (msg.text === 'reload') {
    window.location.reload()
  }

  if (msg.text === 'removeAds') {
    var SECTION = window.location.pathname.split('/')[1].split('_')[0]
    var EMPTY_ITERATIONS = 0
    var MAX_EMPTY_ITERATIONS = 5
    var ELEMENTS = [
      '#hubspotcta_' + SECTION + '_sidebar_article',
      '#hubspotcta_' + SECTION + '_bottom_article',
      '#cboxOverlay',
      '#colorbox',
      '.sticker',
      '.md-ad-dfp',
      '.bbt-adv-container',
      '.ara-paywall-container',
      '.ara-paywall-msg-final-cnt'
    ]

    var timer = setInterval(function () {
      if (EMPTY_ITERATIONS >= MAX_EMPTY_ITERATIONS) {
        return clearInterval(timer)
      }
      
      var EMPTY = removeElements(ELEMENTS)

      if (EMPTY) {
        EMPTY_ITERATIONS++
      }
    }, 750)
  }

  return true
});