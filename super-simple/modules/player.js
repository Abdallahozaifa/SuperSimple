/* global createjs, $, jQuery, superSimple, player, camera */

////////////////////////
// PLAYER CLASS 
////////////////////////

var player = {
    // Slider
    _sliderOn: false,
    // Holds the easel object of the player
    easel: null,
    // Rectangle used for bounds
    rect: null,
    // constants
    VELOCITY: 15,
    // Default VEL
    DEFAULT_VELOCITY: 15,
    // variables
    size: 100,
    // default size
    DEFAULT_SIZE: 100,
    // Invincible
    _invincible: false,
    // Player color
    color: "#990000",
    /* Constructor for the player class */
    init: function(velocity, color) {
        this.color = color;
        this.VELOCITY = velocity;
        this.reset();
        // Bindings
        this._bindKeys();
        superSimple.player = this;
    },
    isInvincible: function() {
        return this._invincible;
    },
    // When player eats an enemy
    eat: function(enemy) {
        // Store enemy size
        var e_size = enemy.getSize();
        switch (enemy.type.id) {
            case 1:
                // Speed type
                this._speedBoost();
                break;
            case 2:
                // set as invincible for 2 seconds
                this._invincibleBoost();
                break;
            case 3:
                superSimple.controller.showMessage("DOUBLE POINTS", 90, 1);
                // double type
                e_size *= 2; // double size = double points
                // don't add break statement here!
            default:
                // Eat enemy
                if (!enemy.disposed) {
                    var new_area = this.size * this.size + e_size * e_size;
                    var new_size = Math.sqrt(new_area);
                    this.setSize(new_size);
                }
        }
    },
    _invincibleBoost: function() {
        superSimple.controller.showMessage("INVINCIBLE", 90, 1);
        this._invincible = true;
        var _this = this;
        setTimeout(function() {
            _this._invincible = false;
        }, 5000);
    },
    // Player Powerup for speed, gives 170% speed for 3 seconds
    _speedBoost: function() {
        superSimple.controller.showMessage("SPEED BOOST", 90, 1);
        // Update new velocity to be 170% of old velocity
        this.VELOCITY *= 1.7;
        var _this = this;
        // Revert back to old speed in 3 seconds
        setTimeout(function() {
            _this.VELOCITY = _this.DEFAULT_VELOCITY;
        }, 3000);
    },
    // Moves player in a direction
    move: function(x, y) {
        var adjSize = superSimple.camera.getAdjustedSize(this.size);
        var left = this.easel.x + x > 0;
        var right = this.easel.x + adjSize + x < superSimple.width;
        if (left && right) {
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
        // Store old size
        var oldSize = this.size;
        // giet difference in new and old
        var diff = oldSize - size;
        // Set size
        this.size = size;
        // get adj size
        var adjSize = superSimple.camera.getAdjustedSize(this.size);
        // Update look
        // this.draw();
        // Reset height
        // this.easel.y = superSimple.height - adjSize - 20;
    },
    draw: function() {
        var adjSize = superSimple.camera.getAdjustedSize(this.size);
        this.easel.graphics.beginFill(this.color).drawRect(0, 0, adjSize, adjSize);
        this.rect = new createjs.Rectangle(0, 0, adjSize, adjSize);
    },
    correctRect: function() {
        this.rect.x = this.easel.x;
        this.rect.y = this.easel.y;
    },
    reset: function() {
        // Create Easel Object
        this.easel = new createjs.Shape();
        // Set it's look
        this.draw();
        // Add it to the stage
        superSimple.stage.addChild(this.easel);
        // Set X & Y
        var x = superSimple.width / 2 - this.size / 2;
        var y = superSimple.height - this.size - 20;
        this.move(x, y);
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

        /* Mouse support */
        $(document).mouseup(function() {
            _this.stopSlider();
        });

        $(document).mousedown(function(evt) {
            if (evt.clientX > 0.5 * superSimple.width) {
                _this.slideRight();
            }
            else {

                _this.slideLeft();
            }
        });
        
        /* Touch support */
        document.addEventListener('touchstart', function(e) {
            e.preventDefault();
            var touch = e.touches[0];
            // alert(touch.pageX + " - " + touch.pageY);
            if (touch.pageX > 0.5 * superSimple.width) {
                _this.slideRight();
            }
            else {
                _this.slideLeft();
            }
        }, false);
        
        document.addEventListener('touchend', function(e) {
            e.preventDefault();
            var touch = e.touches[0];
            // alert(touch.pageX + " - " + touch.pageY);
            _this.stopSlider();
        }, false);
    },
    // DEBUGGING STUFF
    _debug_text: null,
    _printDebug: function() {
        if (superSimple.DEBUG_MODE && this.easel !== null) {
            var str = "X: " + this.easel.x + " Y: " + this.easel.y;
            if (this._debug_text === null) {
                this._debug_text = new createjs.Text(str, "15px Arial", "#000000");
                this._debug_text.x = this.easel.x;
                this._debug_text.y = this.easel.y;
                this._debug_text.textBaseline = "alphabetic";
                superSimple.stage.addChild(this._debug_text);
            }
            else {
                this._debug_text.text = str;
                this._debug_text.x = this.easel.x;
                this._debug_text.y = this.easel.y;
            }
        }
    },
    // Runs every tick
    tick: function() {
        this._printDebug();
    }
};

///////// END OF PLAYER