/* global superSimple, createjs */

/**
 * Draws a snapshot of some box that disappears in 2 seconds
 */
var snap = {
    dead: function(x, y, size) {
        this._snap(x, y, size, "#000");
    },
    ate: function(x, y, size) {
        this._snap(x, y, size, "#FFF");
    },
    _snap: function(x, y, size, color) {
        if (superSimple.DEBUG_MODE) {
            console.log("SNAP!");
            var snap = new createjs.Shape();
            snap.graphics.beginFill(color).drawRect(x, y, size, size);
            superSimple.stage.addChild(snap);
            setTimeout(function () {
                superSimple.stage.removeChild(snap);
            }, 2000);
        }
    }
};