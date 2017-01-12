var spaceClock;
function setup() {
    createCanvas(800, 600);
    angleMode(RADIANS);
    spaceClock = CreateSpaceClock();
    background(0);
}

function draw() {
    background(0);
    spaceClock.move();
    spaceClock.draw();
}

function CreateSpaceClock() {

    var MAX_DIST_FROM_PARENT = 100;
    var MAX_DEPTH = 6;
    var NUM_CHILDREN = 2;
    var MAX_ELLIPSE_WIDTH = 10;
    var LEVEL_DIMMING_FACTOR = 10;
    var INITIAL_GREY_VAL = 150;

    function SpaceClock(parent, level) {
        var children = [];
        var relativePos;
        var rotationalSpeed = random(-5, 5);
        
        if(parent == null) {
            relativePos = createVector(width / 2, height / 2);
        } else {
            relativePos = createVector(random(-MAX_DIST_FROM_PARENT, MAX_DIST_FROM_PARENT),
                                        random(-MAX_DIST_FROM_PARENT, MAX_DIST_FROM_PARENT));
        }
        
        this.getPos = function() {
            if(parent == null) {
                return relativePos.copy();
            } else {
                return p5.Vector.add(parent.getPos(), relativePos);
            }
        };
        
        this.move = function() {
            if(parent != null) {
                    relativePos.rotate(radians(rotationalSpeed));
            }

            for(var i = 0; i < children.length; i++) {
                children[i].move();
            }
        };
        
        this.draw = function() {
            
            if(parent != null) {
                var myPos = this.getPos();
                var parPos = parent.getPos();
                stroke(INITIAL_GREY_VAL - level*LEVEL_DIMMING_FACTOR);
                line(parPos.x, parPos.y, myPos.x, myPos.y);
                fill(INITIAL_GREY_VAL - level*LEVEL_DIMMING_FACTOR);
                ellipse(myPos.x, myPos.y, MAX_ELLIPSE_WIDTH, MAX_ELLIPSE_WIDTH);
            }
            
            for(var i = 0; i < children.length; i++) {
                children[i].draw();
            }
        }
        
        if(level < MAX_DEPTH) {
            for(var i = 0; i < NUM_CHILDREN; i++) {
                children.push(new SpaceClock(this, level + 1));
            }   
        }
    }
    
    return new SpaceClock(null, 0);
}