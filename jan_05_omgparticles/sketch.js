var particleArray = [];
var colorGens = { r: new colorGenerator(1), g: new colorGenerator(2), b: new colorGenerator(3)};

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);
  particleArray.forEach(function(p, i) {
    if(p.isAlive()) {
      p.draw();
    } else {
      particleArray.splice(i,1);
    }
  });
}

function colorGenerator(difference) {
  var currentVal = 0;
  var goingUp = true;
  this.nextVal = function() {
    if(goingUp) {
      currentVal += difference;
      if(currentVal >= 255) {
        currentVal = 255;
        goingUp = false;
      }
    } else if (!goingUp && currentVal > 0) {
      currentVal -= difference;
      if(currentVal <= 0) {
        currentVal = 0;
        goingUp = true;
      }
    }
    return currentVal;
  };
}

function mouseMoved() {
  if(mouseX > 0 &&
    mouseX < width &&
    mouseY > 0 &&
    mouseY < height) {
      particleArray.push(new particle(mouseX, mouseY,
      colorGens.r.nextVal(), colorGens.g.nextVal(), colorGens.b.nextVal()));
    }
}


function particle(x, y, r, g, b) {
  var radius = 0;
  var amIAlive = true;
  
  this.draw = function() {
    if(amIAlive) {
    noFill();
    strokeWeight(2);
    stroke(r, g, b, 255 - radius);
    ellipse(x, y, radius);
    radius += 2;
    if(radius >= 255) {
        amIAlive = false;
      }
    }
  };
  
  this.isAlive = function() {
    return amIAlive;
  };
}

function mousePressed() {
  console.log("Number of particles in array: " + particleArray.length);
}
