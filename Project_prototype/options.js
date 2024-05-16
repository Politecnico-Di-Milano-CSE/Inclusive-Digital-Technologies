chrome.storage.sync.get(["arrowColor", "arrowSize"], function(data) {
    document.getElementById("color").value = data.arrowColor || "#ff0000";
    document.getElementById("size").value = data.arrowSize || 1;
});

document.getElementById("save-button").addEventListener("click", function() {
    var color = document.getElementById("color").value;
    var size = document.getElementById("size").value;
    console.log('hello!');
    chrome.storage.sync.set({ arrowColor: color, arrowSize: size }, function() {
        console.log("Options saved!");
    });
});