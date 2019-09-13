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
    creating_goal();
    find_way();

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

// Crossroads
var cross_road = {
    d: {a: [[375, 475, 90, 'road'], [425, 475, 90, 'road']], b: [[350, 450, 0, 'road']], e: [[375, 425, 90, 'road'], [425, 425, 90, 'road']], i: [[450, 450, 0, 'road']]},
    e: {c: [[350, 350, 0, 'road']], d: [[375, 375, 90, 'road'], [425, 375, 90, 'road']], f: [[375, 325, 90, 'road'], [425, 325, 90, 'road']], j: [[450, 350, 0, 'road']]},
    f: {e: [[375, 275, 90, 'road'], [425, 275, 90, 'road']], g: [[375, 225, 90, 'road'], [425, 225, 90, 'road']], o: [[450, 250, 0, 'road']]},
    i: {d: [[500, 450, 0, 'road']], h: [[525, 475, 90, 'road']], j: [[525, 425, 90, 'road']], k: [[550, 450, 0, 'road']]},
    j: {e: [[500, 350, 0, 'road']], i: [[525, 375, 90, 'road']], k: [[550, 350, 0, 'road']]},
    k: {i: [[625, 412.5, -63.435, 'diagonal_road']], j: [[625, 387.5, 63.435, 'diagonal_road']], n: [[650, 400, 0, 'road']]},
    n: {k: [[700, 400, 0, 'road']], l: [[725, 375, 90, 'road']], m: [[750, 400, 0, 'road']], o: [[725, 425, 90, 'road']]},
    o: {f: [[700, 250, 0, 'road']], n: [[725, 275, 90, 'road']], p: [[725, 225, 90, 'road']]},
};

function find_way() {
    console.log(cross_road["d"]["b"])
    var barries = cross_road["o"]["p"]
    for (var i = 0; i < barries.length; i++){
        var road = game.add.sprite(barries[i][0], barries[i][1], barries[i][3]);
        road.anchor.set(0.5);
        road.angle += barries[i][2]
        road.scale.set(0.5);
        road.inputEnabled = true;
        road.input.enableDrag(true);
    }
}