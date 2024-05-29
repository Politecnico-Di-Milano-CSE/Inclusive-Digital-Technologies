function setSize(scale) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "updateSize", scale: scale });
  });
  chrome.storage.sync.set({ scale: scale }, () => {
    console.log('Size settings saved');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const scale_small = document.getElementById("small-size");
  const scale_medium = document.getElementById("medium-size");
  const scale_big = document.getElementById("big-size");
  const colorInput = document.getElementById("arrow-color");

  // Load saved settings
  chrome.storage.sync.get(['scale', 'color'], (result) => {
    if(result.scale === "small"){
      scale_small.checked = true;
    }

    if(result.scale === "medium"){
      scale_medium.checked = true;
    }

    if(result.scale === "big"){
      scale_big.checked = true;
    }
    colorInput.value = result.color || "#000000";
  });
  
  document.querySelectorAll('input[name="arrow-size"]').forEach(radio => {
    radio.addEventListener('change', (event) => {
      setSize(event.target.value);
    });
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
        chrome.tabs.sendMessage(tabs[0].id, { action: "updateColor", color: colorInput.value });
      });
    });
  });

  document.getElementById("close_extension").addEventListener("click", () => {
    window.close();
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
