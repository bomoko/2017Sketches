var MAX_DIST_FROM_PARENT = 100;
var MAX_DEPTH = 6;
var NUM_CHILDREN = 3;
var root;

function setup() {
  createCanvas(800, 600);
  background(0);
  root = new SpaceClock(null, 0);
}

function draw() {
  background(0);
  root.draw();
}

function SpaceClock(parent, level) {
    var that = this;
    var position;
    

    this.getPosVector = function() {
        var retVect;
        if(parent != null) {
            var parVect = parent.getPosVector();
            retVect = p5.Vector.add(parVect, position);
        } else {
            retVect = position.copy();
        }
        
        return retVect;  
    };
    
    if(parent != null) {
        position = createVector(random(-MAX_DIST_FROM_PARENT, MAX_DIST_FROM_PARENT), random(-MAX_DIST_FROM_PARENT, MAX_DIST_FROM_PARENT));
    } else {
        position = createVector(width/2, height/2);
    }
    
    var rotationalSpeed = radians(random(1, 90));
    
    var children = [];
    
    if(level < MAX_DEPTH) {
        for(var i = 0; i < NUM_CHILDREN; i++) {
            children.push(new SpaceClock(this, level + 1));
        }
    }
    
    this.draw = function() {
        if(parent != null) {
            stroke(255);
            position.rotate(radians(rotationalSpeed));
            
            var parentVect = parent.getPosVector();
            var myVect = this.getPosVector();
            
            line(parentVect.x, parentVect.y, myVect.x, myVect.y);
        }
        
        if(children.length > 0) {
            for(var i = 0; i < children.length; i++) {
                children[i].draw();
            }
        }
    };
}