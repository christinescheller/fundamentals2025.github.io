var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    /*───────────────────────────────────────────────
    │  AI-Assisted / AI-Generated Assets Attribution
    │────────────────────────────────────────────────
    │  Images (enemies, obstacles): AI-generated (DALL·E, MidJourney)
    │  Code: AI-assisted (ChatGPT)
    │  Description: 
    |   1. Hit counter logic (enemy needs 3 hits to die)I
    │   2. Changing background to gif
    │   
     ────────────────────────────────────────────────*/

    function createObstacle(x, y, damage, rotation, hitZone, image, offsetX, offsetY, scaleX, scaleY){
      var hitZoneSize = hitZone;
      var damageFromObstacle = damage;
      var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      obstacleHitZone.x = x;
      obstacleHitZone.y = y;
      game.addGameItem(obstacleHitZone);
      var obstacleImage = draw.bitmap(image);
      obstacleHitZone.addChild(obstacleImage);
      obstacleImage.x = offsetX;
      obstacleImage.y = offsetY;
      obstacleImage.scaleX = scaleX;
      obstacleImage.scaleY = scaleY;

      obstacleHitZone.rotationalVelocity = rotation;
    }
    
    function createEnemy(x, y, damage, scale, offsetX, offsetY, hitzone, velocity, rotation, changeScore) {
      
      var enemy = game.createGameItem("enemy", hitzone);     // Create an enemy game item with a hit zone radius of 25
      var enemySprite = draw.rect(50, 50, "red");           // Create the visual sprite for the enemy
      enemySprite.x = -offsetX;                         // Offset sprite horizontally relative to the hit zone
      enemySprite.y = -offsetY;                         // Offset sprite vertically relative to the hit zone
      enemy.addChild(enemySprite);                      // Attach the sprite to the enemy object
      enemy.x = x;                                      // Set enemy X position
      enemy.y = y;                                      // Set enemy Y position
      game.addGameItem(enemy);                          // Add the enemy to the game    
      enemy.velocityX -= velocity;                      // Move the enemy left across the screen
      enemy.rotationalVelocity = rotation;              // Optional: rotate the enemy sprite    
      enemySprite.scaleX = scale;                       // Scale sprite horizontally
      enemySprite.scaleY = scale;                       // Scale sprite vertically   
     

      enemy.onPlayerCollision = function () {
          game.changeIntegrity(damage);                // Reduce player health when colliding with the enemy
      };
      
      enemy.onProjectileCollision = function (){           
            game.increaseScore(changeScore);               // Increase score when enemy is hit by a projectile
            enemy.fadeOut();                              // Fade out the enemy on projectile impact
            // enemy.shrink();                            // Optional: shrink animation
            // enemy.flyTo(x, y);                         // Optional: move enemy to a target position
          
      };
    }
  

    function createReward(x, y){
      var reward = game.createGameItem("reward", 25);
      var rewardImage = draw.rect(50, 50, "blue");
      rewardImage.x = -25;
      rewardImage.y = -25;
      reward.addChild(rewardImage);
      reward.x = x;
      reward.y = y;
      game.addGameItem(reward);

      reward.velocityX -= 3;
      
      //handles when Halle collides with reward
      reward.onPlayerCollision = function(){
        game.changeIntegrity(10); // increase player health
        reward.fadeOut();
      };

    }

    
    function createLevelMarker(x, y){
      var levelMarker = game.createGameItem("level", 25);
      var levelImage = draw.rect(50, 50, "yellow");
      levelImage.x = -25;
      levelImage.y = -25;
      levelMarker.addChild(levelImage);
      levelMarker.x = x;
      levelMarker.y = y;
      game.addGameItem(levelMarker);

      levelMarker.velocityX -= 3;
      
      //handles when Halle collides with levelMarker
      levelMarker.onPlayerCollision = function(){        
        levelMarker.fadeOut();
        startLevel();
      };
    }

   


    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel]; 
      var levelObjects = level.gameItems;

      for(var i = 0; i < levelObjects.length; i++){
        var element = levelObjects[i];

        if(element.type === "obstacle"){
          createObstacle(element.x, element.y, element.damage, element.rotation, element.hitZone, element.image, element.offsetX, element.offsetY, element.scaleX, element.scaleY);
        }
        if(element.type === "enemy"){
          createEnemy(element.x, element.y, element.damage, element.scale, element.offsetX, element.offsetY, element.hitzone, element.velocity, element.rotation, element.changeScore);
        }
        if(element.type === "reward"){
          createReward(element.x, element.y);
        }
        if(element.type === "levelMarker"){
          createLevelMarker(element.x, element.y);
        }
        
      }




      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
