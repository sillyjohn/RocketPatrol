class Rocket2 extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);

        //add object to existing scene
        scene.add.existing(this);
        
        this.isFiring = false;
        //rocket sfx
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

update(){
    //left / right movement
    if(!this.isFiring){
        if(keyA.isDown&& this.x >= 47){
            this.x -= 12;
        }else if(keyD.isDown && this.x <= 598){
            this.x += 12;
        }


    }
    //fire button
    if(Phaser.Input.Keyboard.JustDown(keyW)){
        this.isFiring = true;
        this.sfxRocket.play();
        }
    //if fired, move up
    if(this.isFiring && this.y >= 108 && keyA.isDown){
        this.y -= 8;
        this.x += -12;
    }else if(this.isFiring && this.y >= 108 && keyD.isDown){
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