/* global superSimple, After */

////////////////////////////
// TUTORIAL
////////////////////////////

var tutorial = {
    _enabled: false,
    start: function() {
        console.log("WAT");
        var _this = this;
        var a = new After();
        // Start tutorial
        if (this._enabled) {
            a.after(0, function() {
                    superSimple.controller.showMessage("Welcome to SuperSimple.", 30, 2);
                })
                .after(2, function() {
                    superSimple.controller.showMessage("Playing SuperSimple is super simple.", 30, 2);
                })
                .after(2, function() {
                    superSimple.controller.showMessage("Use the <- and -> arrow keys to move.", 30, 3);
                })
                .after(3, function() {
                    superSimple.controller.showMessage("Avoid larger blocks, and consume smaller blocks", 30, 3);
                })
                .after(3, function() {
                    superSimple.controller.showMessage("Eating blocks will increase your size", 35, 3);
                })
                .after(3, function() {
                    // Tutorial ended
                    _this.onEnd();
                });
        }
        else {
            a.after(0.1, function() {
                console.log("No tutorial");
                _this.onEnd();
            });
        }
    },
    // a callback that is run after the tutorial ends
    onEnd: function() {
        // do stuff
    }
};

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ End of tutorial section