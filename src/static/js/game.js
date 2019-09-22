var game = new Phaser.Game(900, 600, Phaser.CANVAS, 'automatic_car', { preload: preload, create: create, update: update});

var cursors;

var auto_car;
var obstacle_group;
var goal;

// Collision
var obstacleCollisionGroup;
var carCollisionGroup;
var goalCollisionGroup;

// Dragging
var mouseBody;
var mouseConstraint;

// Reloading all resources of the game
function preload () {
    game.load.image('obstacle', '../assets/images/obstacle.jpg');
    game.load.image('auto_car', '../assets/images/auto_car.jpg');
    game.load.image('diagonal_road', '../assets/images/diagonal_road.jpg');
    game.load.image('road', '../assets/images/road.jpg');
    game.load.image('bar', '../assets/images/bar.jpg');
    game.load.image('goal', '../assets/images/goal.jpg');
    game.load.image('button', '../assets/images/button.png');
    game.load.image('kaboom', '../assets/images/kaboom.jpg')
}

// Creating some objects in the map
function create () {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 0;
    
    // Collision
    carCollisionGroup = game.physics.p2.createCollisionGroup();
    obstacleCollisionGroup = game.physics.p2.createCollisionGroup();
    goalCollisionGroup = game.physics.p2.createCollisionGroup();

    set_up_screen()

    mouseBody = new p2.Body();
    game.physics.p2.world.addBody(mouseBody);

    // attach pointer events
    game.input.onDown.add(click, this);
    game.input.onUp.add(release, this);
    game.input.addMoveCallback(move, this);

    cursors = game.input.keyboard.createCursorKeys();
}

// Updating objects and map when we have something changed
function update() {
    // 2 tham so se thay doi khi 
    var velocity = 100; 
    var angularVelocity = 1

    
    // driving by yourself
    auto_car.body.velocity.x = 0;
    auto_car.body.velocity.y = 0;
    auto_car.body.angularVelocity =0;

    if (cursors.left.isDown){
        auto_car.body.angularVelocity = -angularVelocity;
    }
    else if (cursors.right.isDown){
        auto_car.body.angularVelocity = angularVelocity;
    }

    if (cursors.up.isDown){
        auto_car.body.velocity.x = velocity*Math.sin(auto_car.body.angle*Math.PI/180);
        auto_car.body.velocity.y = -velocity*Math.cos(auto_car.body.angle*Math.PI/180);
    }
    else if (cursors.down.isDown){
        auto_car.body.velocity.x = -velocity*Math.sin(auto_car.body.angle*Math.PI/180);
        auto_car.body.velocity.y = velocity*Math.cos(auto_car.body.angle*Math.PI/180);
    }
    
    //automatic driving

}


// ----------support function ------------
function startOnClick () {
    find_way(1, 16);
}

// Collision function
function get_to_goal_collisionHandler (body1, body2) {
    console.log("Finished !!")
    goal.kill();

    game_over(goal);
}
function car_obstacle_collisionHandler (body1, body2) {
    console.log("Boommmm !!")
    auto_car.kill();

    game_over(auto_car);
}

function set_up_screen() {
    game.stage.backgroundColor = '#f3cca3';

    // Roads
    building_road();

    // Obstacles
    creating_obstacles(25, 50);

    // Goal
    creating_goal(100, 150);

    // Auto car
    creating_autocar(100, 300)

    // Start button
    var button = game.add.button(25, 450, 'button', startOnClick, this);
    button.scale.set(0.4);
    

    for (var i = 0; i < 15; i++){
        var bar = game.add.sprite(200, i*50, 'bar');
        bar.scale.set(0.5);
    }
    for (var i = 0; i < 5; i++){
        var bar = game.add.sprite(i*50, 370, 'bar');
        bar.angle += 90
        bar.scale.set(0.5);
    }
}

// When automatic car was destroyed
function game_over(object) {
    var explosion = game.add.sprite(object.x, object.y, 'kaboom');
    explosion.anchor.set(0.5);
    explosion.scale.set(0.2);
    setTimeout(function () {
        explosion.kill();
    }, 700);
}
