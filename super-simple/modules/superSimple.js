/* global createjs, $ */

////////////////////////////
// GAME GLOBAL WORLD CLASS
////////////////////////////

var superSimple = {
    // If debugging
    DEBUG_MODE: false,
    // Holds game stage from EaselJS
    stage: null,
    // Width of game screen
    width: window.innerWidth - 30,
    // Height of game screen
    height: window.innerHeight - 30,
    // Used as the multiplier for game zoom
    cameraZoomMultiplier: 1,
    // Empty player 
    player: null,
    // Background color
    bgColor: "#CCCCCC",
    // Resize canvas
    adjust: function() {
        document.getElementById("gameCanvas").width = this.width;
        document.getElementById("gameCanvas").height = this.height;
    },
    // Starts a new game
    start: function() {
        this.adjust();
        this.reset();
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", this.stage);
        createjs.Ticker.addEventListener("tick", this.controller.tick);
        this.addBackGround();
    },
    // Resets entire game
    reset: function() {
        this.cameraZoomMultiplier = 1;
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