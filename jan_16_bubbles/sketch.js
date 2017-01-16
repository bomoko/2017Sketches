var INITIAL_BUBBLE_SIZE = 20;
var MAX_BUBBLE_SIZE = 100;
var NUM_BUBBLES = 100;
var MIN_DELTA = 1;
var MAX_DELTA = 6;
var BUBBLE_COLOR = {r: 255, g: 255, b:255};

var bubbleArray = [];

function setup() {
  createCanvas(640, 480);
  for(var i = 0; i < NUM_BUBBLES; i++) {
      bubbleArray.push(new Bubble(random(0, width), random(0, height), random(MIN_DELTA, MAX_DELTA)));
  }
}

function draw() {
  background(0, 70, 150);
  for(var i = 0; i < bubbleArray.length; i++) {
      bubbleArray[i].draw();
      if(bubbleArray[i].canBeRemoved()) {
          bubbleArray.splice(i, 1);
          i--;
          bubbleArray.push(new Bubble(random(0, width), random(0, height), random(MIN_DELTA, MAX_DELTA)));
      }
  }
}

function Bubble(x, y, delta) {
    var size = 20;
    var bubbleAlpha = 255;
    this.draw = function() {
        size += delta;
        bubbleAlpha -= 3*delta;
        noFill();
        stroke(BUBBLE_COLOR.r, BUBBLE_COLOR.g, BUBBLE_COLOR.b, bubbleAlpha);
        ellipse(x, y, size, size);
    };
    
    this.canBeRemoved = function() {
        if(size > MAX_BUBBLE_SIZE) {
            return true;
        } 
        return false;
    };
}