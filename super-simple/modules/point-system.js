/* global createjs, player, superSimple*/

var pointSystem = {
    // New create js element for the score
    _textDisplayObject: null,
    _startOffset: 100,
    setStartPoint: function (num) {
        this._startOffset = num;
    },
    // New create js element for the score
    init: function() {
        this._textDisplayObject = new createjs.Text(this._scoreToString(player.score), "32px Orbitron", "#000000");
        this._textDisplayObject.x = 50;
        this._textDisplayObject.y = 50;
        this._textDisplayObject.textBaseline = "alphabetic";
        superSimple.stage.addChild(this._textDisplayObject);
    },
    // Converts the score to a string
    _scoreToString: function() {
        return "SuperScore: " + Math.round(player.size);
    },
    // Gets the score
    getScore: function() {
        return this._textDisplayObject.text;
    },
    // Updates the score
    tick: function() {
        if (this._textDisplayObject != null) {
            this._textDisplayObject.text = this._scoreToString(player.score - this._startOffset);
        }
    }
};
