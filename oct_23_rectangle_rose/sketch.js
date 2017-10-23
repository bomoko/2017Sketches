var WIDTH = 800;
var HEIGHT = 800;
var REDUCTIONSTEP = 2;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    frameRate(15);
    
}


var angleStep = 1;
var angleChange = 0.1;
function draw() {
    background(200);
    if(angleStep > 30 || angleStep < 1) {
        angleChange *= -1;
    }
    angleStep += angleChange;
    drawRose(width/2, height/2, 500, angleStep, REDUCTIONSTEP);
}


function drawRose(x, y, initialSize, angleStep, reductionStep) {
    var redFill = 50;
    var currentSize = initialSize;
    var currentAngle = random(0, 90);
    while(currentSize > 10) {
        stroke(0);
        if(redFill < 255) { redFill++; }
        fill(redFill, 0, 0);
        rectMode(CENTER);
        push();
        translate(x, y);
        rotate(radians(currentAngle));
        rect(0, 0, currentSize, currentSize);
        pop();
        currentAngle += angleStep;
        currentSize -= reductionStep;
    }
}