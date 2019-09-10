var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        upload: upload
    }
};

var game = new Phaser.Game(config);

// Reloading all resources of the game
function preload () {

    this.load.image('random_car', './assets/images/random_car.jpg')
    this.load.image('auto_car', './assets/images/auto_car.jpg')

}

// Creating some objects in the map
function create () {
    var random_car = this.physics.add.image(100, 200, 'random_car').setScale(0.1);
    random_car.setVelocity(100, 200);
    random_car.setBounce(1, 1);
    random_car.setCollideWorldBounds(true);

    var auto_car = this.physics.add.image(200, 100, 'auto_car').setScale(0.1);
    auto_car.setVelocity(100, 200);
    auto_car.setBounce(1, 1);
    auto_car.setCollideWorldBounds(true);
}

// Updating object and map when we have anyhing changed
function upload() {
 // waitting ...
}

