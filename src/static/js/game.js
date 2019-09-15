var game = new Phaser.Game(900, 600, Phaser.CANVAS, 'automatic_car', { preload: preload, create: create, update: update});

var auto_car;
var road_group;
var obstacle_group;
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
    game.load.image('kaboom', '../assets/images/kaboom.jpg')
}

// Creating some objects in the map
function create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    set_up_screen()

    var fence = game.add.sprite(100, 200, 'fence');
    fence.scale.set(0.5);
    fence.inputEnabled = true;
    fence.input.enableDrag(true);
    

    auto_car = game.add.sprite(100, 300, 'auto_car');
    auto_car.anchor.set(0.5);
    auto_car.scale.set(0.15);
    auto_car.inputEnabled = true;
    auto_car.input.enableDrag(true);
    
    game.physics.enable(auto_car, Phaser.Physics.ARCADE);
}

// Updating objects and map when we have something changed
function update() {
    // collide between automatic car and road
    if (game.physics.arcade.collide(auto_car, road_group, car_road_collisionHandler, car_road_processHandler, this))
    {
        console.log('boom');
    }
    // collide between automatic car and obstacles
    if (game.physics.arcade.collide(auto_car, obstacle_group, car_obstacle_collisionHandler, car_obstacle_processHandler, this))
    {
        console.log('boom');
    }

    // waitting ...
    auto_car.body.velocity.x = 0;
    auto_car.body.velocity.y = 0;
    auto_car.body.angularVelocity = 0;

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        auto_car.body.angularVelocity = -100;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        auto_car.body.angularVelocity = 100;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        game.physics.arcade.velocityFromAngle(auto_car.angle - 90, 100, auto_car.body.velocity);
    }
}


// ----------support function ------------
function startOnClick () {
    find_way(1, 16);
}

// auto_car collides with obstacle group
function car_obstacle_processHandler (au_car, other_car) {
    return true;
}
function car_obstacle_collisionHandler (au_car, other_car) {
    au_car.kill();
    other_car.kill();
    game_over();
}

// auto_car collides with road group
function car_road_processHandler (au_car, veg) {
    return true;
}
function car_road_collisionHandler (au_car, road) {
    au_car.kill();
    road.kill();
    game_over();
}

function set_up_screen() {
    game.stage.backgroundColor = '#f3cca3';

    // Start button
    var button = game.add.button(25, 450, 'button', startOnClick, this);
    button.scale.set(0.4);

    // Obstacles
    creating_obstacles(100, 75);

    // Goal
    creating_goal(100, 150);

    // Roads
    building_road();

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

// When automatic car was destroyed
function game_over() {
    var explosion = game.add.sprite(auto_car.x, auto_car.y, 'kaboom');
    explosion.anchor.set(0.5);
    explosion.scale.set(0.15);
    setTimeout(function () {
        explosion.kill();
    }, 500);
}