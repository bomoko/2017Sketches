var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;
var GRID_WIDTH = 10;
var GRID_HEIGHT = 10;

var vehicles = [];
var grid;

function setup() {
    createCanvas(640, 480);
    grid = new Array(SCREEN_WIDTH / GRID_WIDTH);
    var xoff = yoff = 0;
    for(var x = 0; x < SCREEN_WIDTH / GRID_WIDTH; x++) {
        grid[x] = new Array(SCREEN_HEIGHT/ GRID_HEIGHT);
        for(var y = 0; y < SCREEN_HEIGHT / GRID_HEIGHT; y++) {
            var theta = map(noise(xoff, yoff), 0, 1, 0, 360);
            grid[x][y] = p5.Vector.fromAngle(radians(theta));
            yoff += 0.1;
        }
        xoff += 0.1;
    }
    for(var i = 0; i < 1000; i++) {
      vehicles.push(new Vehicle(random(0, width), random(0, height)));
    }
}

function draw() {
    background(0);
    stroke(0, 0, 150);

    for(var i = 0; i < vehicles.length; i++) {
      vehicles[i].update(grid);
      vehicles[i].draw();
    }
}

function Vehicle(x, y) {
    var position = createVector(x, y);
    var velocity = createVector(0, 0);
    var acceleration = createVector(0, 0);

    var maxSpeed = 2;

    this.update = function(grid) {
        var indexX = int(position.x / GRID_WIDTH);
        var indexY = int(position.y / GRID_HEIGHT);
        var desired = grid[indexX][indexY].copy(); 
        desired.mult(maxSpeed);
        desired.sub(velocity);
        velocity.add(desired);
        velocity.limit(maxSpeed);
        position.add(velocity);
        acceleration.mult(0);
        if(position.x < 0) { position.x = width - 1; }
        if(position.x > width) { position.x = 0; }
        if(position.y < 0) { position.y = height - 1; }
        if(position.y > height) { position.y = 0;}
    };

    this.draw = function() {
        push();
        translate(position.x, position.y);
        rotate(position.heading());
        triangle(0, 5, 5, -5, -5, -5);
        pop();
    };

}
