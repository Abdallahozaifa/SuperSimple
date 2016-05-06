/* global Enemy, player */

////////////////////////
// ENEMY CONTROLLER 
////////////////////////

// Enemy Controller that manipulates everything involved for enemies  
var enemyController = {
    // Maximum enemies at any given time
    MAX_ENEMIES: 30,
    // An array that contains all enemy objects
    _allEnemies: [],
    // Runs every game tick
    tick: function() {
        this._allEnemies.forEach(function(enemy) {
            enemy.tick();
        });
    },
    addEnemy: function(type, size, velocity, x) {
        if (this._allEnemies.length < this.MAX_ENEMIES) {
            this._allEnemies.push(new Enemy(type, size, velocity, x));
        }
    },
    removeEnemy: function(enemy) {
        var indx = this._allEnemies.indexOf(enemy);
        if (indx !== null) {
            this._allEnemies.splice( indx , 1 )
        }
    }
};

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ End of section