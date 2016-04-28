/* global createjs, $, superSimple, player, snap, enemyController */

////////////////////////
// ENEMY CLASS
////////////////////////

// Constructor
var Enemy = function(color, size, velocity, x) {
    this.color = color;
    this.size = size;
    this.velocity = velocity;
    this.x = x;
    this.y = 0 - this.size;
    this.rect = null;
    this.easel = null;
    // If it's been disposed
    this.disposed = false;
    // all the different enemy colors for the different enemies
    this.colors = ["blue", "green", "red", "yellow", "purple", "orange"],
        // Initialize
        this.init();
};

// Prototype
var EnemyProto = {
    // Initializes the enemy
    init: function() {
        this.cache();
        // Add it to the stage
        superSimple.stage.addChild(this.easel); // not possible with Rectangle object
        // Set X
        this.easel.x = this.x;
        this.easel.y = this.y;
        // Start moving downwards
        this.slide(0, this.velocity);
    },
    randomColor: function() {
        var color =  this.colors[Math.floor(Math.random() * 6)];
        console.log(color);
        return color;
    },
    cache: function() {
        // Create it
        this.rect = new createjs.Rectangle(0, 0, this.size, this.size);
        this.easel = new createjs.Shape();
        this.easel.graphics.beginFill(this.randomColor()).drawRect(0, 0, this.size, this.size);
    },
    getSize: function() {
        return this.size;
    },
    // Removes the enemy from the stage
    dispose: function() {
        if (!this.disposed) {
            // remove from stage
            superSimple.stage.removeChild(this.easel);
            // Set as disposed
            this.disposed = true;
            // remove from E controller
            enemyController.removeEnemy(this);
        }
    },
    // Moves the enemy
    move: function(x, y) {
        this.rect.y += y;
        this.easel.y += y;
        this.rect.x += x;
        this.easel.x += x;
    },
    // Keeps moving enemy in a direction
    slide: function(x, y) {
        var _this = this;
        this.slider = setInterval(function() {
            _this.move(x, y);
        }, 16);
    },
    // Stop sliding the enemy
    stop: function() {
        clearInterval(this.slider);
    },
    /* Sets the size of the enemy */
    setSize: function(size) {
        this.size = size;
        this.update();
    },
    // Make sure enemy rect has same values as easel
    correctRect: function() {
        this.rect.x = this.easel.x;
        this.rect.y = this.easel.y;
    },
    checkCollision: function() {
        // Correct Rect values
        this.correctRect();
        player.correctRect();
        /* enemy contains player */
        if (this.rect.contains(player.easel.x, player.easel.y, player.size, player.size)) {
            superSimple.controller.gameOver();
            snap.dead(player.easel.x, player.easel.y, player.size);
            return;
        }
        /* player contains enemy */
        else if (player.rect.contains(this.easel.x, this.easel.y, this.size, this.size)) {
            player.eat(this);
            this.dispose();
            snap.ate(this.easel.x, this.easel.y, this.size);
            return;
        }
    },
    tick: function() {
        this.correctRect();
        this.checkCollision();
        this._printDebug();
        this._checkOutOfBounds();
    },
    _checkOutOfBounds: function() {
        if (this.easel.y > 100 + superSimple.height) {
            this.dispose();
        }
    },
    // DEBUGGING STUFF
    _debug_text: null,
    _printDebug: function() {
        if (superSimple.DEBUG_MODE) {
            var str = "X: " + this.easel.x + " Y: " + this.easel.y;
            if (this._debug_text === null) {
                this._debug_text = new createjs.Text(str, "10px Arial", "#000000");
                this._debug_text.textBaseline = "alphabetic";
                superSimple.stage.addChild(this._debug_text);
            }
            else {
                this._debug_text.text = str;
                this._debug_text.x = this.easel.x;
                this._debug_text.y = this.easel.y;
            }
        }
    }
};

// Adds all of the functions in EnemyProto to the Enemy prototype object
$.extend(Enemy.prototype, EnemyProto);

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ End of section