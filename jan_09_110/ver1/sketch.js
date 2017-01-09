var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var CA_WIDTH = 10;
var CA_HEIGHT = 10;
var GRID_WIDTH = SCREEN_WIDTH / CA_WIDTH;
var GRID_HEIGHT = SCREEN_HEIGHT / CA_HEIGHT;
var caArray = new Array(GRID_WIDTH);

function setup() {
    
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    for(var x = 0; x < GRID_WIDTH; x++) {
        caArray[x] = new Array(GRID_HEIGHT);
        for(var y = 0; y < GRID_HEIGHT; y++) {
            caArray[x][y] = new CA(x, y, false);
        }
    }


    CA.prototype.calculateNextState = function() {
        //now - if we're in the top row - we're doing the actual work ... all other rows are simply records of what the top row does ...
        if(this.Y === 0) {
            var left = this.X - 1 < 0 ? false : this.X - 1;
            var right = this.X + 1 >= GRID_WIDTH ? false : this.X+1;
        
            var leftNeighbor = left === false ? new CA(0,0, false) : caArray[left][0];
            var rightNeighbor = right === false ? new CA(0, 0, false) : caArray[right][0];
            
            var l = leftNeighbor.getPreviousState() === true ? 100 : 0;
            var c = this.previousState === true ? 10 : 0;
            var r = rightNeighbor.getPreviousState() === true ? 1 : 0;
            var previousFlag = l+c+r;
            
            if(previousFlag == 111 || previousFlag == 100 || previousFlag === 0) {
                this.currentState = false;
            } else {
                this.currentState = true;
            }

        } else {
            this.currentState = caArray[this.X][this.Y - 1].getPreviousState();
        }
    }
    
    //this actually needs to be inverted ...
    CA.prototype.draw = function() {
        var x = this.X * CA_WIDTH + (CA_WIDTH/2);
        var y = this.Y * CA_HEIGHT + (CA_HEIGHT/2);
        if(this.currentState === true) {
            fill(255);
        } else {
            fill(0);
        }
        ellipse(x, SCREEN_HEIGHT - y, CA_WIDTH, CA_HEIGHT);
        this.previousState = this.currentState;
    }
    
    caArray[GRID_WIDTH - 1][0] = new CA(GRID_WIDTH - 1, 0, true);
}


function draw() {
    background(0);
    for(var x = 0; x < GRID_WIDTH; x++) {
        for(var y = 0; y < GRID_HEIGHT; y++) {
            caArray[x][y].draw();
        }
    }
    for(var x = 0; x < GRID_WIDTH; x++) {
        for(var y = 0; y < GRID_HEIGHT; y++) {
            caArray[x][y].calculateNextState();
        }
    }
}