chrome.webRequest.onCompleted.addListener(
  function(details) {
    
    //https://developer.chrome.com/extensions/extension
    //https://developer.chrome.com/extensions/storage
    //https://developer.chrome.com/extensions/webRequest#event-onCompleted
    //https://developer.chrome.com/extensions/getstarted
    //https://developer.chrome.com/extensions/manifest
    
  });

chrome.webRequest.onCompleted.onErrorOccurred(
  function(details) {
    
  });

  document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
  
      chrome.tabs.getSelected(null, function(tab) {
        d = document;
  
        var f = d.createElement('form');
        f.action = 'http://gtmetrix.com/analyze.html?bm';
        f.method = 'post';
        var i = d.createElement('input');
        i.type = 'hidden';
        i.name = 'url';
        i.value = tab.url;
        f.appendChild(i);
        d.body.appendChild(f);
        f.submit();
      });
    }, false);
  }, false);
