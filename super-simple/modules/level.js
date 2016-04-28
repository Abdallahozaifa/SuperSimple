/* global $, After, superSimple, player, enemyController */

/**
 * Level class
 * used to quickly create levels for the game 
 * with different settings you can adjust.
 */
var Level = function(id, duration, sizeLowerBound,
    sizeUpperBound, velocityLowerBound,
    velocityUpperBound, playerVelocity, enemyInterval, onEnd) {
    var pub = {};
    var priv = {};

    priv.id = id;
    priv.LEVEL_OVER = false;

    // User provided callback that runs when the level has ended.
    pub.onEnd = onEnd;

    // Sets player properties based on level
    priv.updatePlayer = function() {
        player.VELOCITY = playerVelocity;
    };

    // Continously spawns enemies until level duration is over
    priv.startEnemySpawning = function() {
        var spawnInterv;
        if (!priv.LEVEL_OVER) {
            spawnInterv = setInterval(function() {
                priv.spawnEnemy();
            }, enemyInterval);
        } {
            clearInterval(spawnInterv);
        }
    };

    // Spawns single enemy
    priv.spawnEnemy = function() {
        var size = player.size;
        if (Math.random() > 0.5) {
            size += player.size * sizeLowerBound * Math.random();
        }
        else {
            size -= player.size * sizeUpperBound * Math.random();
        }
        var velocity = 3 * Math.random() + 1;
        var position = (superSimple.width - size) * Math.random();
        enemyController.addEnemy("#CC6699", size, velocity, position);
    }

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
                pub.onEnd();
            });
    };

    return pub;
};