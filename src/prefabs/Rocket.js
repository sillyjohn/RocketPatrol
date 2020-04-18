class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);

        //add object to existing scene
        scene.add.existing(this);
        
        this.isFiring = false;
        this.firingControl = false;
        //rocket sfx
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

update(){
    //left / right movement
    if(!this.isFiring){
        if(keyLEFT.isDown&& this.x >= 47){
            this.x -= 12;
        }else if(keyRIGHT.isDown && this.x <= 598){
            this.x += 12;
        }


    }
    //fire button
    if(Phaser.Input.Keyboard.JustDown(keyUP)){
        this.isFiring = true;
        this.firingControl = true;
        this.sfxRocket.play();
        }
    //if fired, move up
    if(this.isFiring && this.y >= 108 && keyLEFT.isDown){
        this.y -= 8;
        this.x += -12;
    }else if(this.isFiring && this.y >= 108 && keyRIGHT.isDown){
        this.y -= 8;
        this.x -= -12;

    }else if(this.isFiring && this.y >= 108)
    {
        this.y -= 8;
    }

    //reset on miss
    if(this.y <= 108){
        this.isFiring = false;
        this.y = 431;

    }
}   
    reset(){

        this.isFiring = false;
        this.y = 431;
    }


}