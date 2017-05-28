var CELL_HEIGHT = 10, CELL_WIDTH = 10;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  var widthCells = Math.floor(window.innerWidth / CELL_WIDTH) - 2;
  var heightCells = Math.floor(window.innerHeight / CELL_HEIGHT) - 2;
  var myMap = new Map(widthCells, heightCells, 2, 2);
  myMap.draw();
}

function draw() {

}

function Map(width, height, startX, startY) {
  var NEITHER_OPEN = 0;
  var RIGHT_OPEN = 10;
  var TOP_OPEN = 20;
  var grid = new Array(height*width);

  //let's set up the grid ...
  for(var y = 0; y < height; y++) {
    for(var x = 0; x < width; x++) {
      if(y == 0 && x == 0) {
        grid[0] == NEITHER_OPEN;
      } else if(y == 0) {
        grid[x] == RIGHT_OPEN;
      } else if(x+1 == width) {
        grid[(y*width) + x] = TOP_OPEN;
      } else {
        grid[(y*width) + x] = random(0, 100) < 50 ? TOP_OPEN : RIGHT_OPEN;
      }
    }
  }

  this.draw = function() {
    //bound the whole shebang in a square ...
    stroke(255);
    var tl = getAbsoluteVector(0, 0);
    var br = getAbsoluteVector(width, height);
    noFill();
    rect(tl.x, tl.y, br.x, br.y);
    for(var y = 0; y < height; y++) {
      for(var x = 0; x < width; x++) {
        switch(grid[(y*width) + x]) {
          case(NEITHER_OPEN) :
            //don't really need to do anything, actually ...
            break;
          case(TOP_OPEN) :
            drawCell(x, y, false, true, false, false);
            break;
          case(RIGHT_OPEN) :
            drawCell(x, y, true, false, false, false);
            break;
        }
      }
    }
  }

  function getAbsoluteVector(posX, posY) {
    return createVector(startX + posX*CELL_HEIGHT, startY + posY*CELL_WIDTH);
  }

  function drawCell(posX, posY, drawTop, drawRight, drawBottom, drawLeft) {
    stroke(255);
    var tl = getAbsoluteVector(posX, posY),
        tr = getAbsoluteVector(posX + 1, posY),
        bl = getAbsoluteVector(posX, posY + 1),
        br = getAbsoluteVector(posX + 1, posY + 1);
    if(drawTop) {
      line(tl.x, tl.y, tr.x, tr.y); 
    }

    if(drawRight) {
      line(tr.x, tr.y, br.x, br.y); 
    }

    if(drawBottom) {
      line(bl.x, bl.y, br.x, br.y); 
    }

    if(drawLeft) {
      line(tl.x, tl.y, bl.x, bl.y); 
    }
  }


}
