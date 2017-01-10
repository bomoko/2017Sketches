function CA(x, y, state) {
    if (!(this instanceof CA)) {
        return new CA(x, y, state);
    }
    this.X = x;
    this.Y = y;
    this.currentState = state;
    this.previousState = false;
}

CA.prototype.draw = function() {
    console.log(this.X);
};

CA.prototype.getPreviousState = function() {
    return this.previousState;
};

/**
 * right now, our calculateNextState really doesn't do anything - we assume it's going to be overridden ...
 */
CA.prototype.calculateNextState = function() {
    this.previousState = this.currentState;
};

CA.prototype.getState = function() {
    return this.currentState;
};

CA.prototype.setState = function(newState) {
    this.previousState = this.currentState;
    this.currentState = newState;
};

CA.prototype.getPreviousState = function() {
    return this.previousState;
};
