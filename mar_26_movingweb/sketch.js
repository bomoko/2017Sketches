var points = [], lines = [];
var MAXPOINTS = 20;


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    for(var i = 0; i <= MAXPOINTS; i++) {
	points.push(new Node(Math.round(random(0, width)), Math.round(random(0, height))));
    }

	lines = getLinesForPoints(points);
}

function draw() {
	movePoints();
	background(0);
	drawLines();
}


function drawLines() {

	lines.forEach(function(e) {

		var length = Math.sqrt(Math.pow(e[0].getX() - e[1].getX(), 2) + Math.pow(e[0].getY() - e[1].getY(), 2));
		var red = map(e[1].getX(), 0, width, 255, 0); //distance of first point from y axis
		var green = map(e[0].getX(), 0, width, 0, 255); //distance of first point from y axis
		var blue = map(e[1].getY(), 0, height, 0, 255);
		stroke(red, green, blue);
		line(e[0].getX(), e[0].getY(), e[1].getX(), e[1].getY());
	});
}

function movePoints() {

	for(var i = 0; i < points.length; i++) {
		points[i].move();
	}
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

function Node(x, y) {
	var heading = createVector(random(-5, 5), random(-5, 5));
	var pos = createVector(x, y);

	this.move = function() {
		if(pos.x <=0 || pos.x >= width) {
			heading.x *= -1;
		}
		if(pos.y <=0 || pos.y >= height) {
			heading.y *= -1;
		}

		pos.add(heading);
	}

	this.getX = function() {
		return pos.x;
	}

	this.getY = function() {
		return pos.y;
	}
}

