// Automatic car
function creating_autocar(x, y) {
    auto_car = game.add.sprite(x, y, 'auto_car');
    auto_car.anchor.set(0.5);
    auto_car.scale.set(0.12);

    game.physics.p2.enable(auto_car, true);
    auto_car.body.setCollisionGroup(carCollisionGroup);
    auto_car.body.collides(obstacleCollisionGroup, car_obstacle_collisionHandler, this);
    auto_car.body.collides(goalCollisionGroup, get_to_goal_collisionHandler, this)
}

// Goal
function creating_goal(x, y) {
    goal = game.add.sprite(x, y, 'goal');
    goal.anchor.set(0.5);
    goal.scale.set(0.3);
    
    game.physics.p2.enable(goal, false);
    goal.body.setCollisionGroup(goalCollisionGroup);
    goal.body.collides(carCollisionGroup);

    goal.body.setZeroDamping();
    goal.body.fixedRotation = true;
}

// Building road (x, y, angle, 'image')
function building_road() {
    var road_map = [
        [275, 425, 90, 'road'],
        [275, 375, 90, 'road'],
        [275, 325, 90, 'road'],
        [275, 275, 90, 'road'],

        [350, 500, 0, 'road'],
        [350, 450, 0, 'road'],
        [325, 425, 90, 'road'],
        [325, 375, 90, 'road'],
        [350, 350, 0, 'road'],
        [325, 325, 90, 'road'],
        [325, 275, 90, 'road'],
        [350, 250, 0, 'road'],
        [350, 200, 0, 'road'],
        [350, 150, 0, 'road'],
        [350, 100, 0, 'road'],

        [450, 100, 0, 'road'],
        [450, 150, 0, 'road'],
        [475, 175, 90, 'road'],
        [475, 225, 90, 'road'],
        [450, 250, 0, 'road'],
        [475, 275, 90, 'road'],
        [475, 325, 90, 'road'],
        [450, 350, 0, 'road'],
        [475, 375, 90, 'road'],
        [475, 425, 90, 'road'],
        [450, 450, 0, 'road'],
        [450, 500, 0, 'road'],

        [500, 500, 0, 'road'],
        [500, 450, 0, 'road'],
        [500, 350, 0, 'road'],
        [525, 275, 90, 'road'],
        [525, 225, 90, 'road'],
        [525, 175, 90, 'road'],
        [575, 175, 90, 'road'],
        [575, 225, 90, 'road'],
        [575, 287.5, -63.435, 'diagonal_road'],
        [575, 337.5, -63.435, 'diagonal_road'],
        [550, 350, 0, 'road'],
        [575, 362.5, 63.435, 'diagonal_road'],
        [575, 412.5, 63.435, 'diagonal_road'],
        [550, 450, 0, 'road'],
        [550, 500, 0, 'road'],
        [625, 387.5, 63.435, 'diagonal_road'],
        [625, 312.5, -63.435, 'diagonal_road'],
        [625, 225, 90, 'road'],
        [625, 175, 90, 'road'],
        [675, 225, 90, 'road'],
        [675, 175, 90, 'road'],
        [675, 325, 90, 'road'],
        [675, 375, 90, 'road'],

        [700, 100, 0, 'road'],
        [700, 150, 0, 'road'],
        [700, 250, 0, 'road'],
        [700, 300, 0, 'road'],
        [700, 400, 0, 'road'],
        [700, 450, 0, 'road'],
        [700, 500, 0, 'road'],

        [750, 500, 0, 'road'],
        [750, 450, 0, 'road'],
        [750, 400, 0, 'road'],
        [825, 375, 90, 'road'],
        [775, 375, 90, 'road'],
        [775, 325, 90, 'road'],
        [825, 325, 90, 'road'],
        [750, 300, 0, 'road'],
        [750, 300, 0, 'road'],
        [750, 250, 0, 'road'],
        [750, 200, 0, 'road'],
        [750, 150, 0, 'road'],
        [750, 100, 0, 'road'],
    ]
    
    obstacle_group = game.add.group();
    
    for (var i = 0; i < road_map.length; i++){
        create_a_fence(road_map[i])
    }
    
}

function create_a_fence(road_map){
    var fence = game.add.sprite(road_map[0], road_map[1], road_map[3]);
    fence.anchor.set(0.5);
    fence.scale.set(0.5);

    game.physics.p2.enable(fence, true);
    fence.body.angle += road_map[2];
    fence.body.static = true
    
    fence.body.setCollisionGroup(obstacleCollisionGroup);
    fence.body.collides([carCollisionGroup, obstacleCollisionGroup]);
    
    obstacle_group.add(fence);
} 

// ----------------- Creating obstacles  -------------
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
function creating_obstacles(x, y) {
   obstacle1 = game.add.sprite(25, 50, 'obstacle');
   obstacle1.scale.set(0.25);

   obstacle2 = game.add.sprite(75, 50, 'obstacle');
   obstacle2.scale.set(0.25);

   obstacle3 = game.add.sprite(125, 50, 'obstacle');
   obstacle3.scale.set(0.25);
   
   obstacle4 = game.add.sprite(175, 50, 'obstacle');
   obstacle4.scale.set(0.25);
   
   game.physics.p2.enable([obstacle1, obstacle2, obstacle3, obstacle4], false);
   
   obstacle1.body.setCollisionGroup(obstacleCollisionGroup);
   obstacle1.body.collides([carCollisionGroup]);
   obstacle1.body.setZeroDamping();
   obstacle1.body.fixedRotation = true;

   obstacle2.body.setCollisionGroup(obstacleCollisionGroup);
   obstacle2.body.collides([carCollisionGroup]);
   obstacle2.body.setZeroDamping();
   obstacle2.body.fixedRotation = true;

   obstacle3.body.setCollisionGroup(obstacleCollisionGroup);
   obstacle3.body.collides([carCollisionGroup]);
   obstacle3.body.setZeroDamping();
   obstacle3.body.fixedRotation = true;

   obstacle4.body.setCollisionGroup(obstacleCollisionGroup);
   obstacle4.body.collides([carCollisionGroup]);
   obstacle4.body.setZeroDamping();
   obstacle4.body.fixedRotation = true;
}