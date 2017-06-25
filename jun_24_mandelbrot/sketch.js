var currX1 = -2.5,
currY1 = -1, 
currX2 = 1,
currY2 = 1,
zoomFactor = 0.5;

function setup() {
  createCanvas(600, 400);
  drawMandelbrot(currX1, currY1, currX2, currY2);
}

function mouseClicked() {
  //calculate new current x and ys
  //let's do this by zooming in by, say, half of the current relative width and height ...
  
  var xdist = dist(currX1, currY1, currX2, currY1);
  var ydist = dist(currX1, currY1, currX1, currY2);

  var scaledX = map(mouseX, 0, width, currX1, currX2);
  var scaledY = map(mouseY, 0, height, currY1, currY2);
  var halfXdistReduced = (xdist*zoomFactor) / 2;
  var halfYdistReduced = (ydist*zoomFactor) / 2;

  currX1 = scaledX - halfXdistReduced;
  currY1 = scaledY - halfYdistReduced;
  currX2 = scaledX + halfXdistReduced;
  currY2 = scaledY + halfYdistReduced;
  drawMandelbrot(currX1, currY1, currX2, currY2);

}

function drawMandelbrot(zoomX1, zoomY1, zoomX2, zoomY2) {
  for(var Px = 0; Px < width; Px++) {
    for(var Py = 0; Py < height; Py++) {
      var scaledX = map(Px, 0, width, zoomX1, zoomX2); 
      var scaledY = map(Py, 0, height, zoomY1, zoomY2); 
      var x = 0.0;
      var y = 0.0;

      var iteration = 0;
      var maxIteration = 60;

      while( x*x + y*y < 2*2 && iteration < maxIteration) {
        var xTemp = x*x - y*y + scaledX;
        y = 2*x*y + scaledY;
        x = xTemp;
        iteration++;
      }
      var color = map(iteration, 0, maxIteration, 0, 255);
      stroke(color);
      point(Px, Py);
    }
  }
}
