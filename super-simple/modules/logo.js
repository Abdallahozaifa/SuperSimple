/* global createjs, superSimple */
var logo = {
    logoObject: null, // entire logo object
    authorsObject: null, // authors box that contains all the group members name
    title: null,
    // init: function() {
    //     this.logoObject = new createjs.Shape();
    //     this.logoObject.graphics.beginFill("#CCCCCC").drawRect(0, 0, 300, 300);
    //     this.authorsObject = new createjs.Shape();
    //     this.authorsObject.graphics.beginFill("#CCCCCC").drawRect(0, 0, 100, 100);
    //     superSimple.stage.addChild(this.logoObject);
    //     superSimple.stage.addChild(this.authorsObject);
    // },

    init: function() {
        var logo = new createjs.Bitmap("modules/superLogo.png");
        logo.x = superSimple.width / 2 - 190;
        logo.y = superSimple.height / 2 + 70;
        superSimple.stage.addChild(logo);
        setTimeout(function() {
            superSimple.stage.removeChild(logo);
        }, 4 * 1000); 
        
        // background is wrong, come to class.
    }

};