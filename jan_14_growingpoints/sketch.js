var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var GRID_WIDTH = 50;
var GRID_HEIGHT = 50;
var GRID_MAXSIZE = 100;

var grid_circles;
var particles = [];

function setup() {
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    angleMode(DEGREES);
    grid_circles = new Array(SCREEN_WIDTH / GRID_WIDTH);
    for(var x = 0; x < SCREEN_WIDTH / GRID_WIDTH; x++) {
        grid_circles[x] = new Array(SCREEN_HEIGHT/GRID_HEIGHT);
        for(var y = 0; y < SCREEN_HEIGHT / GRID_HEIGHT; y++) {
          grid_circles[x][y] = new GridElement(x * GRID_WIDTH + (GRID_WIDTH/2), y * GRID_HEIGHT + (GRID_HEIGHT/2),
                  random(50, 255), random(50, 255), random(50, 255));
        }
    }
    for(var i = 0; i < 5; i++) {
      particles.push(new Particle(random(0, width), random(0, height), random(0, 360)));  
    }
}

function draw() {
  background(0);
  noFill();
  for(var x = 0; x < grid_circles.length; x++) {
    for(var y = 0; y < grid_circles[x].length; y++) {
      grid_circles[x][y].resize();
      grid_circles[x][y].draw();
    }
  }
  for(var i = 0; i < particles.length; i++) {
    particles[i].move();
  }
}

function GridElement(x, y, r, g, b) {
    var currentSize = 1;
    var direction = 1;

    this.resize = function() {
      var totalDistances = 0;
      var smallestDistance = 150;
      for(var i = 0; i < particles.length; i++) {
        var partPos = particles[i].getPos();
        var distance = int(dist(partPos.x, partPos.y, x, y));
        if(distance < smallestDistance) { smallestDistance = distance; }
      }
      currentSize = map(smallestDistance, 150, 0, 10, 100);
    };

    this.draw = function() {
      stroke(r, g, b);
      strokeWeight(5);
      noFill();
      ellipse(x, y, currentSize, currentSize);
    };
}

function Particle(startX, startY, direction) {
  var pos = createVector(startX, startY);
  var moveVect = p5.Vector.fromAngle(direction).mult(5);
  this.move = function() {
    if(pos.x > width || pos.x < 0) { moveVect.x *= -1;}
    if(pos.y > height || pos.y < 0) { moveVect.y *= -1;}
    pos.add(moveVect);
  };

  this.draw = function() {
    stroke(255);
    fill(255);
    ellipse(pos.x, pos.y, 10, 10);
  };

  this.getPos = function() {
      return pos.copy();
  };
}
