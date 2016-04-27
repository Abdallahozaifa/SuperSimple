/* global $, After, superSimple */

var Level = function (id, duration, difficulty, onEnd) {
    var pub = {};
    var priv = {};
    
    priv.id = id;
    priv.duration = duration;
    priv.difficulty = difficulty;
    
    // User provided callback that runs when the level has ended.
    pub.onEnd = onEnd;
    
    pub.start = function () {
        var a = new After();
        a.after(0, function () {
            superSimple.controller.showMessage("Level "+priv.id, 40, 3);
        })
        .after(3, function () {
            pub.onEnd();
        })
    }
    
    
    return pub;
};