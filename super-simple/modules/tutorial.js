/* global superSimple, After, pointSystem, createjs, logo */

////////////////////////////
// TUTORIAL
////////////////////////////

var tutorial = {
    _enabled: true,
    start: function() {
        var _this = this;
        var a = new After();
        // Start tutorial
        if (this._enabled && sessionStorage.getItem("tutorial") === null) {
            sessionStorage.setItem("tutorial", "done");
            a.after(0, function() {
                    superSimple.controller.showMessage("", 90, 1);
                })
                .after(0.5, function() {
                    superSimple.controller.showMessage("SUPER SIMPLE", 90, 4);
                    // logo.init();
                })
                .after(4, function() {
                    superSimple.controller.showMessage("Welcome to SUPER SIMPLE", 60, 2);
                })
                .after(2, function() {
                    superSimple.controller.showMessage("So how do you play the game?", 50, 3.5);
                })
                .after(3.5, function() {
                    superSimple.controller.showMessage("Pay Attention...", 60, 2);
                })
                .after(2, function() {
                    superSimple.controller.showMessage("These are complex steps you need to follow..", 40, 4);
                })
                .after(4, function() {
                    superSimple.controller.showMessage("to play the game..", 45, 2);
                })
                .after(2, function() {
                    superSimple.controller.showMessage("STEP 1", 90, 2);
                })
                .after(2, function() {
                    superSimple.controller.showMessage("AVOID LARGER BLOCKS", 70, 3);
                })
                .after(3, function() {
                    superSimple.controller.showMessage("STEP 2", 90, 2);
                })
                .after(2, function() {
                    superSimple.controller.showMessage("CONSUME SMALLER BLOCKS", 55, 3);
                })
                .after(3, function() {
                    superSimple.controller.showMessage("STEP 3", 90, 2);
                })
                .after(2, function() {
                    superSimple.controller.showMessage("THERE IS NO STEP 3", 70, 4);
                })
                .after(4, function() {
                    superSimple.controller.showMessage("Easy right?", 80, 3);
                })
                .after(3, function() {
                    superSimple.controller.showMessage("but can you beat the high score?", 50, 4);
                })
                .after(4, function() {
                    superSimple.controller.showMessage("Let's find out...", 65, 2);
                })
                .after(2, function() {
                    superSimple.controller.showMessage("Oh and...", 80, 2);
                })
                .after(2, function() {
                    superSimple.controller.showMessage("Use the <- and -> arrow keys to move.", 50, 4);
                })
                .after(4, function() {
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

    }
};

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ End of tutorial section