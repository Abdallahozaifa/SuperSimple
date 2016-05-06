/* global createjs, $, jQuery, superSimple, player */

superSimple.camera = {
    // Zoom factor
    _zoomFactor: 1,
    // if it is in the state of updating threshold
    _updating: false,
    // Tick
    _tickCount: 0,
    // Returns zoom factor
    getAdjustedSize: function(size) {
        return this._zoomFactor * size;
    },
    // Updates zoom factor
    update: function() {
        console.log("UPDATING CAMERA!");
        var _this = this;
        // calculate new zoom factor
        var newFactor = player.DEFAULT_SIZE / 100;
        console.log("NEW FACTOR! " + newFactor);
        // Use tween to adjust factor gradually for 1 second
        // createjs.Tween.get(this).to({
        //     _zoomFactor: newFactor
        // }, 1000, createjs.Ease.circInOut);
        this._zoomFactor = newFactor;
        // Keep updating sizes as we zoom out
        // var drawer = setInterval(function() {
        //     player.draw();
        // }, 16);
        player.draw();
        // Stop drawing in 1 second
        // setTimeout(function() {
        //     clearInterval(drawer);
        //     _this._updating = false;
        // }, 1000);
        this._updating = false
    },
    // runs every tick
    tick: function() {
        if (this._tickCount > 1000) {
            console.log("Start camera!");
            // Threshold check
            var inThreshold = this.getAdjustedSize(player.size) > 350;
            // if player size goes beyond threshold
            if (!inThreshold && !this._updating) {
                // this.update();
                // this._updating = true;
            }
        }
        this._tickCount++;
    }
};