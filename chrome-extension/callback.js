Event.addListener(callback)
let callback = function(onCompleted) {
  if response.status = 200 good
  if response.status = 400 not good
  if response.status = 500 not good
};

chrome.webRequest.onBeforeRequest.addListener(
       callback, filter, opt_extraInfoSpec);
