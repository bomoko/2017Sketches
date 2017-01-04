function setup() {
  createCanvas(700, 700, WEBGL);
}

var onceThough = false;

function draw() {
  // if(!onceThough) {
  background(200);
  stroke(50);
  var dirY = (mouseY / height - 0.5) *2;
  var dirX = (mouseX / width - 0.5) *2;
  pointLight(255, 255, 255, -150, -150, 250);
  push();
    rotateX(frameCount*0.07);
    rotateY(frameCount*0.07);
    specularMaterial(255, 255, 255);
    drawMengerBox(200, 200, 200, 2);
  pop();
  // onceThough = true;
  // }
}

//draw a box as a complex of several boxes...
function drawMengerBox(width, height, depth, numberRecursions)
{
  var xOffset = width/3;
  var yOffset = height/3;
  var zOffset = depth/3;
  //fill determined by how deep we are in the recursion ... lighter for deeper
  //fill(random(0, 255), random(0, 255), random(0, 255));
  
  for(var z = -1; z <= 1; z++) {
    for(var x = -1; x <= 1; x++) {
      for(var y = -1; y <= 1; y++) {
        //now we have the coordinates for the square we're on ...
        //let's use this to find the centre of the smaller square -- also, let's push and pop the coordinate context ...
        push();
        translate(xOffset * x, yOffset * y, zOffset * z);
        if(abs(x) + abs(y) + abs(z) > 1) {
          
          if(numberRecursions > 0) {
            drawMengerBox(xOffset, yOffset, zOffset, numberRecursions - 1);
          } else {
            box(xOffset, yOffset, zOffset);  
          }
        }
        pop();
      }
    }
  }
  
}


