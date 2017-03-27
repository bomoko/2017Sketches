var points = [], lines = [];


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    for(var i = 0; i <= 20; i++) {
	points.push(createVector(Math.round(random(0, width)), Math.round(random(0, height))));
    }

	lines = getLinesForPoints(points);

	background(0);
	drawPoints();
	drawLines();


}

function draw() {
}

function drawPoints() {
	points.forEach(function(e) {
		stroke(255);
		ellipse(e.x, e.y, 10);
	});
}

function drawLines() {
	lines.forEach(function(e) {
		console.log(e);
		line(e[0].x, e[0].y, e[1].x, e[1].y);
	});
}

function getLinesForPoints(points) {
	var lines = [];
	for(var point1 = 0; point1 < points.length; point1++) {
		for(var point2 = 0; point2 < points.length; point2++) {
				lines.push([points[point1], points[point2]]);
		}
	}
	return lines;
}


/**
 * Will return true if the lines projected from Point1 to Point2 cross, false otherwise
 */
function checkPointsForLineCrossing(Line1Point1, Line1Point2, Line2Point1, Line2Point2) {
	
	if(line1point1.x == line2point1.x &&
		line1point1.y == line1point1.y ||
		line1point1.x == line2point2.x &&
		line1point1.y == line1point2.y ||
		line1point2.x == line2point1.x &&
		line1point2.y == line1point1.y ||
		line1point2.x == line2point2.x &&
		line1point2.y == line1point2.y) {
		return true;
	}


	return false;


}
