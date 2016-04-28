/* global superSimple, tutorial, After */

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
            .after(0.5, function() {
                var firstLevel = new Level("1", 30, 0.5, 1, 1, 5, 15, player.size, 1);

                firstLevel.onEnd = function() {
                    console.log("Level over!");
                };

                firstLevel.start();
            });
    };
};

init();