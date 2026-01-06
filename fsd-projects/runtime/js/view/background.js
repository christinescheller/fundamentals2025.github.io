var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var tree;
        var buildings = [];        
        var winImage;
        var youWin = false;
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundImage = draw.bitmap("img/runtimebg.jpg"); 

            // Scale image to fit width
            backgroundImage.scaleX = canvasWidth / backgroundImage.image.width;
            backgroundImage.scaleY = backgroundImage.scaleX;

            // After scaling, compute its new height
            var scaledHeight = backgroundImage.image.height * backgroundImage.scaleY;

            // Position it so the BOTTOM of the image touches the ground
            backgroundImage.x = 0;
            backgroundImage.y = groundY - scaledHeight;

            background.addChild(backgroundImage);


            
            // TODO 2: - Add a moon and starfield
            for(var i = 0; i < 50; i++){
                var circle = draw.circle(2, "white", "LightGray", 2); //creates a circle with a specified radius, border color, fill color, alpha and stores it in the variable circle
                circle.x = canvasWidth * Math.random(); // sets a random x position within canvas width
                circle.y = groundY * Math.random(); // sets a random y position within groundY
                background.addChild(circle); // adds circle to the background container
            }

            var moon = draw.bitmap("img/moon.png"); //creates a bitmap object using the moon image and stores it in the variable moon
            moon.x = canvas.width - 400; //sets the moon's X position
            moon.y = groundY - 400; //sets the moon's Y position
            moon.scaleX = 0.75; //scales the moon's width
            moon.scaleY = 0.75; //scales the moon's height
            background.addChild(moon); // add the moon to the background container

            
            
            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for (var i = 0; i < 5; ++i) {
                var buildingColors = ["Pink", "LightBlue", "Red", "Black", "Orange"];
                var buildingHeight = 300 * Math.random();
                var building = draw.rect(75, buildingHeight, buildingColors[i], "Black", 1);
                building.x = 300 * i;
                building.y = groundY - buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 3: Part 1 - Add a tree
                tree = draw.bitmap("img/tree.png"); //creates a bitmap object using the tree image and stores it in the variable tree
                tree.x = 600; // sets the x value of the tree
                tree.y = groundY - 230; // sets the y value of the tree
                background.addChild(tree); //adds the tree to the background container

            if (youWin){
                // TODO 3: Part 1 - Add a tree
                winImage = draw.bitmap("img/winimg.jpg"); //creates a bitmap object using the tree image and stores it in the variable tree
                winImage.x = 600; // sets the x value of the tree
                winImage.y = groundY - 230; // sets the y value of the tree
                background.addChild(winImage); //adds the tree to the background container
            }
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            tree.x = tree.x - 3; //moves the tree to the left by subtracting from it's current x position

            // checks if the tree has gone off the left and resets to the right
            if (tree.x < -200) {
              tree.x = canvasWidth;
            }
            
            // TODO 4: Part 2 - Parallax
            for(var i = 0; i < buildings.length; i++){
                var building = buildings[i];
                building.x -= 1;
                if (building.x < -200){
                    building.x = canvasWidth;
                }
            }

            if (!youWin && window.opspark.game.getScore() >= 100) {
                youWin = true;
                render();   // re-draw background so win image appears
            }

            

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
