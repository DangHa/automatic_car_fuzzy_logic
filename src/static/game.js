var game = new Phaser.Game(900, 700, Phaser.CANVAS, 'automatic_car', { preload: preload, create: create, update: update});

var auto_car;
var goal;

// Reloading all resources of the game
function preload () {
    game.load.image('random_car', './assets/images/random_car.jpg');
    game.load.image('auto_car', './assets/images/auto_car.jpg');
    game.load.image('diagonal_road', './assets/images/diagonal_road.jpg');
    game.load.image('road', './assets/images/road.jpg');
    game.load.image('traffic_light', './assets/images/traffic_light.jpg');
    game.load.image('goal', './assets/images/goal.jpg');
}

// Creating some objects in the map
function create () {
    game.stage.backgroundColor = '#f3cca3';

    // Obstacles
    creating_obstacles();

    // Roads
    building_road();

    var traffic_light = game.add.sprite(400, 100, 'traffic_light');
    traffic_light.angle += 90;
    traffic_light.scale.set(0.5);
    traffic_light.inputEnabled = true;
    traffic_light.input.enableDrag(true);

    // Goal
    creating_goal()


    auto_car = game.add.sprite(200, 200, 'auto_car');
    auto_car.anchor.set(0.5);
    auto_car.scale.set(0.15);
    auto_car.inputEnabled = true;
    auto_car.input.enableDrag(true);
    auto_car.pivot.x = 1000;
}

// Updating object and map when we have anyhing changed
function update() {
 // waitting ...
    auto_car.angle += 1;
}

// Adjacency matrix
var adj_matrix = [
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 6, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 0, 3, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
]