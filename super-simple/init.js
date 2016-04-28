/* global superSimple, tutorial, After, player, Level */

//////////////////////////////
// INITIALIZE THE GAME
//////////////////////////////

function init() {
    // Create game stage & initialize stuff
    superSimple.start();
    // Show tutorial
    tutorial.start();
    // when tutorial ends do...
    tutorial.onEnd = function() {
        var a = new After();
        a.after(0, function() {
                superSimple.controller.showMessage("Enjoy!", 40, 2);
            })
            .after(1, function() {
                superSimple.controller.spawnPlayer();
            })
            .after(2, function() {
                var firstLevel = new Level("1", 30, 0.9, -0.9, 1, 7, 15, player.size, 1);

                firstLevel.onEnd = function() {
                    superSimple.controller.showMessage("LEVEL 1 COMPLETED", 40, 2);
                };

                firstLevel.start();
            })
            .after(42, function() {
                var secondLevel = new Level("2", 30, 0.9, -0.9, 4, 7, 15, player.size, 0.5);

                secondLevel.onEnd = function() {
                    superSimple.controller.showMessage("LEVEL 2 COMPLETED", 40, 2);
                };

                secondLevel.start();
            });
    };
};

init();