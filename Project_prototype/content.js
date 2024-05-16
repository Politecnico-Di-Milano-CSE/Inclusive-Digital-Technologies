// Permitted website check
const allowedWebsites = ["http://localhost:8000/"];

// Code from arrow.js



var sketch = function (p) {
  let arrow_color = p.color(200, 60, 20);
    p.setup = function () {
      let canvas = p.createCanvas(200, 200);
      canvas.parent("sketch1")
      p.eyes = [];
      p.eyes.push(new p.Eye());
  
      p.angleMode(p.RADIANS);

      
    };
  
    p.draw = function () {
      p.clear();
      p.eyes.forEach((eye) => {
        eye.updateFocus()
        eye.eyeTrack();
        eye.show();
      });
      
    };
  
    p.Eye = class {
      constructor() {
        this.target_x = 400;
        this.target_y = 800;
        this.angle = 0;
      }
  
      show() {
        p.rectMode(p.CENTER);
        p.translate(p.width/2, p.height/2);
        p.fill(arrow_color);
        p.rotate(this.angle + p.PI/2);
        p.noStroke();
        
        p.rect(0,0,7,80);
        p.triangle(-10, -40, 0, -60, 10, -40);
      }
  
      eyeTrack() {
        //console.log("Eye Location is: " + tail_x + ", " + tail_y + "      Pupil location is: " + this.pX + ", " + this.pY + "      Want to go to location: " + this.target_x + ", " + this.target_y);
  
        this.angle = Math.atan2(this.target_y - tail_y, this.target_x - tail_x);
    }
    
      updateFocus(){
        this.target_x = focus_x;
        this.target_y = focus_y;
      }
    };
  };
  
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

  document.addEventListener('DOMContentLoaded', function() {
    var myp5 = new p5(sketch);
  
  });
  
  


// Function to update arrow color
function updateArrowColor(color) {
  console.log(color);
  document.getElementById("sketch1").contentDocument.querySelector(".eye").style.fill = color;
}

// Function to update arrow size
function updateArrowSize(size) {
  document.getElementById("sketch1").contentDocument.querySelector(".eye").style.transform = `scale(${size})`;
}
