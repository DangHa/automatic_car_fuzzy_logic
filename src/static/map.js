// Building road
function building_road() {
    var road_map = [
        [325, 475, 90, 'road'],
        [325, 425, 90, 'road'],
        [325, 375, 90, 'road'],
        [325, 325, 90, 'road'],

        [400, 550, 0, 'road'],
        [400, 500, 0, 'road'],
        [375, 475, 90, 'road'],
        [375, 425, 90, 'road'],
        [400, 400, 0, 'road'],
        [375, 375, 90, 'road'],
        [375, 325, 90, 'road'],
        [400, 300, 0, 'road'],
        [400, 250, 0, 'road'],
        [400, 200, 0, 'road'],
        [400, 150, 0, 'road'],

        [500, 150, 0, 'road'],
        [500, 200, 0, 'road'],
        [525, 225, 90, 'road'],
        [525, 275, 90, 'road'],
        [500, 300, 0, 'road'],
        [525, 325, 90, 'road'],
        [525, 375, 90, 'road'],
        [500, 400, 0, 'road'],
        [525, 425, 90, 'road'],
        [525, 475, 90, 'road'],
        [500, 500, 0, 'road'],
        [500, 550, 0, 'road'],

        [550, 550, 0, 'road'],
        [550, 500, 0, 'road'],
        [550, 400, 0, 'road'],
        [575, 325, 90, 'road'],
        [575, 275, 90, 'road'],
        [575, 225, 90, 'road'],
        [625, 225, 90, 'road'],
        [625, 275, 90, 'road'],
        [625, 337.5, -63.435, 'diagonal_road'],
        [625, 387.5, -63.435, 'diagonal_road'],
        [600, 400, 0, 'road'],
        [625, 412.5, 63.435, 'diagonal_road'],
        [625, 462.5, 63.435, 'diagonal_road'],
        [600, 500, 0, 'road'],
        [600, 550, 0, 'road'],
        [675, 437.5, 63.435, 'diagonal_road'],
        [675, 362.5, -63.435, 'diagonal_road'],
        [675, 275, 90, 'road'],
        [675, 225, 90, 'road'],

        [700, 150, 0, 'road'],
        [700, 200, 0, 'road'],
        [700, 300, 0, 'road'],
        [700, 350, 0, 'road'],
        [700, 450, 0, 'road'],
        [700, 500, 0, 'road'],
        [700, 550, 0, 'road'],

        [750, 550, 0, 'road'],
        [750, 500, 0, 'road'],
        [750, 450, 0, 'road'],
        [825, 425, 90, 'road'],
        [775, 425, 90, 'road'],
        [775, 375, 90, 'road'],
        [825, 375, 90, 'road'],
        [750, 350, 0, 'road'],
        [750, 350, 0, 'road'],
        [750, 300, 0, 'road'],
        [750, 250, 0, 'road'],
        [750, 200, 0, 'road'],
        [750, 150, 0, 'road'],
    ]
    

    for (var i = 0; i < road_map.length; i++){
        var road = game.add.sprite(road_map[i][0], road_map[i][1], road_map[i][3]);
        road.anchor.set(0.5);
        road.angle += road_map[i][2]
        road.scale.set(0.5);
        road.inputEnabled = true;
        road.input.enableDrag(true);
    }
    
}

 // Creating obstacles
function creating_obstacles() {
    for(var i = 0; i < 8; i++){
        var random_car = game.add.sprite(50, 50, 'random_car');
        random_car.angle += i*90;
        random_car.scale.set(0.15);
        random_car.inputEnabled = true;
        random_car.input.enableDrag(true);
    }
}

// Goal
function creating_goal() {
    goal = game.add.sprite(100, 200, 'goal');
    goal.anchor.set(0.5);
    goal.scale.set(0.15);
    goal.inputEnabled = true;
    goal.input.enableDrag(true);
}