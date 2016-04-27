/* global superSimple, createjs, player, enemyController, After, init */

////////////////////////////
// GAME CONTROLLER CLASS
////////////////////////////

superSimple.controller = {
    _GAME_OVER: false,
    // Shows a message to the player
    showMessage: function(msg, size, delay) {
        var text = new createjs.Text(msg, size + "px Orbitron", "#000000");
        text.x = superSimple.width / 2 - text.getMeasuredWidth() / 2;
        text.y = superSimple.height / 2;
        text.textBaseline = "alphabetic";
        superSimple.stage.addChild(text);
        setTimeout(function() {
            superSimple.stage.removeChild(text);
        }, delay * 1000);
    },
    // spawns the player
    spawnPlayer: function() {
        player.init(10, "#006699", superSimple.width / 2);
        this._GAME_OVER = false;
    },
    // spawn enemy
    spawnEnemy: function() {
        var position = superSimple.width * Math.random();
        var size = player.size;
        if (Math.random() > 0.5) {
            size += player.size * 0.8 * Math.random();
        }
        else {
            size -= player.size * 0.5 * Math.random();
        }
        var velocity = 3 * Math.random() + 1;
        enemyController.addEnemy("#CC6699", size, velocity, position);
    },
    // Restart game
    restart: function () {
        init();
    },
    gameOver: function() {
        if (!this._GAME_OVER) {
            this._GAME_OVER =  true;
            var a = new After();
            var _this = this;
            a.after(0, function() {
                _this.showMessage("GAME OVER", 75, 6);
            })
            .after(6, function() {
                _this.showMessage("Reloading in 3", 40, 1);
            })
            .after(1, function() {
                _this.showMessage("Reloading in 2", 40, 1);
            })
            .after(1, function() {
                _this.showMessage("Reloading in 1", 40, 1);
            })
            .after(1, function() {
                _this.showMessage("Reloading.....", 40, 1);
                _this.restart();
            })
        }
    },
    // Runs on every game tick
    tick: function() {
        enemyController.tick(); // enemies are broken
        player.tick();
    }
};