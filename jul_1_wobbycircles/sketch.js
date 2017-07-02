var MAX_CIRCLES = 20,
    MAX_RADIUS = 150,
    MIN_RADIUS = 50,
    MAX_RADIUS_DECREASE = 30;

var currentX, currentY,
    currentRadius;

function setup() {
  createCanvas(640, 480);
  background(0);
  //set up inital values for circle drawing ...
  //currentX = random(0, width);
  //currentY = random(0, height);
}

function mousePressed() {
  currentRadius = random(MIN_RADIUS, MAX_RADIUS);
  while(currentRadius > 0) {
    wobblyCircle(mouseX, mouseY, currentRadius, 10);
    currentRadius -= random(0, MAX_RADIUS_DECREASE);
  }
}


function wobblyCircle(x, y, radius, granularity) {
  var firstX, firstY, lastX, lastY, randVal = 10;
  stroke(255);
  fill(0);
  beginShape();
  for(var theta = 0; theta < 360 - granularity; theta += granularity) {
    var noise = random(randVal) / 2;
    if(theta < 180) {
      randVal += 0.1;
    } else {
      randVal -= 0.1;
    }
    console.log(noise);
    var cX = sin(radians(theta)) * (radius + noise);
    var cY = cos(radians(theta)) * (radius + noise);
    if(!firstX || !firstY) {
      firstX = cX; firstY = cY;
    }
    vertex(cX + x, cY + y);
    lastX = cX;
    lastY = cY;
  }
  vertex(firstX + x, firstY + y); 
  endShape();
}

