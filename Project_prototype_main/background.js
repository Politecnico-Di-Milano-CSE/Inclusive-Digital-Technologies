
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ scale: 1, color: "#C83C14"}, () => {
    console.log("Default scale set to 1.");
  });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["p5.js", "content.js",],
  });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Hello!");

  if (message.action === "updateArrow") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }
});
