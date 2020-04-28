class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){

        this.load.image('rocket','./assets/rocket.png');
        this.load.image('spaceship','./assets/spaceship.png');
        this.load.image('starfield','./assets/starfield.png');
        this.load.image('newStarfield','./assets/TileSprite_2.png');
        this.load.image('spaceShip2','./assets/spaceShip_2.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('background_music','./assets/background.mp3');
        
    }
    create() {
        //place tile sprite
        this.starfield = this.add.tileSprite(0,0,640,480,'newStarfield').setOrigin(0,0);
        //display Rocket Patrol Play
        this.add.text(20,20,"Rocket Patrol Play");
        //white rectangle border
        // this.add.rectangle(5,5,630,32,0xFFFFFF).setOrigin(0,0);
        // this.add.rectangle(5,443,630,32,0xFFFFFF).setOrigin(0,0);
        // this.add.rectangle(5,5,32,455,0xFFFFFF).setOrigin(0,0);
        // this.add.rectangle(603,5,32,455,0xFFFFFF).setOrigin(0,0);



        //green UI background
        this.add.rectangle(37,42,566,64,0x00FF00).setOrigin(0,0);

        // add rocket
        this.p1Rocket = new Rocket(this,game.config.width/2,431,'rocket').setScale(0.5,0.5).setOrigin(0,0);
        // if(game.settings.twoPlayer == true){
        //     this.p2Rocket = new Rocket2(this,game.config.width/3,431,'rocket').setScale(0.5,0.5).setOrigin(0,0);
        // }
        this.p2Rocket = new Rocket2(this,game.config.width/3,431,'rocket').setScale(0.5,0.5).setOrigin(0,0);
        
        // add spaceship
        this.ship01 = new Spaceship(this,game.config.width+192, Math.floor(Math.random()*Math.floor(300))+100, 'spaceship',0,30).setOrigin(0,0);
        this.ship02 = new Spaceship(this,game.config.width+ 40, Math.floor(Math.random()*Math.floor(300))+100, 'spaceship',0,20).setOrigin(0,0);
        this.ship03 = new Spaceship(this,game.config.width, Math.floor(Math.random()*Math.floor(300))+100, 'spaceship',0,10).setOrigin(0,0);
        this.ship04 = new Spaceship2(this,game.config.width, Math.floor(Math.random()*Math.floor(300))+100, 'spaceShip2',0,1000).setOrigin(0,0);

        //define keyboard keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //animation config
        this.anims.create(
            {
                key: 'explode',
                frames: this.anims.generateFrameNumbers('explosion',{start: 0, end: 9, first: 0}),
                frameRate: 30
            }
        );
        //score
        this.p1Score = 0;
        //highest score
        
       console.log(highest);
        //score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor:'#F3B141',
            color:'#843605',
            align:'right',
            padding:{
                top: 5,
                bottom:5,
            },
            fixedWidth:100
        }
        let scoreConfig2 = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor:'#F3B141',
            color:'#843605',
            align:'left',
            padding:{
                top: 5,
                bottom:5,
            },
            fixedWidth:300
        }
        
        
        this.scoreLeft = this.add.text(69, 54, this.p1Score,scoreConfig);
        //display higest score
        this.add.text(300,54,'Highest Score:'+highest,scoreConfig2);
      
        //game over flag
        this.gameOver = false;
        //60sec timer
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer,()=>{
            this.add.text(game.config.width/2,game.config.height/2,'GAME OVER',scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2,game.config.height/2+64, '(F)ire to restart or <- for menu', scoreConfig).setOrigin(0.5);    
            this.gameOver = true;
        }, null, this);
        
        //add background music
        this.music = game.sound.add('background_music');
        this.music.play();
    }

    update(){
        //scroll starfield
        this.starfield.tilePositionX -= 4;

        if(!this.gameOver){
            //update rocket
            this.p1Rocket.update();
            this.p2Rocket.update();
            //update spaceship
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }
      
        //check collision
        if(this.checkCollision(this.p1Rocket,this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket,this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);

        }
        if(this.checkCollision(this.p1Rocket,this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        } 
        if(this.checkCollision(this.p1Rocket,this.ship04)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        //rocket 1
        
        if(this.checkCollision(this.p2Rocket,this.ship01)){ 
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p2Rocket,this.ship02)){
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);

        }
        if(this.checkCollision(this.p2Rocket,this.ship03)){
            this.p2Rocket.reset();
            this.shipExplode(this.ship03);
        } 
        if(this.checkCollision(this.p2Rocket,this.ship04)){
            this.p2Rocket.reset();
            this.shipExplode(this.ship04);
        }
        //rocket 2

       //check key input for restart
       if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyUP)){
           this.scene.restart('this.p1Score');
       }
       if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
           this.scene.start("menuScene");
       }
        //update highest Score
       console.log(this.p1Score+"current score");
       if(this.p1Score > highest){
        highest = this.p1Score;
        console.log(highest);
        console.log(game.settings.gameTimer);
       }
    }
   
    checkCollision(rocket,ship){
        //simple aabb checking
        if(rocket.x < ship.x+ ship.width&&
            rocket.x + rocket.width>ship.x&&
            rocket.y <ship.y+ship.height&&
            rocket.height+rocket.y >ship.y){
                return true;
        }else{
            return false;
        }

    }
    
    shipExplode(ship){
        ship.alpha = 0;

        //create explosion
        let boom = this.add.sprite(ship.x,ship.y,'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete',()=>{

            ship.reset();
            ship.alpha =1;
            boom.destroy();
        });
        //score increment and repaint
        this.p1Score += ship.points; 
        this.scoreLeft.text = this.p1Score;
        //explosion sound
        this.sound.play('sfx_explosion');

    }

       



    
}