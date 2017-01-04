var SCREEN_WIDTH = 500;
var SCREEN_HEIGHT = 500;
var SCREEN_BACKGROUND_COLOR = {r: 0, g: 0, b: 0};
var snake;
var gameRunning = true;

var gemCollection = {
  gems: [],
  checkGemAtXYWH: function(x, y, w, h) {
    //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    var that = this;
    var rect1 = {x: x, y: y, width: w, height: h};
    var ret = false;
    this.gems.forEach(function(e, i) {
      // console.log(i);
      var rect2 = {x: e.x, y: e.y, width: 10, height: 10}
      if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.height + rect1.y > rect2.y) {
        that.gems.splice(i, 1);
        that.addRandomGem();
        ret = true;
      }
    });
    return ret;
  },
  addGem: function(x, y) {
    this.gems.push({x: x, y: y});
  },
  addRandomGem: function() {
    // console.log("adding gem");
    this.addGem(random(0, width), random(0, height));
  },
  draw: function() {
    this.gems.forEach(function(e) {
      fill(255, 0, 0);
      rect(e.x, e.y, 10, 10);
    });
  }
};

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  snake = new Snake(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
  gemCollection.addGem(random(0, width), random(0, height));
}

function draw() {
  if(gameRunning) {
    background(SCREEN_BACKGROUND_COLOR.r, SCREEN_BACKGROUND_COLOR.g, SCREEN_BACKGROUND_COLOR.b);
    snake.move(function(x, y, w, h) { return gemCollection.checkGemAtXYWH(x, y, w, h);},
    function() { gameRunning = false;});
    snake.draw();
    gemCollection.draw();
  }
  if(!gameRunning) {
    background(255, 0, 0);
  }
}


function keyPressed() {
  if(keyCode == LEFT_ARROW) {
    snake.setHeadingLeft();
  }
  if(keyCode == RIGHT_ARROW) {
    snake.setHeadingRight();
  }
  if(keyCode == UP_ARROW) {
    snake.setHeadingUp();
  }
  if(keyCode == DOWN_ARROW) {
    snake.setHeadingDown();
  }
}

function Snake(startX, startY) {
  var that  = this;
  this.cellWidth = 10;
  this.headX = startX;
  this.headY = startY;
  this.tail = [];
  var heading = createVector(0, 0);
  var velocity = 1;

  var tX = function(x) {
    return x - that.cellWidth / 2;
  };

  var tY = function(y) {
    return y - that.cellWidth / 2;
  };
  
  var tHeadX = function() {
    return tX(that.headX);
  }
  
  var tHeadY = function() {
    return tY(that.headY);
  }
  
  var extendTail = function() {
    var x = that.headX;
    var y = that.headY;
    that.tail = [{x: x, y:y}].concat(that.tail);
  };
  
  this.setHeadingUp = function() {
    heading = createVector(0, -velocity); 
  };
  
  this.setHeadingDown = function() {
    heading = createVector(0, velocity);
  };
  
  this.setHeadingLeft = function() {
    heading = createVector(-velocity, 0);
  };
  
  this.setHeadingRight = function() {
    heading = createVector(velocity, 0);
  };
  
  function inBoundaries(x, y) {
    if(x < 0 || x > width) {
      return false;
    }
    if( y < 0 || y > height) {
      return false;
    }
    return true;
  }
  
  this.move = function(checkGemXYWH, cb) {
    that.headX += heading.x;
    that.headY += heading.y;
    console.log(checkGemXYWH(tHeadX(), tHeadY(), that.cellWidth, that.cellWidth));
    if(checkGemXYWH(tHeadX(), tHeadY(), that.cellWidth, that.cellWidth)) {
      
    }
    if(!inBoundaries(that.headX, that.headY)) {
      cb();
    }
    // gameStillRunningCb(inBoundaries(that.headX, that.headY));
  };



  this.draw = function() {
    fill(255);
    rect(tHeadX(), tHeadY(), 5, 5);
  }
}