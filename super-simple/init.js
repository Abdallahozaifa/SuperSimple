/* global superSimple, tutorial, After, player, createjs, Level, pointSystem */

//////////////////////////////
// INITIALIZE THE GAME
//////////////////////////////

function init() {
    // Start audio
    var audioLoaded = function(event) {
        console.log(".play(): " + "music");
        var instance = createjs.Sound.play("music");
        instance.volume = 0;
        createjs.Tween.get(instance).to({
            volume: 1
        }, 1200).call(function() {

        });
    };
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.on("fileload", audioLoaded, window);
    createjs.Sound.registerSound("/super-simple/audio/superSimple.mp3", "music");
    // Create game stage & initialize stuff
    superSimple.start();
    // Show tutorial
    tutorial.start();
    // when tutorial ends do...
    tutorial.onEnd = function() {
        var a = new After();
        a.after(0, function() {
                superSimple.controller.showMessage("HAVE FUN!", 90, 1);
            })
            .after(1, function() {
                superSimple.controller.spawnPlayer();
            })
            .after(1, function() {
                // show points
                pointSystem.init();
            })
            .after(2, function() {
                ///////////////////////////////////////////////////////////////
                /* Level class constructor format
                    (id, duration, sizeLowerBound,sizeUpperBound, 
                    velocityLowerBound, velocityUpperBound, playerVelocity, 
                    playerSize, enemyInterval)
                */
                ///////////////////////////////////////////////////////////////
                var level = new Level("1", 30, 0.8, 0.8, 5, 10, 15, 100, 0.2);
                level.onEnd = function() {};
                level.start();
            })
            .after(30, function() {
                var level = new Level("2", 30, 0.1, 1.3, 15, 20, 15, 100, 0.15);
                level.onEnd = function() {};
                level.start();
            })
            .after(30, function() {
                var level = new Level("3", 30, 0.8, 1.3, 15, 20, 15, 100, 0.1);
                level.onEnd = function() {};
                level.start();
            })
            .after(30, function() {
                var level = new Level("4", 30, 0.9, -0.5, 20, 25, 15, 100, 0.05);
                level.onEnd = function() {};
                level.start();
            })
            .after(30, function() {
                var level = new Level("5", 30, 0.1, 2, 25, 30, 15, 100, 0.03);
                level.onEnd = function() {};
                level.start();
            })
            .after(30, function() {
                superSimple.controller.gameOver();
            })
    };
};

init();