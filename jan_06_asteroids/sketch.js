var KEY_SPACE = 32;
var ASTEROID_ITERATIONS = 4;
var STARTING_ASTEROIDS = 2;
var ship;
var colliders = [];
var shipColliders = [];
var running = true;
var endMessage = "Shouldn't see this";

function setup() {
  createCanvas(640, 480);
  
  angleMode(DEGREES);
  ship = new createShip(width/2, height/2, {
      addMissile: function(missile) {
        shipColliders.push(missile);  
    }
  });
  
  shipColliders.push(ship);
  for(var noAsteroids = 0; noAsteroids < STARTING_ASTEROIDS; noAsteroids++) {
    colliders.push(new createAsteroid(random(0, width), random(0, height), ASTEROID_ITERATIONS, {
          addAsteroid: function(asteroid) {
            console.log("adding asteroid");
            colliders.push(asteroid);  
            }
    }));
  }
}

function draw() {
    
    //check win conditions ...
    if(colliders.length == 0) {
        running = false;
        endMessage = "You won!!!";
    }
    
    if(running) {
        background(0);
        if(keyIsDown(LEFT_ARROW)) { ship.turnLeft(); }
        if(keyIsDown(RIGHT_ARROW)) { ship.turnRight(); }
        if(keyIsDown(UP_ARROW)) { ship.moveForward(); }
        if(keyIsDown(KEY_SPACE)) { ship.shoot(); } //TODO: does this need some delay?

        ship.move();

        for(var si = 0; si < shipColliders.length; si++) {
            if(!shipColliders[si].canBeRemoved()) {
                for(var ci = 0; ci < colliders.length; ci++) {
                    // console.log(ci);
                    if(colliders[ci].canBeRemoved()) {
                        colliders.splice(ci, 1);
                        ci--;
                    } else {
                        // console.log("*");
                        var c1 = colliders[ci];
                        var c2 = shipColliders[si];
                    
                        var dx = c1.pos().x - c2.pos().x;
                        var dy = c1.pos().y - c2.pos().y;
                        var distance = Math.sqrt(dx * dx + dy * dy);
                        // console.log(distance);
                        if(distance < c1.radius() + c2.radius()) {
                            c1.kill();
                            c2.kill();
                        }
                    }
                }         
            } else {
                shipColliders.splice(si, 1);
                si--;
            }
        }
    
        shipColliders.forEach(function(e) { 
        e.move();
        e.draw();});
        colliders.forEach(function(e) { 
        e.move();
        e.draw();});
    } else {
        textAlign(CENTER);
        textSize(32);
        fill(255, 0, 0);
        text(endMessage, width/2, height/2 );
    }
}

var missile = function(startX, startY, heading) {
    var pos = createVector(startX, startY);
    pos.add(heading);
    var isAlive = true;
    
    this.move = function() {
        pos.add(heading);
        if(pos.x < 0 || pos.x > width || pos.y < 0 || pos.y > height) {
            isAlive = false;
        }
    };
    
    this.draw = function() {
        stroke(255, 255, 0);
        ellipse(pos.x, pos.y, 2, 2);
    };
    
    this.canBeRemoved = function() {
        return !isAlive;
    };
    
    this.radius = function() {
        return 2;
    };
    
    this.pos = function() {
        return pos;
    };
    
    this.kill = function() {
        isAlive = false;
    };
}

function createAsteroid(startX, startY, iteration, extraparams) {
    var pos = createVector(startX, startY);
    var isAlive = true;
    var heading = p5.Vector.fromAngle(radians(random(0, 360))).mult(3);
    var radius = 5 * iteration;
    
    this.move = function() {
        pos.add(heading);
        //boundary checks ...
        if(pos.x < 0) { pos.x = width; }
        if(pos.x > width) { pos.x = 0; }
        if(pos.y < 0) { pos.y = height; }
        if(pos.y > height) { pos.y = 0; }
    };
    
    this.draw = function() {
        stroke(255, 255, 0);
        ellipse(pos.x, pos.y, radius * 2, radius * 2);
    };
    
    this.canBeRemoved = function() {
        return !isAlive;
    };
    
    this.radius = function() {
        return radius;
    };
    
    this.pos = function() {
        return pos;
    };
    
    this.kill = function() {
        isAlive = false;
        if(iteration > 1) {
            extraparams.addAsteroid(new createAsteroid(pos.x, pos.y, iteration - 1, extraparams));
            extraparams.addAsteroid(new createAsteroid(pos.x, pos.y, iteration - 1, extraparams));
        }
    };
};

var createShip = function(startX, startY, extraparams){
    var pos = createVector(startX, startY);
    var velocity = createVector(0, 0);
    var acceleration = createVector(0, 0);
    
    var thrusters = 10; //some arbitrary value specifying forward acceleration ...
    var shipMass = 100;
    
    var direction = p5.Vector.fromAngle(radians(90));
    var radiusBounding = 15;
    
    var color = {r: 255, g: 0, b: 0};
    var vertices = calcVertices(pos, radiusBounding / 2);
    
    var showDebugInfo = false;
    
    this.moveForward = function() {
        acceleration = p5.Vector.mult(direction, thrusters);
        acceleration.div(shipMass);
    };
    
    this.turnLeft = function() {
        direction.rotate(radians(-2));  
    };
    
    this.turnRight = function() {
        direction.rotate(radians(2));
    };
    
    this.shoot = function() {
        var newMissile = new missile(vertices.front.x, vertices.front.y, direction.copy().mult(5));
        extraparams.addMissile(newMissile);
    };
    
    this.move = function() {
        velocity.add(acceleration);
        pos.add(velocity);
        acceleration.mult(0);
        
        //boundary checks ...
        if(pos.x < 0) { pos.x = width; }
        if(pos.x > width) { pos.x = 0; }
        if(pos.y < 0) { pos.y = height; }
        if(pos.y > height) { pos.y = 0; }
    }
    
    function calcVertices(pos, radius) {
        var offset = p5.Vector.mult(direction, radius);
        var front = p5.Vector.add(pos, offset);
        offset.rotate(radians(135));
        var left = p5.Vector.add(pos, offset);
        offset.rotate(radians(90));
        var right = p5.Vector.add(pos, offset);
        return {front: front, left: left, right: right};
    }
    
    
    this.draw = function() {
        noFill();
        vertices = calcVertices(pos, radiusBounding);
        stroke(color.r, color.g, color.b);
        triangle(vertices.front.x, vertices.front.y, 
                vertices.left.x, vertices.left.y,
                vertices.right.x, vertices.right.y);
        
        if(showDebugInfo) {
                    stroke(255, 255, 255);
                    ellipse(pos.x, pos.y, 10, 10);
                    stroke(0, 255, 0);
                    point(vertices.front.x, vertices.front.y);
                    stroke(0, 0, 255);
                    point(vertices.left.x, vertices.left.y);
                    stroke(100, 100, 100); //bounding ...
                    ellipse(pos.x, pos.y, radiusBounding * 2, radiusBounding * 2);
        }
    };
    
    this.canBeRemoved = function() {
        return false;
    };
    
    this.radius = function() {
        return radiusBounding;
    };
    
    this.pos = function() {
        return pos;
    };
    
    this.kill = function() {
        running = false;
        endMessage = "You died fool!!!";
    };
    
};
