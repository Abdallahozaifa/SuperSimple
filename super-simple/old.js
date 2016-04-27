/* global createjs, $, jquery, jQuery */

$(document).ready(function() {

    ////////////////////////////
    // GAME GLOBAL WORLD CLASS
    ////////////////////////////

    var superSimple = {
        // Holds game stage from EaselJS
        stage: null,
        // Width of game screen
        width: $("#gameCanvas").width(),
        // Height of game screen
        height: $("#gameCanvas").height(),
        // Used as the multiplier for game zoom
        cameraZoomMultiplier: 1,
        // Game difficulty, number from 0 to 10 - 0 easy, 10 hard
        difficulty: 0,
        // Empty player 
        player: null,
        // Background color
        bgColor: "#CCCCCC",
        // Starts a new game
        start: function(playerColor) {
            this.reset();
            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener("tick", this.stage);
            createjs.Ticker.addEventListener("tick", this.controller.tick);
            this.addBackGround();
        },
        // Resets entire game
        reset: function() {
            this.cameraZoomMultiplier = 1;
            this.difficulty = 0;
            this.stage = new createjs.Stage("gameCanvas");
        },
        // Add a background
        addBackGround: function() {
            var bg = new createjs.Shape();
            bg.graphics.beginFill(this.bgColor).drawRect(0, 0, this.width, this.height);
            this.stage.addChild(bg);
        }
    };

    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ End of section

    ////////////////////////
    // PLAYER CLASS 
    ////////////////////////

    var START_SIZE = 100;

    var player = {
        // Slider
        _sliderOn: false,
        // Holds the easel object of the player
        easel: null,
        // Rectangle used for bounds
        rect: null,
        // constants
        VELOCITY: 15,
        // variables
        size: START_SIZE,
        // The Y position of the player
        Y: superSimple.height - START_SIZE - 20,
        // Player color
        color: "#990000",
        /* Constructor for the player class */
        init: function(velocity, color) {
            this.x = superSimple.width / 2 - this.size / 2;
            this.reset();
            this.velocity = 0;
            this.color = color;
            this.update();
            this._bindKeys();
            superSimple.player = this;
        },
        // When player eats an enemy
        eat: function(enemy) {
            // enemy.dispose();
            // Add the size of the enemy to the player
        },
        // Moves player in a direction
        move: function(x, y) {
            if (this.easel.x + x + this.size / 2 < superSimple.width / 2 && this.easel.x + x - this.size / 2 > -superSimple.width / 2) {
                this.rect.x += x;
                this.easel.x += x;
                this.rect.y += y;
                this.easel.y += y;
            }
        },
        // Keeps moving player right
        slideRight: function() {
            var _this = this;
            if ((this._sliderOn === false)) {
                this._sliderOn = true; // lock sliding
                this._slider = setInterval(function() {
                    _this.move(_this.VELOCITY, 0);
                }, 16);
            }
        },
        // Keeps moving player left
        slideLeft: function() {
            var _this = this;
            if (this._sliderOn === false) {
                this._sliderOn = true; // lock sliding
                this._slider = setInterval(function() {
                    _this.move(-_this.VELOCITY, 0);
                }, 16);
            }
        },
        // Stop slider
        stopSlider: function() {
            this._sliderOn = false;
            clearInterval(this._slider);
        },
        /* Sets the size of the player */
        setSize: function(size) {
            // Set size
            this.size = size;
            // Reset height
            this.Y = superSimple.height - this.size - 20;
            // Update look
            this.updateRect();
        },
        update: function() {
            this.easel.graphics.beginFill(this.color).drawRect(this.x, this.Y, this.size, this.size);
            this.rect = new createjs.Rectangle(this.x, this.Y, this.size, this.size);
        },
        reset: function() {
            // Create Easel Object
            this.easel = new createjs.Shape();
            // Set it's look
            this.update();
            // Add it to the stage
            superSimple.stage.addChild(this.easel);
        },
        _bindKeys: function() {
            var _this = this;
            /* Stops the movement after key is released */
            $(document).keyup(function() {
                _this.stopSlider();
            });

            /* Starts the movement for left and right key press */
            $(document).keydown(function(e) {
                // First we stop it
                _this.stopSlider();
                /* Detects the left key press */
                if (e.keyCode === 37) {
                    _this.slideLeft();
                }
                /* Detects the right key press */
                else if (e.keyCode === 39) {
                    _this.slideRight();
                }
            });
        }
    };

    ///////// END OF PLAYER 

    ////////////////////////
    // ENEMY CLASS
    ////////////////////////

    // Constructor
    var Enemy = function(color, size, velocity, x) {
        console.log("New enemy");
        this.color = color;
        this.size = size;
        this.velocity = velocity;
        this.x = x;
        this.y = 0 - this.size;
        this.rect = null;
        this.easel = null;
        // If it's been disposed
        this.disposed = false;
        // Initialize
        this.init();
    };

    // Prototype
    var EnemyProto = {
        // Initializes the enemy
        init: function() {
            // Create it
            this.rect = new createjs.Rectangle(this.x, this.y, this.size, this.size);
            this.easel = new createjs.Shape();
            this.easel.graphics.beginFill(this.color).drawRect(this.x, this.y, this.size, this.size);
            // Add it to the stage
            superSimple.stage.addChild(this.easel); // not possible with Rectangle object
            // Start moving downwards
            this.slide(0, this.velocity);
        },
        // Removes the enemy from the stage
        dispose: function() {
            // remove from stage
            superSimple.stage.removeChild(this.easel);
            // Set as disposed
            this.disposed = true;
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
        update: function() {
            this.rect = new createjs.Rectangle(this.x, this.y, this.size, this.size);
            this.easel.graphics.beginFill(this.color).drawRect(this.x, this.y, this.size, this.size);
        },
        checkCollision: function() {
            if (this.rect.contains(player.rect.x, player.rect.y, player.rect.width, player.rect.height)) {
                // game over
            }
            else if (player.rect.contains(this.rect.x, this.rect.y, this.rect.width, this.rect.height)) {
                enemyController.allEnemies.splice(this);
                player.eat(this);
            }
        }
    };

    // Adds all of the functions in EnemyProto to the Enemy prototype object
    $.extend(Enemy.prototype, EnemyProto);

    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ End of section

    ////////////////////////
    // ENEMY CONTROLLER 
    ////////////////////////

    // Enemy Controller that manipulates everything involved for enemies  
    var enemyController = {
        // Maximum enemies at any given time
        MAX_ENEMIES: 10,
        // An array that contains all enemy objects
        _allEnemies: [],
        // Runs every game tick
        tick: function() {
            this._allEnemies.forEach(function(enemy) {
                enemy.update();
                enemy.checkCollision();
            });
        },
        addEnemy: function(color, size, velocity, x) {
            if (this._allEnemies.length < this.MAX_ENEMIES) {
                this._allEnemies.push(new Enemy(color, size, velocity, x));
            }
        },
        removeEnemy: function(enemy) {
            // body...
        }
    };

    ////////////////////////////
    // GAME CONTROLLER CLASS
    ////////////////////////////

    superSimple.controller = {
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
            player.init(15, "#006699", superSimple.width / 2);
        },
        // spawn enemy
        spawnEnemy: function() {
            var position = superSimple.width * Math.random();
            var size = player.size;
            if (Math.random() > 0.5) {
                size += player.size * 0.5 * Math.random();
            }
            else {
                size -= player.size * 0.5 * Math.random();
            }
            var velocity = 3 * Math.random() + 1;
            enemyController.addEnemy("#CC6699", size, velocity, position);
        },
        // Runs on every game tick
        tick: function() {
            enemyController.tick(); // enemies are broken
        }
    };

    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ End of section

    ////////////////////////////
    // TUTORIAL
    ////////////////////////////

    var tutorial = {
        _enabled: false,
        _totalTime: 0,
        start: function() {
            var _this = this;
            // Start tutorial
            if (this._enabled) {
                this._after(0, function() {
                        superSimple.controller.showMessage("Welcome to SuperSimple.", 30, 2);
                    })
                    ._after(2, function() {
                        superSimple.controller.showMessage("Playing SuperSimple is super simple.", 30, 2);
                    })
                    ._after(2, function() {
                        superSimple.controller.showMessage("Use the left and right arrow keys to move.", 30, 3);
                    })
                    ._after(3, function() {
                        superSimple.controller.showMessage("Avoid larger blocks, and consume smaller blocks", 30, 3);
                    })
                    ._after(3, function() {
                        superSimple.controller.showMessage("Eating blocks will increase your size", 35, 3);
                    })
                    ._after(3, function() {
                        // Tutorial ended
                        _this.onEnd();
                    });
            }
            else {
                this._after(1, function() {
                    console.log("No tutorial");
                    _this.onEnd();
                });
            }
        },
        // a callback that is run after the tutorial ends
        onEnd: function() {
            // do stuff
        },
        // After (time) seconds, run a handler
        _after: function(time, handler) {
            this._totalTime += time;

            setTimeout(function() {
                handler();
            }, this._totalTime * 1000);

            return this;
        }
    };

    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ End of tutorial section

    //////////////////////////////
    // AFTER.JS Module
    //////////////////////////////

    var After = function() {
        this._totalTime = 0;
    };

    // It's prototype
    var protoAfter = {
        // After (time) seconds, run a handler
        after: function(time, handler) {
            this._totalTime += time;

            setTimeout(function() {
                handler();
            }, this._totalTime * 1000);

            return this;
        }
    };

    $.extend(After.prototype, protoAfter);

    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ End of After section

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
                    superSimple.controller.spawnEnemy();
                    superSimple.controller.spawnEnemy();
                })
                .after(0.5, function() {
                    superSimple.controller.spawnEnemy();
                    superSimple.controller.spawnEnemy();
                })
                .after(0.5, function() {
                    superSimple.controller.spawnEnemy();
                    superSimple.controller.spawnEnemy();
                })
                .after(0.5, function() {
                    superSimple.controller.spawnEnemy();
                    superSimple.controller.spawnEnemy();
                });
        };
    };

    init();
});