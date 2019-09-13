var game = new Phaser.Game(900, 700, Phaser.CANVAS, 'automatic_car', { preload: preload, create: create, update: update});

var auto_car;
var goal;

// Reloading all resources of the game
function preload () {
    game.load.image('random_car', './assets/images/random_car.jpg');
    game.load.image('auto_car', './assets/images/auto_car.jpg');
    game.load.image('diagonal_road', './assets/images/diagonal_road.jpg');  // 100
    game.load.image('road', './assets/images/road.jpg') // 50
    game.load.image('traffic_light', './assets/images/traffic_light.jpg');
    game.load.image('goal', './assets/images/goal.jpg')
}

// Creating some objects in the map
function create () {
    game.stage.backgroundColor = '#f3cca3';

    // Obstacles
    for(var i = 0; i < 8; i++){
        var random_car = game.add.sprite(50, 50, 'random_car');
        random_car.angle += i*90;
        random_car.scale.set(0.15);
        random_car.inputEnabled = true;
        random_car.input.enableDrag(true);
    }

    // Roads
    building_road();

    var traffic_light = game.add.sprite(400, 100, 'traffic_light');
    traffic_light.angle += 90;
    traffic_light.scale.set(0.5);
    traffic_light.inputEnabled = true;
    traffic_light.input.enableDrag(true);

    goal = game.add.sprite(100, 200, 'goal');
    goal.anchor.set(0.5);
    goal.scale.set(0.15);
    goal.inputEnabled = true;
    goal.input.enableDrag(true);


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
    var right = 100; 
    var road_map = [
        [400, 550, 0, 'road'],
        [375, 525, 90, 'road'],
        [375, 475, 90, 'road'],
        [400, 450, 0, 'road'],
        [375, 425, 90, 'road'],
        [375, 375, 90, 'road'],
        [400, 350, 0, 'road'],
        [400, 300, 0, 'road'],
        [400, 250, 0, 'road'],

        [500, 250, 0, 'road'],
        [525, 275, 90, 'road'],
        [525, 325, 90, 'road'],
        [500, 350, 0, 'road'],
        [525, 375, 90, 'road'],
        [525, 425, 90, 'road'],
        [500, 450, 0, 'road'],
        [525, 475, 90, 'road'],
        [525, 525, 90, 'road'],
        [500, 550, 0, 'road'],

        [550, 550, 0, 'road'],
        [550, 450, 0, 'road'],
        [575, 375, 90, 'road'],
        [575, 325, 90, 'road'],
        [575, 275, 90, 'road'],
        [625, 275, 90, 'road'],
        [625, 325, 90, 'road'],
        [625, 387.5, -63.435, 'diagonal_road'],
        [625, 437.5, -63.435, 'diagonal_road'],
        [600, 450, 0, 'road'],
        [625, 462.5, 63.435, 'diagonal_road'],
        [625, 512.5, 63.435, 'diagonal_road'],
        [600, 550, 0, 'diagonal_road'],
        [675, 487.5, 63.435, 'diagonal_road'],
        [675, 412.5, -63.435, 'diagonal_road'],
        [675, 325, 90, 'road'],
        [675, 275, 90, 'road'],

        [700, 250, 0, 'road'],
        [700, 350, 0, 'road'],
        [700, 400, 0, 'road'],
        [700, 500, 0, 'road'],
        [700, 550, 0, 'road'],

        [750, 550, 0, 'road'],
        [750, 500, 0, 'road'],
        [775, 475, 90, 'road'],
        [775, 425, 90, 'road'],
        [750, 400, 0, 'road'],
        [750, 400, 0, 'road'],
        [750, 350, 0, 'road'],
        [750, 300, 0, 'road'],
        [750, 250, 0, 'road'],
    ]
    

    for (var i = 0; i < road_map.length; i++){
        var road = game.add.sprite(road_map[i][0], road_map[i][1], road_map[i][3]);
        road.anchor.set(0.5);
        road.angle += road_map[i][2]
        road.scale.set(0.5);
    }
    
}