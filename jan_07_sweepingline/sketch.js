var currentCol = {r: 255, rd : 1, g: 0, gd: 5, b: 255, bd: 2};
var pointA, pointB, pointAHeading, pointBHeading;
var SPEED = 5;
var lines = [];

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  pointA = createVector(random(0, width), random(0, height));
  pointAHeading = p5.Vector.fromAngle(radians(random(0, 360))).mult(SPEED);
  pointB = createVector(random(0, width), random(0, height));
  pointBHeading = p5.Vector.fromAngle(radians(random(0, 360))).mult(SPEED);
  background(0);
}

function draw() {
  background(0);
  updateColor();
  pointA.add(pointAHeading);
  pointB.add(pointBHeading);
  testPointCollision(pointA, pointAHeading);
  testPointCollision(pointB, pointBHeading);
  lines.push(new makeLine(pointA, pointB, currentCol.r, currentCol.g, currentCol.b));
  lines.forEach(function(e, i) {
    if(!e.canBeRemoved()) {
      e.draw();
    } else {
      lines.splice(i, 1);
    }
  });
}

function testPointCollision(p, heading) {
  if(p.x < 0 || p.x > width) {
    heading.x *= -1;
  }
  if(p.y < 0 || p.y > height) {
    heading.y *= -1;
  }
}

function updateColor() {
  if(currentCol.r <= 30 || currentCol.r >= 255) { currentCol.rd *= -1; }
  currentCol.r += currentCol.rd;
  if(currentCol.g <= 30 || currentCol.g >= 255) { currentCol.gd *= -1; }
  currentCol.g += currentCol.gd;
  if(currentCol.b <= 30 || currentCol.b >= 255) { currentCol.bd *= -1; }
  currentCol.b += currentCol.bd;
}

function makeLine(pointA, pointB, rc, gc, bc) {
  var a = pointA.copy();
  var b = pointB.copy();
  var ac = 255;
  var totallyTransparent = false;
  this.draw = function() {
    if(ac > 0) {
      stroke(rc, gc, bc, ac);
      line(a.x, a.y, b.x, b.y);
      ac -= 5;
    }
  }
  
  this.canBeRemoved = function() {
    if(ac < 0) { 
      return true;
    }
    return false;
  }
}