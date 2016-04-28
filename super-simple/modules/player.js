/* global createjs, $, jQuery, superSimple, player */

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
    // variables
    size: 100,
    // default size
    DEFAULT_SIZE: 100,
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
    // When player eats an enemy
    eat: function(enemy) {
        if (!enemy.disposed) {
            var e_size = enemy.getSize();
            var new_area = this.size*this.size + e_size*e_size;
            var new_size = Math.sqrt(new_area);
            this.setSize(new_size);
        }
    },
    // Moves player in a direction
    move: function(x, y) {
        var left = this.easel.x + x > 0;
        var right = this.easel.x + this.size + x < superSimple.width;
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
        // Set size
        this.size = superSimple.camera.getAdjustedSize(size);
        // Reset height
        this.easel.y = superSimple.height - this.size - 20;
        // Update look
        this.draw();
    },
    draw: function() {
        this.easel.graphics.beginFill(this.color).drawRect(0, 0, this.size, this.size);
        this.rect = new createjs.Rectangle(0, 0, this.size, this.size);
    },
    correctRect: function () {
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
    tick: function () {
        this._printDebug();
    }
};

///////// END OF PLAYER