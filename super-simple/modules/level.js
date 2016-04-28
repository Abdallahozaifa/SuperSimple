/* global $, After, superSimple, player, enemyController */

/**
 * Level class
 * used to quickly create levels for the game 
 * with different settings you can adjust.
 */
var Level = function(id, duration, sizeLowerBound,
    sizeUpperBound, velocityLowerBound,
    velocityUpperBound, playerVelocity, playerSize, enemyInterval, onEnd) {
    var pub = {};
    var priv = {};

    // some properties
    priv.id = id;
    priv.LEVEL_OVER = false;

    // User provided callback that runs when the level has ended.
    pub.onEnd = onEnd;

    // Sets player properties based on level
    priv.updatePlayer = function() {
        player.VELOCITY = playerVelocity;
        player.setSize(playerSize);
    };

    // Continously spawns enemies until level duration is over
    priv.startEnemySpawning = function() {
        var spawnInterv = setInterval(function() {
            console.log("Spawn enemy");
            priv.spawnEnemy();
            if (priv.LEVEL_OVER || superSimple.controller._GAME_OVER) {
                clearInterval(spawnInterv);
            }
        }, enemyInterval * 1000);
    };

    // Spawns single enemy
    priv.spawnEnemy = function() {
        var size = player.size;
        var velocity = (velocityUpperBound - velocityLowerBound) * Math.random() + velocityLowerBound;
        if (Math.random() > 0.5) {
            size += player.size * sizeLowerBound * Math.random();
        }
        else {
            size -= player.size * sizeUpperBound * Math.random();
        }
        var position = (superSimple.width - size) * Math.random();
        enemyController.addEnemy("#CC6699", size, velocity, position);
    };

    // Starts the level
    pub.start = function() {
        var a = new After();
        a.after(0, function() {
                superSimple.controller.showMessage("Level " + priv.id, 40, 3);
            })
            .after(3, function() {
                priv.updatePlayer();
                priv.startEnemySpawning();
            })
            .after(duration, function() {
                priv.LEVEL_OVER = true;
            })
            .after(5, function() {
                if (!superSimple.controller._GAME_OVER) {
                    pub.onEnd();
                }
            });
    };

    return pub;
};