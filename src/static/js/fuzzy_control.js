function moving_by_fuzzy_logic() {
    // Deviation
    controlling_deviation()

    // Speed
    controlling_speed()  
}

// --------------------------------------------------------------
// ------------------- Deviation control ------------------------
function controlling_deviation() {    
    // Deviation-steering
    deviation = denta_x/(denta_x+denta_y);
    console.log("Deviation: " + deviation);
    
    var angular = choosing_deviation_steering_rules(deviation);
    console.log("Final fuzzy result: " + (angular+0.5));
    
    auto_car.body.angularVelocity = angular * 3;
}

// Deviation-Steering Rules
// Step 1: caculate weight of each case
// Step 2: caculate the result for each case
// Step 3: The final result (average with weights for each one)
function choosing_deviation_steering_rules(deviation){
    var result_numerator = 0;
    var result_denominator = 0;

    // Step 1 and 2
    if(deviation < 0.4) {
        var [weight, result] = far_left_deviation(deviation);
        result_numerator += weight*result;
        result_denominator += weight
    }
    if(deviation > 0.25 && deviation < 0.5){
        var [weight, result] = left_deviation(deviation)
        result_numerator += weight*result;
        result_denominator += weight
    }
    if(deviation > 0.4 && deviation < 0.6){
        var [weight, result] = medium_deviation(deviation)
        result_numerator += weight*result;
        result_denominator += weight
    }
    if(deviation > 0.5 && deviation < 0.75){
        var [weight, result] = right_deviation(deviation)
        result_numerator += weight*result;
        result_denominator += weight
    }
    if(deviation > 0.6){
        var [weight, result] = far_right_deviation(deviation)
        console.log("weight : " + weight)
        console.log("result : " + result)
        result_numerator += weight*result;
        result_denominator += weight
    }

    // Step 3
    var final_fuzzy = 0.5;
    if (result_denominator !==  0){
        var final_fuzzy = result_numerator/result_denominator
    }

    return final_fuzzy - 0.5
}

// ------- Deviation rules -------------
function far_left_deviation(deviation) {
    // Step 1
    var u_FL = 0
    if (deviation <= 0.25){
        u_FL = 1
    }else if(deviation > 0.25){
        u_FL = (0.4-deviation)/0.15
    }

    // Step 2 (steering)
    result = hard_right_steering(u_FL)
    
    return [u_FL, result]
}

function left_deviation(deviation) {
    var u_L = 0
    if (deviation === 0.4){
        u_L = 1
    }else if(deviation < 0.4){
        u_L = (deviation-0.25)/0.15
    }else if(deviation > 0.4){
        u_L = (0.5-deviation)/0.1
    }

    result = right_steering(u_L)

    return [u_L, result]
}

function medium_deviation(deviation) {
    var u_M = 0
    if (deviation === 0.5){
        u_M = 1
    }else if(deviation < 0.5){
        u_M = (deviation-0.4)/0.1
    }else if(deviation > 0.5){
        u_M = (0.6-deviation)/0.1
    }

    result = medium_steering(u_M)

    return [u_M, result]
}

function right_deviation(deviation) {
    var u_R = 0
    if (deviation === 0.6){
        u_R = 1
    }else if(deviation < 0.6){
        u_R = (deviation-0.5)/0.1
    }else if(deviation > 0.6){
        u_R = (0.75-deviation)/0.15
    }

    result = left_steering(u_R)

    return [u_R, result]
}

function far_right_deviation(deviation) {
    var u_FR = 0
    if (deviation >= 0.75){
        u_FR = 1
    }else if(deviation < 0.75){
        u_FR = (deviation-0.6)/0.15
    }

    result = hard_left_steering(u_FR)

    return [u_FR, result]
}

// ------- Steering rules-------------
function hard_right_steering(weight) {
    var a = 1;
    var b = weight*0.15+0.6;

    return (a+b)/2
}

function right_steering(weight) {
    var a = weight*0.1+0.5;
    var b = 0.75-weight*0.15;

    return (a+b)/2
}

function medium_steering(weight) {
    var a = weight*0.1+0.4;
    var b = 0.6-weight*0.1;

    return (a+b)/2
}

function left_steering(weight) {
    var a = weight*0.15+0.25;
    var b = 0.5-weight*0.1;

    return (a+b)/2
}

function hard_left_steering(weight) {
    var a = 0;
    var b = 0.4-weight*0.15;

    return (a+b)/2
}

// --------------------------------------------------------------
// ------------------- Speed control ------------------------
function controlling_speed(){
    var velocity = 30;
    auto_car.body.velocity.x = velocity*Math.sin(auto_car.body.angle*Math.PI/180);
    auto_car.body.velocity.y = -velocity*Math.cos(auto_car.body.angle*Math.PI/180);
  
    var speed = choosing_distance_trafficlight_speed_rules();
}

function choosing_distance_trafficlight_speed_rules(){

}