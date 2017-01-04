var MAX_PARTICLES = 150;
var STEP_SPEED = 1;
var particles = [];
var smokeImage;

function preload() {
  smokeImage = loadImage("assets/smoke.png");
}

function setup() {
  createCanvas(800, 600);
  for(var i = 0; i < MAX_PARTICLES; i++) {
    particles.push(new Particle(random(0, width), random(0, height), STEP_SPEED, smokeImage));
  }
}

function draw() {
  background(0);
  particles.forEach(function(e) {
    e.move();
    e.draw();
  });
  
}

function Particle(startX, startY, stepMaxSpeed, smokeImage) {
  var position = createVector(startX, startY);
  var heading = createVector(random(-stepMaxSpeed, stepMaxSpeed), random(-stepMaxSpeed, stepMaxSpeed));
  var startNoise = random(-1000, 1000);
  this.move = function() {
    //let's move this in some random direction ...
    position.add(heading);
    if(position.x + (smokeImage.width/2) < 0 || position.x + (smokeImage.width/2) > width) { heading.x *= -1;}
    if(position.y + (smokeImage.height/2) < 0 || position.y + (smokeImage.height/2) > height) { heading.y *= -1;}
  }

  this.draw = function() {
    fill(0, 100, 100);
    // ellipse(position.x, position.y, 5);
    image(smokeImage, position.x, position.y);
  }
}