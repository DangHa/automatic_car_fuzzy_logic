var signal_x;
var signal_y;
var signal_front;
var signal_frontx;
var signal_fronty;
var traffic_signal;

var signalXCollistionGroup;
var signalYCollistionGroup;
var signalFrontCollistionGroup;
var signalFrontXCollistionGroup;
var signalFrontYCollistionGroup;
var trafficSignalCollistionGroup;

// distances from 5 directions
var denta_x = 0;
var denta_y = 0;
var front   = 0;
var front_x = 0;
var front_y = 0;
var traffic = 0;

var car_angle = auto_car.body.angle;

function automatic_finding_way () {
    var velocity = 100; 
    var angularVelocity = 1

    // turn on signal
    control_signal()

    //moving by fuzzy logic
    moving_by_fuzzy_logic()
}

function moving_by_fuzzy_logic() {
    auto_car.body.velocity.y = -10
    fuzzy_function()
    return 0;
}

function fuzzy_function() {

}

// -------------  SIGNAL FUNCTION ---------------------------
function control_signal() {
    var signalVelocity = 400

    //signal X
    if (signal_x.alive) {
        signal_x.body.velocity.x = signalVelocity*Math.sin((car_angle-90)*Math.PI/180);
        signal_x.body.velocity.y = -signalVelocity*Math.cos((car_angle-90)*Math.PI/180);

        if (calculate_dentaX() > 500) {
            signal_x.kill()
            denta_x = 500;
        }
    }else {
        signal_x.reset(auto_car.x, auto_car.y);  // create new signal
        car_angle = auto_car.body.angle;         // update angle
    }

    //signal Y
    if (signal_y.alive) {
        signal_y.body.velocity.x = signalVelocity*Math.sin((car_angle+90)*Math.PI/180);
        signal_y.body.velocity.y = -signalVelocity*Math.cos((car_angle+90)*Math.PI/180);
        if (calculate_dentaX() > 500) {
            signal_y.kill()
            denta_y = 500;
        }
    }else {
        signal_y.reset(auto_car.x, auto_car.y);
        car_angle = auto_car.body.angle;
    }

    //signal front
    if (signal_front.alive) {
        signal_front.body.velocity.x = signalVelocity*Math.sin(car_angle*Math.PI/180);
        signal_front.body.velocity.y = -signalVelocity*Math.cos(car_angle*Math.PI/180);
        if (calculate_front() > 500) {
            signal_front.kill()
            front = 500;
        }
    }else {
        car_angle = auto_car.body.angle;
        var [reset_point_x, reset_point_y] = reset_point()

        signal_front.reset(reset_point_x, reset_point_y);           
    }

    //signal front X
    if (signal_frontx.alive) {
        signal_frontx.body.velocity.x = signalVelocity*Math.sin((car_angle-30)*Math.PI/180);
        signal_frontx.body.velocity.y = -signalVelocity*Math.cos((car_angle-30)*Math.PI/180);
        if (calculate_frontX() > 500) {
            signal_frontx.kill()
            front_x = 500;
        }
    }else {
        car_angle = auto_car.body.angle;
        var [reset_point_x, reset_point_y] = reset_point()

        signal_frontx.reset(reset_point_x, reset_point_y);        
    }

    //signal front Y
    if (signal_fronty.alive) {
        signal_fronty.body.velocity.x = signalVelocity*Math.sin((car_angle+30)*Math.PI/180);
        signal_fronty.body.velocity.y = -signalVelocity*Math.cos((car_angle+30)*Math.PI/180);
        if (calculate_frontY() > 500) {
            signal_fronty.kill()
            front_y = 500;
        }
    }else {
        car_angle = auto_car.body.angle;
        var [reset_point_x, reset_point_y] = reset_point()

        signal_fronty.reset(reset_point_x, reset_point_y);
    }

    // --- traffic signal ---
    if (traffic_signal.alive) {
        traffic_signal.body.velocity.x = signalVelocity*Math.sin(car_angle*Math.PI/180);
        traffic_signal.body.velocity.y = -signalVelocity*Math.cos(car_angle*Math.PI/180);

        if (calculate_trafficLight() > 200) {
            traffic_signal.kill()
            traffic = 200;
        }
        
    }else {
        // handle the error of library phaserjs - when one object overlap on another 
        if (calculate_trafficLight() >  7 || traffic === 0) {
            traffic_signal.reset(auto_car.x, auto_car.y);
            car_angle = auto_car.body.angle;   
        }
    }
}

// signal collision function ----------------------
function signalX_obstacle_collisionHandler() {
    denta_x = calculate_dentaX();
    // console.log("dentaX: " + denta_x);
    signal_x.kill();
}

function signalY_obstacle_collisionHandler() {
    denta_y = calculate_dentaY();
    // console.log("dentaY: " + denta_y);
    signal_y.kill();
}

function signalFront_obstacle_collisionHandler() {
    front = calculate_front();   
    // console.log("Front: " + front);
    signal_front.kill();
}

function signalFrontX_obstacle_collisionHandler() {
    front_x = calculate_frontX();
    // console.log("FrontX: " + front_x);
    signal_frontx.kill();
}

function signalFrontY_obstacle_collisionHandler() {
    front_y = calculate_frontY();
    // console.log("FrontY: " + front_y);
    signal_fronty.kill();
}

// traffic sinal
function trafficSignal_trafficLight_collisionHandler(body1, body2) {
    traffic = calculate_trafficLight() - error_y - 6;
    // console.log("Traffic Light2: " + traffic);
    
    // console.log(body2)  // -----------next time--------------> find color in here  --> need to add animation for traffic light
    traffic_signal.kill();
}

function trafficSignal_obstacle_collisionHandler() {
    traffic_signal.kill();
}

// set up signal by weapon function in phaserjs ----
function set_up_signal() {
    signal_x      = game.add.sprite(auto_car.x, auto_car.y, 'signal');
    signal_y      = game.add.sprite(auto_car.x, auto_car.y, 'signal');
    signal_front  = game.add.sprite(auto_car.x, auto_car.y, 'signal');
    signal_frontx = game.add.sprite(auto_car.x, auto_car.y, 'signal');
    signal_fronty = game.add.sprite(auto_car.x, auto_car.y, 'signal');
    
    game.physics.p2.enable([signal_x, signal_y, signal_front, signal_frontx, signal_fronty], false);

    signal_x.body.setCollisionGroup(signalXCollistionGroup);
    signal_x.body.collides(obstacleCollisionGroup, signalX_obstacle_collisionHandler, this);
    signal_x.kill()

    signal_y.body.setCollisionGroup(signalYCollistionGroup);
    signal_y.body.collides(obstacleCollisionGroup, signalY_obstacle_collisionHandler, this);
    signal_y.kill()

    signal_front.body.setCollisionGroup(signalFrontCollistionGroup);
    signal_front.body.collides(obstacleCollisionGroup, signalFront_obstacle_collisionHandler, this);
    signal_front.kill()

    signal_frontx.body.setCollisionGroup(signalFrontXCollistionGroup);
    signal_frontx.body.collides(obstacleCollisionGroup, signalFrontX_obstacle_collisionHandler, this);
    signal_frontx.kill()

    signal_fronty.body.setCollisionGroup(signalFrontYCollistionGroup);
    signal_fronty.body.collides(obstacleCollisionGroup, signalFrontY_obstacle_collisionHandler, this);
    signal_fronty.kill()

    //--- traffic signal ---
    traffic_signal = game.add.sprite(auto_car.x, auto_car.y, 'signal');
    game.physics.p2.enable([traffic_signal], false);
    traffic_signal.body.setCollisionGroup(trafficSignalCollistionGroup);
    traffic_signal.body.collides(trafficLightCollisionGroup, trafficSignal_trafficLight_collisionHandler, this);
    traffic_signal.kill()
}