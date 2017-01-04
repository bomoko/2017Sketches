var board;
var CELL_WIDTH = 10;
var CELL_HEIGHT = 10;
var CELL_ALIVE = 1;
var CELL_DEAD = 0;

function setup() {
  createCanvas(640, 480);
  board = createEmptyBoard();
  board = randomlySeedBoard(board, 0.5);
}

function draw() {
  drawBoard(board);
  board = advanceBoard(board);
}

function createEmptyBoard() {
  var board = Array(width/CELL_WIDTH);
  for(var i = 0; i < board.length; i++) {
    board[i] = Array(height/CELL_HEIGHT);
    for(var j = 0; j < board[i].length; j++) {
      board[i][j] = CELL_DEAD;
    }
  }
  return board;
}

function randomlySeedBoard(board, probabilityOfAliveCell) {
  for(var x = 0; x < width/CELL_WIDTH; x++) {
    for(var y = 0; y < height/CELL_HEIGHT; y++) {
      var rand = random(0, 1);
      if(rand <= probabilityOfAliveCell) {
        board[x][y] = CELL_ALIVE;
      }
    }
  }
  return board;
}

function drawBoard(board) {
  background(0);
  fill(255);
  var xOffset = CELL_WIDTH / 2;
  var yOffset = CELL_HEIGHT / 2;
  for(var x = 0; x < width/CELL_WIDTH; x++) {
    for(var y = 0; y < height/CELL_HEIGHT; y++) {
      if(board[x][y] == CELL_ALIVE) {
        ellipse(x * CELL_WIDTH + xOffset, y * CELL_HEIGHT + yOffset, CELL_WIDTH / 2);
      }
    }
  }
}

function advanceBoard(board) {
  var backBoard = createEmptyBoard();
  for(var x = 0; x < width/CELL_WIDTH; x++) {
    for(var y = 0; y < height/CELL_HEIGHT; y++) {
      
      var leftCellNo = x === 0 ? width/CELL_WIDTH - 1 : x - 1;
      var rightCellNo = x == width/CELL_WIDTH - 1 ? 0 : x + 1;
      var topCellNo = y === 0 ? height/CELL_HEIGHT - 1 : y - 1;
      var bottomCellNo = y == height/CELL_HEIGHT - 1 ? 0 : y + 1;

      var neighbors = [
        {x: leftCellNo, y: topCellNo},
        {x: x, y: topCellNo},
        {x: rightCellNo, y: topCellNo},
        {x: leftCellNo, y: y},
        {x: rightCellNo, y: y},
        {x: leftCellNo, y: bottomCellNo},
        {x: x, y: bottomCellNo},
        {x: rightCellNo, y: bottomCellNo}
        ];
        
      var neighborSum = neighbors.reduce(function(a, curr) {
        return a + board[curr.x][curr.y];
      }, 0);

      //set new state
      if(board[x][y] == CELL_ALIVE) {
        if(neighborSum < 2) {
          backBoard[x][y] = CELL_DEAD;
        } else if (neighborSum == 2 || neighborSum == 3) {
          backBoard[x][y] = CELL_ALIVE;
        } else {
          backBoard[x][y] = CELL_DEAD;
        }
      } else {
        if(neighborSum == 3) {
          backBoard[x][y] = CELL_ALIVE;
        }
      }
    }
  }
  return backBoard;
}
