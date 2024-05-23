document.getElementById('arrow-size').addEventListener('input', function() {
    const size = this.value;
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'updateSize', size: size});
    });
  });
  
  document.getElementById('arrow-color').addEventListener('input', function() {
    const color = this.value;
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'updateColor', color: color});
    });
  });