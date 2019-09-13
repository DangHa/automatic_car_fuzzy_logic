var game = new Phaser.Game(900, 600, Phaser.CANVAS, 'automatic_car', { preload: preload, create: create, update: update});

var auto_car;
var goal;

// Reloading all resources of the game
function preload () {
    game.load.image('random_car', '../assets/images/random_car.jpg');
    game.load.image('auto_car', '../assets/images/auto_car.jpg');
    game.load.image('diagonal_road', '../assets/images/diagonal_road.jpg');
    game.load.image('road', '../assets/images/road.jpg');
    game.load.image('fence', '../assets/images/fence.jpg');
    game.load.image('goal', '../assets/images/goal.jpg');
    game.load.image('button', '../assets/images/button.png');
}

// Creating some objects in the map
function create () {
    game.stage.backgroundColor = '#f3cca3';
    divide_up_screen()

    // Obstacles
    creating_obstacles();

    // Goal
    creating_goal();

    // Start button
    var button = game.add.button(25, 450, 'button', startOnClick, this);
    button.scale.set(0.4)

    // Roads
    building_road();

    var fence = game.add.sprite(75, 200, 'fence');
    fence.angle += 90;
    fence.scale.set(0.5);
    fence.inputEnabled = true;
    fence.input.enableDrag(true);

    

    // make_way();

    auto_car = game.add.sprite(100, 200, 'auto_car');
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

function startOnClick () {

    background.visible =! background.visible;

}

function divide_up_screen() {
    for (var i = 0; i < 15; i++){
        var road = game.add.sprite(200, i*50, 'fence');
        road.scale.set(0.5);
    }
    for (var i = 0; i < 5; i++){
        var road = game.add.sprite(i*50, 370, 'fence');
        // road.anchor.set(0.5);
        road.angle += 90
        road.scale.set(0.5);
    }
}