var prodRules = [];
var axiom = "A[]";
var MAX_ITERATIONS = 7;
var theoremsForTranslation = [];

function setup() {
    createCanvas(800, 200);
    background(0);
    stroke(0, 0, 255);
    prodRules.push(new ProdRule("A", "ABA"));
    prodRules.push(new ProdRule("B", "BBB"));
    prodRules.push(new ProdRule("[", "["));
    prodRules.push(new ProdRule("]", "]"));

    var theorem = axiom;
    var newTheorem = "";
    theoremsForTranslation.push(theorem);
    for(var i = 0; i < MAX_ITERATIONS; i++) {
        theorem = theorem.split("").reduce(function(acc, element){ 
            var ret = "";
            prodRules.forEach(function(rule) {
                if(rule.applies(element)) {
                    ret += rule.translate(element);
                }
            });
            return acc + ret}, 
            "");
        theoremsForTranslation.push(theorem);
    }

    var currentLineWidth = width;
    var currentY = 10;
    var currentX = 0;
    theoremsForTranslation.forEach(function(theorem) {
        theorem.split("").forEach(function(element) {
          switch(element) {
                case("A"): //draw line at current width ...
                    line(currentX, currentY, currentX + currentLineWidth, currentY);
                    currentX += currentLineWidth;
                break;
                case("B"): //skip current width
                    currentX += currentLineWidth;
                break;
                case("["): // reduce current width to a 1/3rd of its length
                    currentLineWidth = currentLineWidth / 3;
                break;
                case("]"): // move down on y by 10 ...
                    currentY += 10;
                    currentX = 0;
                break;
          } 
        });
    });
}

function ProdRule(input, output) {
    this.applies = function(element) {
        
        if(element == input) {
            return true;
        }
        return false;
    };
    
    this.translate = function(element) {
        return output;
    };
}