// Runs in the background as a link between extension and site

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "updateArrow") {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message);
      });
    }
  });