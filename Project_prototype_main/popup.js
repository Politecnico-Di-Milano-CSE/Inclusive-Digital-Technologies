document.addEventListener('DOMContentLoaded', () => {
  const scaleInput = document.getElementById("arrow-size");
  const colorInput = document.getElementById("arrow-color");

  // Load saved settings
  chrome.storage.sync.get(['scale', 'color'], (result) => {
    scaleInput.value = result.scale;
    colorInput.value = result.color;
  });

  /*
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "updateSize", size: scaleInput.value });
  });
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "updateColor",
      color: colorInput.value,
    });
  });
  */
});
/*
document.getElementById("arrow-show").addEventListener("input", function () {
  if(this.innerHTML === "TURN ON"){
    this.innerHTML = "TURN OFF";
    let arrow_show = true;
  }else{
    this.innerHTML = "TURN ON";
    let arrow_show = false;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "showArrow", setting: arrow_show });
  });
});
*/



document.getElementById("arrow-size").addEventListener("input", function () {
  const size = this.value;
  console.log(size);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "updateSize", size: size });
  });
  chrome.storage.sync.set({ scale: size}, () => {
    console.log('Settings saved');
  });
});

document.getElementById("arrow-color").addEventListener("input", function () {
  const color = this.value;
  console.log(color);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "updateColor",
      color: color,
    });
  });
  chrome.storage.sync.set({ color: color}, () => {
    console.log('Settings saved');
  });
});

