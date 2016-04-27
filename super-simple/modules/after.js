/* global $ */

//////////////////////////////
// AFTER.JS Module
//////////////////////////////

var After = function() {
    this._totalTime = 0;
};

// It's prototype
var protoAfter = {
    // After (time) seconds, run a handler
    after: function(time, handler) {
        this._totalTime += time;

        setTimeout(function() {
            handler();
        }, this._totalTime * 1000);

        return this;
    }
};

$.extend(After.prototype, protoAfter);

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ End of After section