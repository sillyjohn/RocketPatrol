let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene:[ Menu, Play ],
    
};

let game = new Phaser.Game(config);
let highest = 0;

//reserve some keyboard variable

let keyUP, keyLEFT,keyRIGHT,keyW,keyA,keyD;

//define game setting 

game.settings = {

    spaceshipSpeed:3,
    gameTimer:60000,
    twoPlayer: false,

}

function getRandom(max){
    return Math.floor(Math.random()*Math.floor(max));
}
