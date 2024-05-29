document.addEventListener('DOMContentLoaded', () => {
  const scaleInput = document.getElementById("arrow-size");
  const colorInput = document.getElementById("arrow-color");

  // Load saved settings
  chrome.storage.sync.get(['scale', 'color'], (result) => {
    scaleInput.value = result.scale || 1;
    colorInput.value = result.color || "#000000";
  });

  // Inject p5.js and content.js if not already injected
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["p5.js"]
    }, () => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content.js"]
      }, () => {
        // Send messages to content script after it has been injected
        chrome.tabs.sendMessage(tabs[0].id, { action: "updateSize", size: scaleInput.value });
        chrome.tabs.sendMessage(tabs[0].id, { action: "updateColor", color: colorInput.value });
      });
    });
  });
});

document.getElementById("arrow-size").addEventListener("input", function () {
  const size = this.value;
  console.log(size);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "updateSize", size: size });
  });
  chrome.storage.sync.set({ scale: size }, () => {
    console.log('Settings saved');
  });
});

document.getElementById("arrow-color").addEventListener("input", function () {
  const color = this.value;
  console.log(color);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "updateColor", color: color });
  });
  chrome.storage.sync.set({ color: color }, () => {
    console.log('Settings saved');
  });
});
