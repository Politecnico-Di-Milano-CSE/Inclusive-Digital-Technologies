let blinking = 0;

var sketch = function (p) {
  let counter = 2000;
  let startup = 1;
  let upper_control = 50;
  let below_control = 50;
  let start;

  p.setup = function () {
    let canvas = p.createCanvas(200, 100);
    canvas.parent("sketch1")
    p.eyes = [];
    p.eyes.push(new p.Eye(100, 50, 100, p.width / 5));
  };

  p.draw = function () {

    p.eyes.forEach((eye) => {
      eye.updateFocus()
      eye.eyeTrack();
      eye.show();
    });
    
  };

  p.Eye = class {
    constructor(x, y, eyeSize, pSize) {
      this.x = x;
      this.y = y;
      this.eyeSize = eyeSize;
      this.pSize = pSize;

      this.target_x = 400;
      this.target_y = 800;

      this.current_x_pos = 0;
      this.current_y_pos = 0;

      this.pX = 100;
      this.pY = 50;
    }

    show() {
      p.fill(255);
      p.strokeWeight(6);

      p.curve(-10, 420, 0, this.y, p.width, this.y, p.width + 10, 420);
      p.curve(-10, -320, 0, this.y, p.width, this.y, p.width + 10, -320);

      p.fill(0);
      p.circle(this.pX, this.pY, this.pSize);
    }

    eyeTrack() {
      console.log("Eye Location is: " + tail_x + ", " + tail_y + "      Pupil location is: " + this.pX + ", " + this.pY + "      Want to go to location: " + this.target_x + ", " + this.target_y);

      let radius = 20;
      let angle = Math.atan2(this.target_y - tail_y, this.target_x - tail_x);
      
      this.pX = 100 + radius * Math.cos(angle);
      this.pY = 50 + radius * Math.sin(angle);
  }
  
    updateFocus(){
      this.target_x = focus_x;
      this.target_y = focus_y;
    }
  };
};

var myp5 = new p5(sketch);

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

  } else {
      console.log("No element is currently focused.");
  }
}


let focus_x = 0;
let focus_y = 0;

getFocusCoordinates();

document.addEventListener('focusin', function() {
  getFocusCoordinates();
});
