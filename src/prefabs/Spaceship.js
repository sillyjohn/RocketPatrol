class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture,frame,pointValue){
        super(scene,x,y,texture,frame);

        //add object to existing scene
        scene.add.existing(this);
        this.points = pointValue;
      
        var creatY = y;
    }

update(){
    //move spacship left
//    switch(getRandom(2)){
//     case 0 : 
//         this.x -= game.settings.spaceshipSpeed;
//         break;
//     case 1:
//         this.y += game.settings.spaceshipSpeed;
//         this.x -= game.settings.spaceshipSpeed;

//    }
    this.x -= game.settings.spaceshipSpeed;
    
    //wrap around screen bounds
    if(this.x <= 0 - this.width|| this.y >= 480 + this.height) {
        this.reset();
    }

   
}   

reset(){
    this.x = game.config.width;
    
}

}