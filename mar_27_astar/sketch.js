var GRID;
var GRID_CELL_WIDTH = 40;
var GRID_CELL_HEIGHT = 40;
var GRID_WIDTH, GRID_HEIGHT;
var targetPosition, agentStartPosition;
var OBSTACLE_PERCENTAGE = 0.3; //chance of a cell being an obstacle...
var obstacles = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
	initGrid();
    background(0);
	stroke(255);
	noFill();
	renderGrid();
	resultNode = AStar(new SearchNode(agentStartPosition.x, agentStartPosition.y,null), new SearchNode(targetPosition.x, targetPosition.y, null));	
	if(resultNode != false) {
		result = resultNode.getPath();
		console.log(result);
		stroke(0 , 0, 255);
		strokeWeight(5);
		for(var i = 1; i < result.length; i++) {
			var startX = result[i - 1].x * GRID_CELL_WIDTH + Math.round((GRID_CELL_WIDTH/2));
			var startY = result[i - 1].y * GRID_CELL_HEIGHT + Math.round((GRID_CELL_HEIGHT/2));
			var endX = result[i].x * GRID_CELL_WIDTH + Math.round((GRID_CELL_WIDTH/2));
			var endY = result[i].y * GRID_CELL_HEIGHT + Math.round((GRID_CELL_HEIGHT/2));
			line(startX, startY, endX, endY);
		}
	} else {
		textAlign(CENTER);
		textSize(32);
		fill(200, 0, 0);
		text("NO PATH FOUND", width / 2, height / 2);
	}

}

function draw() {
}


function initGrid() {
	GRID_WIDTH = Math.floor(width / GRID_CELL_WIDTH);
	GRID_HEIGHT = Math.floor(height / GRID_CELL_HEIGHT);
	
	//set up the start point
	agentStartPosition = createVector(Math.floor(random(0, GRID_WIDTH)), Math.floor(random(0, GRID_HEIGHT)));
	//set up the target
	targetPosition = createVector(Math.floor(random(0, GRID_WIDTH)), Math.floor(random(0, GRID_HEIGHT)));
	//init x dimension
	GRID = new Array(GRID_WIDTH);
	for(var x=0; x < GRID_WIDTH; x++) {
		GRID[x] = new Array(GRID_HEIGHT);
		for(var y = 0; y < GRID_HEIGHT; y++) {
			if(!(x == agentStartPosition.x && y == agentStartPosition.y) && 
			!(x == targetPosition.x && y == targetPosition.y) && 
			random(0, 1) < OBSTACLE_PERCENTAGE) {
				GRID[x][y] = true;
			}
		}
	}
}

function AStar(startPos, goalPos) {
	var closedSet = [];
	var openSet = [startPos];
	var currentNode;
	while(openSet.length > 0) {
		openSet.sort(function (a, b) {
			return a.getScore() - b.getScore();
		});

		currentNode = openSet.shift();

		//test if this is the goal node ...
		if(currentNode.getX() == goalPos.getX() && currentNode.getY() == goalPos.getY()) {
			return currentNode;
		}

		closedSet.push(currentNode);
		var actions = getActions(currentNode, goalPos).filter( function(node) {
			//TODO: this is massivly inefficient ... maybe fix with hashmap
			for(var i = 0; i < closedSet.length; i++) {
				if(closedSet[i].getX() == node.getX() && closedSet[i].getY() == node.getY()) {
					return false;
				}
			}
			return true;
		}).filter( function (node) {
			for(var i = 0; i < openSet.length; i++) {
				if(openSet[i].getX() == node.getX() && openSet[i].getY() == node.getY()) {
					return false;
				}
			}
			return true;	
		});

		openSet = openSet.concat(actions);
	}

	return false;
}

function renderGrid() {
	for(var x = 0; x < GRID_WIDTH; x++) {
		for(var y = 0; y < GRID_HEIGHT; y++) {
			var xStart = GRID_CELL_WIDTH * x;
			var yStart = GRID_CELL_HEIGHT * y;
			var xEnd = xStart + GRID_CELL_WIDTH;
			var yEnd = yStart + GRID_CELL_HEIGHT;
			noFill();
			fill(0);
			if(GRID[x][y] == true) {
				fill(155);
			}
			if(targetPosition.x == x && targetPosition.y == y) {
				fill(255, 0, 0);
			}

			if(agentStartPosition.x == x && agentStartPosition.y == y) {
				fill(0, 255, 0);
			}

			rect(xStart, yStart, xEnd, yEnd);
		}
	}
	calculateDistanceHeuristic(agentStartPosition, targetPosition, true);
}

function SearchNode(x, y, parent) {

	var that = this;

	this.getX = function() {
		return x;
	}

	this.getY = function() {
		return y;
	}

	this.getScore = function() {
		if(parent == null) {
			return calculateDistanceHeuristic(createVector(x, y), targetPosition);
		} else {
			return calculateDistanceHeuristic(createVector(x, y), targetPosition) + that.getDistanceFromParent();
		}
	}

	this.getDistanceFromParent = function() {
		if(parent == null) {
			return 0;
		} else {
			return calculateDistanceHeuristic(createVector(x,y), createVector(parent.getX(), parent.getY())) + parent.getDistanceFromParent();
		}
	}

	this.getPath = function(stack = []) {
		stack.push(createVector(x,y));
		if(parent == null) {
			return stack;
		} else {
			return parent.getPath(stack);
		}
	}

}

function calculateDistanceHeuristic(agentPosition, targetPosition, draw = false) {
	agentAbsolutePosition = createVector((agentPosition.x * GRID_CELL_WIDTH) + Math.round((GRID_CELL_WIDTH/2)),
						(agentPosition.y * GRID_CELL_HEIGHT) + Math.round((GRID_CELL_HEIGHT/2)));
	targetAbsolutePosition = createVector((targetPosition.x * GRID_CELL_WIDTH) + Math.round((GRID_CELL_WIDTH/2)),
						(targetPosition.y * GRID_CELL_HEIGHT) + Math.round((GRID_CELL_HEIGHT/2)));
					var xDiffSquare = Math.pow(agentAbsolutePosition.x - targetAbsolutePosition.x, 2);
					var yDiffSquare = Math.pow(agentAbsolutePosition.y - targetAbsolutePosition.y, 2);

					if(draw) {
						stroke(255, 255, 0);
						line(agentAbsolutePosition.x, agentAbsolutePosition.y, targetAbsolutePosition.x, targetAbsolutePosition.y);
					}
					return Math.sqrt(xDiffSquare + yDiffSquare);
}

function getActions(agentPosition) {
	//actions are simply moves to new cells ...
	var neighbors = [
		createVector(agentPosition.getX() - 1, agentPosition.getY()),
		createVector(agentPosition.getX() + 1, agentPosition.getY()),
		createVector(agentPosition.getX(), agentPosition.getY() - 1),
		createVector(agentPosition.getX(), agentPosition.getY() + 1),
		// createVector(agentPosition.getX() - 1, agentPosition.getY() + 1),
		// createVector(agentPosition.getX() - 1, agentPosition.getY() - 1),
		// createVector(agentPosition.getX() + 1, agentPosition.getY() - 1),
		// createVector(agentPosition.getX() + 1, agentPosition.getY() + 1)
	];

	var moves = [];
	neighbors.forEach(function (e) {
		if(e.x >= 0 && e.y >= 0 && e.x < GRID_WIDTH && e.y < GRID_HEIGHT && GRID[e.x][e.y] != true) {
			var newPos = new SearchNode(e.x, e.y, agentPosition); 
			moves.push(newPos);	
		}

	});
	return moves;
}

