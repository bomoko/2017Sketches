var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var CA_WIDTH = 2;
var CA_HEIGHT = 2;
var GRID_WIDTH = SCREEN_WIDTH / CA_WIDTH;
var GRID_HEIGHT = SCREEN_HEIGHT / CA_HEIGHT;

var caArray;

function setup() {
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    caArray = new Array(GRID_HEIGHT);
    //Okay - now let's do this all on a multidimensional array of bools ...
    for(var y = 0; y < GRID_HEIGHT; y++) {
        caArray[y] = new Array(GRID_WIDTH);
        for(var x = 0; x < GRID_WIDTH; x++) {
            caArray[y][x] = false;
        }
    }
    
    caArray[0][GRID_WIDTH - 2] = true;
}

function draw() {
 background(0);
 noStroke();
 for(var y = 0; y < GRID_HEIGHT; y++) {
     for(var x = 0; x < GRID_WIDTH; x++) {
         if(caArray[y][x] == false) {
             fill(0);
         } else {
             fill(255);
         }
         ellipse(x * CA_WIDTH + (CA_WIDTH/2), SCREEN_HEIGHT - (y * CA_HEIGHT + (CA_HEIGHT/2)), CA_WIDTH, CA_HEIGHT);
     }
 }
 
 //let's shift everything down one ...
    for(var y = GRID_HEIGHT - 1; y > 0; y--) {
         caArray[y] = caArray[y - 1].splice(0);
    }
 
    caArray[0] = new Array(GRID_WIDTH);
    for(var i = 0; i < GRID_WIDTH; i++) {
        var nextStateRep = 0;
        if(i != 0 && caArray[1][i - 1] === true) {
            nextStateRep = nextStateRep | 4;
        }
        
        if(caArray[1][i] === true) {
            nextStateRep = nextStateRep | 2;
        }
        
        if(i < GRID_WIDTH && caArray[1][i + 1] == true) {
            nextStateRep = nextStateRep | 1;
        }
        
        if(nextStateRep == 7 || nextStateRep == 4 || nextStateRep == 0) {
            caArray[0][i] = false;
        } else {
            caArray[0][i] = true;
        }
    }
}