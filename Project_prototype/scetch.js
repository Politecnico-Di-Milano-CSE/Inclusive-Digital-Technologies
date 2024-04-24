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
      console.log("Eye Location is: " + tail_x + ", " + tail_y + "      Pupil location is: " + this.pX + ", " + this.pY + "      Want to go to location: " + this.target_x + ", " + this.target_y)
      if (this.target_x == 0 && this.target_y == 0) {
        this.pX = 100;
        this.pY = 50;
      }

      // If the target is right on top of the eye
      if (p.dist(this.target_x, this.target_y, this.x, this.y) <= this.eyeSize / 4) {
        this.pX = this.target_x;
        this.pY = this.target_y;
      } else {

        if(this.target_x < tail_x + 50 && this.target_x - 50){
          this.pX = 100;
        } else{
          if (this.target_x < tail_x && this.pX < 125) {
            this.pX += 1;
          }
          if (this.target_x > tail_x && this.pX > 75) {
            this.pX -= 1;
          }
        }
        

        if(this.target_y > tail_y && this.pY < 75){
              this.pY += 1;
        }
        if(this.target_y < tail_y && this.pY > 40){
              this.pY -= 1;
        }
      } 

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
      // Get the position of the focused element relative to the viewport
      var rect = focusedElement.getBoundingClientRect();
      
      // Calculate x-y coordinates relative to the viewport
      var x = rect.left + window.scrollX;
      var y = rect.top + window.scrollY;

      focus_x = x;
      focus_y = y;

      // Print the coordinates
      console.log("X: " + x + ", Y: " + y);
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
