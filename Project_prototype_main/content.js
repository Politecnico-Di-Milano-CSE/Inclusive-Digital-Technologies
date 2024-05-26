// Create the div element and set its ID
const tailDiv = document.createElement("div");
tailDiv.class = "child";
tailDiv.id = "tailDiv";
document.body.appendChild(tailDiv);

// Change some of its settings
const tail = document.getElementById("tailDiv");
let tail_x = 0;
let tail_y = 0;
tail.style.position = "fixed";
tail.style.width = "10px";
tail.style.height = "10px";
tail.style.pointerEvents = "none";
tail.style.zIndex = 999;

// Update tail position on mousemove event
document.addEventListener("mousemove", function (event) {
  // Set tail position to mouse coordinates
  tail_x = event.pageX;
  tail_y = event.pageY - window.scrollY;
  tail.style.left = tail_x - 400 + "px";
  tail.style.top = tail_y - 400 + "px";
});

// Getting focus coordinates
let focus_x = 0;
let focus_y = 0;
function getFocusCoordinates() {
  // Get the currently focused element
  var focusedElement = document.activeElement;

  // Check if there's a focused element
  if (focusedElement) {
    var rect = focusedElement.getBoundingClientRect();

    var x = rect.left + window.scrollX + rect.width / 2;
    var y = rect.top + window.scrollY + rect.height / 2;

    focus_x = x;
    focus_y = y - window.scrollY;
  }
}

getFocusCoordinates();

// Get new focus when focus changes
document.addEventListener("focusin", function () {
  getFocusCoordinates();
});

document.addEventListener("scroll", function () {
  getFocusCoordinates();
});

/* I don't think this works very well since when you click,
     the focus changes to where you clicked, essentially making it more difficult
     to make out where the screenreader is reading. We could discuss
     this later.
  // Update focus coordinates on click as well
  document.addEventListener("click", function () {
    getFocusCoordinates();
  });
*/

// Main code controlling arrow
let arrow_show = true;
let arrow_color = "#C83C14";
let arrow_scale = 1.0;

var sketch = function (p) {
  let arrow;
  p.setup = function () {
    let canvas = p.createCanvas(800, 800);
    canvas.parent("tailDiv");
    arrow = new p.Arrow();
    p.angleMode(p.RADIANS);
  };

  p.draw = function () {
    p.clear();
    if (arrow_show) {
      arrow.updateFocus();
      arrow.eyeTrack();
      arrow.show();
    }
  };

  p.Arrow = class {
    constructor() {
      this.target_x = 400;
      this.target_y = 800;
      this.angle = 0;
    }

    show() {
      p.rectMode(p.CENTER);
      p.translate(p.width / 2, p.height / 2);
      p.scale(arrow_scale);
      p.rotate(this.angle + p.PI / 2);
      p.fill(p.color(arrow_color));
      p.noStroke();
      p.rect(0, 0, 7, 80);
      p.triangle(-10, -40, 0, -60, 10, -40);
    }

    eyeTrack() {
      this.angle = Math.atan2(this.target_y - tail_y, this.target_x - tail_x);
    }

    updateFocus() {
      this.target_x = focus_x;
      this.target_y = focus_y;
    }
  };
};

let myp5 = new p5(sketch);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateSize") {
    arrow_scale = 1 + (message.size - 1) * 0.0303;
  } else if (message.action === "updateColor") {
    // Update the arrow color
    arrow_color = message.color;
  } else if (message.action === "showArrow") {
    arrow_show = message.setting;
  }
});
