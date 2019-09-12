var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'automatic_car', { preload: preload, create: create, update: update});

var auto_car;

// Reloading all resources of the game
function preload () {
    game.load.image('random_car', './assets/images/random_car.jpg');
    game.load.image('auto_car', './assets/images/auto_car.jpg');
    game.load.image('road', './assets/images/road.jpg');
}

// Creating some objects in the map
function create () {
    game.stage.backgroundColor = '#f3cca3';

    // Obstacles
    for(var i = 0; i < 10; i++){
        var random_car = game.add.sprite(100, 100, 'random_car');
        random_car.scale.set(0.15);
        random_car.inputEnabled = true;
        random_car.input.enableDrag(true);
    }

    // Roads
    building_road();

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

// Building road
function building_road() {
    for (var i = 0; i < 10; i++){
        var road = game.add.sprite(150, 100, 'road');
        road.scale.set(0.5);
        road.inputEnabled = true;
        road.input.enableDrag(true);
    }

    for (var i = 0; i < 10; i++){
        var road = game.add.sprite(200, 100, 'road');
        road.angle += 90
        road.scale.set(0.5);
        road.inputEnabled = true;
        road.input.enableDrag(true);
    }

    for (var i = 0; i < 10; i++){
        var road = game.add.sprite(250, 100, 'road');
        road.angle += 45
        road.scale.set(0.5);
        road.inputEnabled = true;
        road.input.enableDrag(true);
    }
}