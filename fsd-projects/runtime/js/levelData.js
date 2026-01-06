var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "obstacle", x: 400, y: groundY - 110, damage: 10, rotation: 0, hitZone: 25, image: "img/spikes.png", offsetX: -25, offsetY: -25},
          { type: "obstacle", x: 600, y: groundY - 10, damage: 20, rotation: 0, hitZone: 25, image: "img/spikes.png", offsetX: -25, offsetY: -25 },
          { type: "obstacle", x: 800, y: groundY - 110, damage: 30, rotation: 0, hitZone: 25, image: "img/spikes.png", offsetX: -25, offsetY: -25 },
          { type: "enemy", x: 400, y: groundY - 50, damage: 10, scale: 1, offsetX: 0, offsetY: 0, hitzone: 25, velocity: 3, rotation: 0, changeScore: 100, maxHits: 3 },
          { type: "enemy", x: 600, y: groundY - 50, damage: 10, scale: 1, offsetX: 0, offsetY: 0, hitzone: 25, velocity: 3, rotation: 0, changeScore: 50 }, // 1 hit by default
          { type: "reward", x: 900, y: groundY - 100},
          { type: "levelMarker", x: 1000, y: groundY - 100},
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "obstacle", x: 400, y: groundY },
          { type: "obstacle", x: 600, y: groundY },
          { type: "obstacle", x: 900, y: groundY },
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
