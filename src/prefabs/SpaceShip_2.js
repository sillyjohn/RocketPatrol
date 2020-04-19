class Spaceship2 extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture,frame,pointValue){
        super(scene,x,y,texture,frame);

        //add object to existing scene
        scene.add.existing(this);
        this.points = pointValue;
      

    }

update(){
    //move spacship left
//    switch(Math.random()){
//     case 0 : 
//         this.x -= game.settings.spaceshipSpeed;
//     case 1:
//         this.y += game.settings.spaceshipSpeed;
//         this.x -= game.settings.spaceshipSpeed;

//    }
    this.x -= game.settings.spaceshipSpeed*1.5;
    
    //wrap around screen bounds
    if(this.x <= 0 - this.width) {
        this.reset();
    }

    // if(this.y >= 480 + this.height){
    //     this.reset();

    // }
}   

reset(){
    this.x = game.config.width;
}

}