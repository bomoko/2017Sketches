var CA_HEIGHT = 10;
var CA_WIDTH = 10;
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var GRID_WIDTH = GRID_PITCH = SCREEN_WIDTH / CA_WIDTH;
var GRID_HEIGHT = SCREEN_HEIGHT / CA_HEIGHT;
var caArray = [];

function setup() {
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    caArray = createGrid();
    //let's add a nice bright spot near the middle ...
    caArray[GRID_PITCH / 2][GRID_HEIGHT / 2].setColor(255);
}

function createGrid(oldGrid) {
    var caArray = [];
    
    for(var x = 0; x < GRID_PITCH; x++) {
        caArray.push(new Array(GRID_HEIGHT));
        for(var y = 0; y < GRID_HEIGHT; y++) {
            if(oldGrid == null) {
                caArray[x][y] = new CCell(x, y, 0);
            } else {
                caArray[x][y] = new CCell(x, y, oldGrid[x][y].getColor());
            }
        }
    }
    return caArray;
}

function draw() {
    background(0);
    for(var x = 0; x < GRID_PITCH; x++) {
        for(var y = 0; y < GRID_HEIGHT; y++) {
        caArray[x][y].update();
        }
    }
    for(var x = 0; x < GRID_PITCH; x++) {
        for(var y = 0; y < GRID_HEIGHT; y++) {
        caArray[x][y].draw();
        }
    }
}

function CCell(x, y, initialColor) {
    var previousColor = initialColor;
    var myColor = initialColor;
    var nextColor = initialColor;
    var that = this;
    this.draw = function() {
        previousColor = myColor;
        myColor = nextColor;
        fill(myColor);
        stroke(myColor);
        ellipse(x * CA_WIDTH + (CA_WIDTH/2), y * CA_HEIGHT + (CA_HEIGHT/2), CA_WIDTH, CA_HEIGHT);
        return that;
    };
    
    this.getColor = function() {
        return previousColor;
    };
    
    this.setColor = function(newColor) {
        previousColor = myColor = nextColor = newColor;  
    };
    
    /**
     * Here we update our color based on our current colour or those of our neighbors ...
     */
    this.update = function() { 
        var grid = caArray;

        var left = x - 1 > 0 ? x -1 : GRID_PITCH - 1;
        var top = y - 1 > 0 ? y -1 : GRID_HEIGHT - 1;
        var right = x + 1 >= GRID_PITCH ? 0 : x + 1;
        var bottom = y + 1 >= GRID_HEIGHT ? 0 : y + 1;
            
        var cellColorAverage = (grid[left][top].getColor() + grid[x][top].getColor() + grid[right][top].getColor() +
                                grid[left][y].getColor() + grid[right][y].getColor() +
                                grid[left][bottom].getColor() + grid[x][bottom].getColor() + grid[right][bottom].getColor()) / 8;
                                
        // console.log(x + ": " + y + " -> " + cellColorAverage);
        nextColor = round(cellColorAverage);
        if(cellColorAverage >= 255) {
            nextColor = 0;
        } else if (cellColorAverage <= 0) {
            nextColor = 255
        } else {
            var newColor = myColor + cellColorAverage;
            if(previousColor > 0) { newColor -= previousColor; }
            if(newColor > 255) {
                newColor = 255;
            } else if (newColor < 0) {
                newColor = 0;
            }
            nextColor = newColor;
        }
        
        return that;
    }
}
