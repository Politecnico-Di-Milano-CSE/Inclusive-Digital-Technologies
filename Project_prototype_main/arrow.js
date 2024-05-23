// Get the tail element
console.log("success!!  ;)")

const arrowDiv = document.createElement("div");
arrowDiv.id = "arrowDiv";
document.body.appendChild(arrowDiv);

var tail = document.getElementById("arrowDiv");
let tail_x = 0;
let tail_y = 0;
// Update tail position on mousemove event
document.addEventListener("mousemove", function (event) {
  // Set tail position to mouse coordinates
  tail_x = event.pageX;
  tail_y = event.pageY;
  tail.style.left = tail_x - 100 + "px";
  tail.style.top = tail_y - 100 + "px";
});

// Getting focus coordinates
function getFocusCoordinates() {
  // Get the currently focused element
  var focusedElement = document.activeElement;

  // Check if there's a focused element
  if (focusedElement) {
    var rect = focusedElement.getBoundingClientRect();

    var x = rect.left + window.scrollX + rect.width / 2;
    var y = rect.top + window.scrollY + rect.height / 2;

    focus_x = x;
    focus_y = y;
  }
}

let focus_x = 0;
let focus_y = 0;

getFocusCoordinates();

document.addEventListener("focusin", function () {
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
var sketch = function (p) {
  let arrow_color = p.color(200, 60, 20);

  p.setup = function () {
    let canvas = p.createCanvas(200, 200);
    canvas.parent("sketch");
    let arrow = new p.Arrow();
    p.angleMode(p.RADIANS);
  };

  p.draw = function () {
    p.clear();

    arrow.updateFocus();
    arrow.eyeTrack();
    arrow.show();
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
      p.fill(arrow_color);
      p.rotate(this.angle + p.PI / 2);
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

// Make sure p5.js is loaded before executing sketch
document.addEventListener("DOMContentLoaded", function () {
  var myp5 = new p5(sketch);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateSize") {
      // Update the arrow size
      document.getElementById("custom-div").style.fontSize = message.size + "px";
    } else if (message.action === "updateColor") {
      // Update the arrow color
      document.getElementById("custom-div").style.color = message.color;
    }
  });
  