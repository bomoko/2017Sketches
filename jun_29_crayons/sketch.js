var backgroundBuffer;
var currX, currY;
function setup() {
  createCanvas(600, 400);
  backgroundBuffer = drawRandomGraphic(width, height);
  background(0);
  currX = random(0, width);
  currY = random(0, height);
}

function mouseDragged() {
  if(mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    copyBitsFromImageToCanvas(backgroundBuffer, mouseX, mouseY);
  }
}

function copyBitsFromImageToCanvas(buffer, x, y) {
  buffer.loadPixels();
  loadPixels();
  /*
  for(var xpos = x - 2; xpos < x + 2; xpos++) {
    for(var ypos = y - 2; ypos < y + 2; ypos++) {
      set(xpos, ypos, buffer.get(xpos, ypos));
    }
  }
  */
  var randomOffsetLimit = 20;
  //let's do a couple random pixels around it to give it a rough vibe
  for(var randNum = 0; randNum < random(30, 100); randNum++) {
      var xoffset = random(-randomOffsetLimit, randomOffsetLimit), yoffset = random(-randomOffsetLimit, randomOffsetLimit);
      set(x + xoffset, y + yoffset, buffer.get(x + xoffset, y + yoffset));
  }
  updatePixels();
  //stroke(buffer.get(x, y));
  //point(x, y);
  //copy(buffer, x, y, x + 5, y + 5, x, y, x + 5, y + 5);
  
}

function drawRandomGraphic(imageWidth, imageHeight) {

  var pg = createGraphics(imageWidth, imageHeight);

  //for now, let's just add a whole bunch of random crap to it ....
  for(var i = 0; i <= 1000; i++) {
    pg.fill(random(10, 255), random(10, 255), random(10, 255)); 
    pg.ellipse(random(0, pg.width), random(0, pg.height), random(10, 70));
  }
  
  return pg;
}


function mouseClicked() {
}

