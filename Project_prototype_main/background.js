chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['scale', 'color'], (result) => {
    // Check if the settings are already stored
    if (result.scale === undefined || result.color === undefined) {
      // Only set defaults if the settings are not already set
      chrome.storage.sync.set({ 
        scale: result.scale !== undefined ? result.scale : "medium", 
        color: result.color !== undefined ? result.color : "#C83C14" 
      }, () => {
        console.log("Default settings applied.");
      });
    } else {
      console.log("Settings already exist.");
    }
  });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "updateArrow") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }
});
