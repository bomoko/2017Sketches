var sigma = 10;
var beta = 8/3;
var rho  = 28;
var x = 1.0;
var y = 1.0;
var z = 1.0;
var dt = 0.01;
var SCALE = 5;

function setup() {
    createCanvas(800, 600);
    background(0);
    
}

function draw() {
    dx = (sigma*(y-x)) * dt;
    dy = (x *(rho - z) - y) * dt;
    dz = (x*y - beta*z) * dt;
    var lastX = x;
    var lastY = y;
    var lastZ = z;

    
    x += dx;
    y += dy;
    z += dz;
    translate(width/2, height/3);
    stroke(255, 255, 255, 100);
    rotate(radians(45));
    line(lastX * SCALE, lastZ * SCALE, x * SCALE, z * SCALE);
    line(lastX * SCALE, lastY * SCALE, x * SCALE, y * SCALE);
    line(lastZ * SCALE, lastY * SCALE, z * SCALE, y * SCALE);
    line(lastZ * SCALE, lastX * SCALE, z * SCALE, x * SCALE);
    line(lastY * SCALE, lastX * SCALE, y * SCALE, x * SCALE);
    line(lastY * SCALE, lastZ * SCALE, y * SCALE, z * SCALE);
    
}