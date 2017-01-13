function setup() {
    createCanvas(640, 480);
    stroke(255);
    strokeWeight(5);
}

function draw() {
    background(0);
    stroke(150, 0, 0, 30);
    drawCircle(width / 2, height / 2, 100, 720, radians(frameCount), function(i) {
        return i;
    });
    
    stroke(0, 0, 150, 30);
    drawCircle(width / 2, height / 2, 100, 720, radians(frameCount), function(i) {
        return -i;
    });
}


function sinDeformer(i) {
    return sin(15*i);
}


function amplifyDeformer(val, amplification) {
    return val*amplification;
}

function constrainDeformation(val, i, startI, endI) {
    if(i % (2*PI) >= startI && ( i % (2*PI)) < endI) {
        var segmentLength = endI - startI;
        var segmentMultiple = PI/segmentLength;
        return val * sin((i - startI)*segmentMultiple);
    }
    return 0;
}

function drawCircle(x, y, radius, segments, degreeOffset, radiusDeformer) {
    var circleSegmentLength = 2*PI / segments;
    var startX = radiusDeformer(0) + radius + x;
    var startY = y;

    for(var i = 0; i < 2*PI; i += circleSegmentLength) {

        var offsettedI = i + degreeOffset;
        var radiusDeform = constrainDeformation(amplifyDeformer(sinDeformer(radiusDeformer(i)), 15), offsettedI, PI, 2*PI);

        var nextX = (radius + radiusDeform)*cos(i) + x;
        var nextY = (radius + radiusDeform)*sin(i) + y;

        line(startX, startY, nextX, nextY);
        startX = nextX;
        startY = nextY;
    }
}
