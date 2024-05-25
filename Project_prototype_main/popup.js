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

document.getElementById("arrow-size").addEventListener("input", function () {
  const size = this.value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "updateSize", size: size });
  });
});

document.getElementById("arrow-color").addEventListener("input", function () {
  const color = this.value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "updateColor",
      color: color,
    });
  });
});
