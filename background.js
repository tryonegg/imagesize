chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
  var tabId = tab.tabId;
  chrome.tabs.executeScript(tabId, { file: "images.js" }, function(results) {

  });
});
