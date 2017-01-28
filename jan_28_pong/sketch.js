var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var KEYCODE_A = 65;
var KEYCODE_Z = 90;

var leftPaddle, rightPaddle, ball; 
var leftScore = 0, rightScore = 0;

function setup() {
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    leftPaddle = new Paddle(50, height / 2, 20, 100, createVector(255, 0, 0));
    rightPaddle = new Paddle(SCREEN_WIDTH - 50, height / 2, 20, 100, createVector(0, 255, 0));
    ball = new Ball(width / 2, height / 2);
}

function draw() {
  background(0);
  movePaddles(leftPaddle, rightPaddle);
  leftPaddle.draw();
  rightPaddle.draw();
  ball.move([leftPaddle, rightPaddle]);
  ball.draw();
  if(ball.inPlay() === false) {
      if(ball.leftWin()) { leftScore++; }
      if(ball.rightWin()) { rightScore++; }
      ball = new Ball(width / 2, height / 2);
  }
  drawTextData();
}


function drawTextData() {
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text("LEFT : " + leftScore, 50, 50);
    textAlign(RIGHT);
    text("LEFT : " + rightScore, width - 50, 50);
    textSize(12);
    textAlign(LEFT);
    text("Left controls A=up, Z=down, right ... plain old up and down ...", 50, height - 30);
}

function movePaddles(left, right) {
    if(keyIsDown(UP_ARROW)) {
        right.moveUp();
    }
    if(keyIsDown(DOWN_ARROW)) {
        right.moveDown();
    }
    if(keyIsDown(KEYCODE_A)) {
        left.moveUp();
    }
    if(keyIsDown(KEYCODE_Z)) {
        left.moveDown();
    }
}


function Ball(startX, startY) {
    var pos = createVector(startX, startY);
    var velocity = p5.Vector.fromAngle(radians(random(135, 225))).mult(5);
    //randomize direction ...
    if(random(0, 100) <= 50) { velocity.x *= -1; }
    var deadStatus = 0;
    
    this.move = function(paddles) {
        if(pos.y < 0 || pos.y > height) {
            velocity.y *= -1;
        }
        
        //now let's check if we have hit anything else ...
        for(var i = 0; i < paddles.length; i++) {
            if(paddles[i].pointOnPaddle(pos.x, pos.y)) {
                velocity.x *= -1;
            }
        }
        
        if(pos.x < 0) {
            deadStatus = -1;
        }
        
        if(pos.x > width) {
            deadStatus = 1;
        }
        
        pos.add(velocity);
    }
    
    this.draw = function() {
        fill(255);
        ellipse(pos.x, pos.y, 10, 10);
    }
    
    this.inPlay = function() {
      if(deadStatus !== 0) {
          return false;
      }  
      return true;
    };
    
    this.leftWin = function() {
      if(deadStatus > 0) { 
          return true;
      }
      return false;
    };
    
    this.rightWin = function() {
        if(deadStatus < 0) {
            return true;
        }
        return false;
    }
    
}


function Paddle(startX, startY, paddleWidth, paddleHeight, paddleFill) {
    var pos = createVector(startX, startY);
    
    this.moveUp = function() {
        if(pos.y > paddleHeight / 2) {
            pos.y = pos.y - 5;
        }
    };
    
    this.moveDown = function() {
        if(pos.y < height - paddleHeight / 2) {
            pos.y = pos.y + 5;
        }
    };
    
    this.draw = function() {
      fill(paddleFill.x, paddleFill.y, paddleFill.z);
      rect(pos.x - paddleWidth/2, pos.y - paddleHeight/2, paddleWidth, paddleHeight);
    };
    
    this.pointOnPaddle = function(x, y) {
        if(x <= pos.x + paddleWidth / 2 && 
        x >= pos.x - paddleWidth / 2 &&
        y <= pos.y + paddleHeight /2 &&
        y >= pos.y - paddleHeight /2) {
            return true;
        }
        return false;
    }
}