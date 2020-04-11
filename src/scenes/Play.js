class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    create() {
        console.log(this);
        this.add.text(20,20,"Rocket Patrol Play");

    }

}