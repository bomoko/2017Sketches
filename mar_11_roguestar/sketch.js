var starField = [];
var numFarStars = 200;
var numMedStars = 100;
var numNearStars = 100;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    // starField.push(new Star(width/2, height/2, 1));
    for(var i = 0; i < numFarStars; i++) {
        starField.push(new Star(random(1, width), random(1, height), 1));
    }
    for(var i = 0; i < numMedStars; i++) {
        starField.push(new Star(random(1, width), random(1, height), 2));
    }
    for(var i = 0; i < numNearStars; i++) {
        starField.push(new Star(random(1, width), random(1, height), 3));
    }
    //The rogue star
    starField.push(new Star(width/2, height/2, -1));
}

function draw() {
  background(0);
  starField.forEach(function(e, i) {
    // console.log('here');
    e.move();
    e.draw();
  });
}

function Star(startX, startY, velocity) {
    var x = startX;
    var y = startY;

    this.move = function() {
        
        y += velocity;
        if(y > height) {
            y = 0;
            x = random(0, width);
        } else if (y < 0) {
            y = height;
            x = random(0, width);
        }
    }

    this.draw = function() {
        //fill(255);
        stroke(255);
        //for 5% of the time, let's set the star to a radom color ...
        if(random(0,100) <= 20) {
            stroke(random(0,255), random(0,255), random(0,255));
            ellipse(x, y, 5);
        } else {
            ellipse(x, y, 2);
        }
    }
}