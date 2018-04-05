const PlatformManager = require('./platform_manager');
const Player = require('./player');
const { random, randomColor } = require('./util');
const Racoon = require('./racoon');
const Background = require('./background');
const Water = require('./water');
const Bear = require('./bear');
const Wolf = require('./wolf');
const Score = require('./score');

const keynames = {
  8: 'BACKSPACE',
  9: 'TAB',
  13: 'ENTER',
  16: 'SHIFT',
  27: 'ESCAPE',
  32: 'SPACE',
  37: 'LEFT',
  38: 'UP',
  39: 'RIGHT',
  40: 'DOWN',
  77: 'M'
};

class Game {
  constructor({ctx, menu}){
    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;
    this.ctx = ctx;
    this.menu = menu;
    this.level = null;
    this.keys = [];
    for( var name in keynames){
      this.keys[keynames[name]] = false;
    }
    //load Objects
    this.player = new Player({
      x: 150,
      y: 30,
      width: 111,
      height: 53,
      drawingWidth: 131,
      drawingHeight: 63,
      src: "./assets/images/dog_sprite.png",
      game: this
    });

    //load enemies
    const collinsionEnemyPos = {
      width: 58,  //collision width
      height: 67 //collision height
    };
    this.racoon = new Racoon(collinsionEnemyPos);
    this.wolf = new Wolf(collinsionEnemyPos);
    this.bear = new Bear(collinsionEnemyPos);

    this.background_seattle = new Background({
      src: "./assets/images/bg_seattle.jpg",
      width:9992 ,
      height:3333
    });

    this.background_city = new Background({
      src: "./assets/images/bg_newyork.jpg",
      width: 9458,
      height: 3333
    });

    this.background_winter = new Background({
      src: "./assets/images/bg_winter.jpg",
      width: 6666,
      height: 3333
    });
    this.water = new Water();
    //event listener
    document.addEventListener('keydown', this.keydown.bind(this));
    // document.addEventListener('keydown', this.reset.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));

    document.getElementById('bg-sound').addEventListener('click', this.toggleSound.bind(this));

    //laod Sounds
    this.setSounds.bind(this);
    this.setSounds();

    this.score = new Score({
      width: this.width,
      height: this.height,
      time: Date.now()
    });
  }

  setup(){
    this.score.time = Date.now();
    this.jumpCount = 0;
    this.aceleration = 0;
    this.acelerationTweening = 0;
    this.collidedPlatform = null;
    this.scoreColor = '#181818';
    this.jumpCountRecord = 0;
    this.gamePlaying = false;

    if ( this.level === "EASY" ){
      this.enemy = this.racoon;
    }else if ( this.level === "MEDIUM"){
      this.enemy = this.wolf;
    }else{
      this.enemy = this.bear;
    }

    this.player.x = 150;
    this.player.y = 30;

    //load background
    if (this.level === "EASY"){
      this.background = this.background_seattle;
      this.platformManager = new PlatformManager({
        width: this.width,
        height: this.height,
        aceleration: this.aceleration,
        enemy: this.enemy,
        src: "./assets/images/platform_seattle.png",
        imgWidth: 450,
        imgHeight: 71
      });
    }else if (this.level === "MEDIUM"){
      this.background = this.background_city;
      this.platformManager = new PlatformManager({
        width: this.width,
        height: this.height,
        aceleration: this.aceleration+1,
        enemy: this.enemy,
        src: "./assets/images/platform_newyork.png",
        imgWidth: 246,
        imgHeight: 71
      });
    }else{
      this.background = this.background_winter;
      this.platformManager = new PlatformManager({
        width: this.width,
        height: this.height,
        aceleration: this.aceleration+2,
        enemy: this.enemy,
        src: "./assets/images/platform_winter.png",
        imgWidth: 123,
        imgHeight: 46
      });
    }
  }
  start() {
    this.setup();
    if (this.gamePlaying) return;
    this.gamePlaying = true;
    this.lastTime = 0;
    this.toggleSound();
    const fps = 80;
    this.fpsInterval = 1000 / fps;
    this.then = Date.now();
    this.startTime = this.then;

    this.animate();
  }
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  animate() {
    if (!this.gamePlaying) {
      this.end();
      return;
    }
    requestAnimationFrame(this.animate.bind(this));
    // calc elapsed time since last loop
    const now = Date.now();
    const elapsed = now - this.then;

    if (elapsed > this.fpsInterval) {
        this.updateStatus(this.dt);
        this.clear();
        this.draw(this.ctx);
        this.then = now - (elapsed % this.fpsInterval);
    }
  }
  end(){
    // console.log('the end');
    this.ctx.shadowColor = "black";
    this.ctx.shadowOffsetX = 3;
    this.ctx.shadowOffsetY = 3;
    this.ctx.shadowBlur = 7;
    this.ctx.font = "30px Ubuntu"; //"50px POLYPTY";
    this.ctx.fillStyle = "white";
    // this.ctx.textAlign = "center";
    this.ctx.fillText("Press 'ENTER' to reset", this.width/2, this.height/3);
    this.ctx.font = "30px Ubuntu"
    this.ctx.fillText("Press 'M' to go back to menu", this.width/2, this.height/3+60);

    //remove textshadow
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = 0;
    this.ctx.shadowColor = 0;
    this.ctx.shadowBlur = -1;
    this.dogCryingSound.play();
    this.toggleSound();
  }

  keydown(event) {
    this.keys[keynames[event.keyCode]] = true;

    if (this.keys.ENTER){
      this.start();
    }else if(this.keys.UP){
      this.jumpSound.play();
    }else if(this.keys.M){
      this.openMenu();
    }
  }
  openMenu(){
    this.menu.style.display = "block";
  }
  keyup(event) {
    // debugger
    this.keys[keynames[event.keyCode]] = false;
    if (this.keys.W){
      this.jumpSound.pause();
    }
  }
  setSounds() {
    if (!this.jumpSound)
      this.jumpSound = new Audio('./assets/sounds/jump.mp3');
    if (!this.bgSound)
      this.bgSound = new Audio('./assets/sounds/bg.ogg');
    if (!this.dogCryingSound)
      this.dogCryingSound = new Audio('./assets/sounds/dog_crying2.mp3');
  }
  toggleSound(e){
    let target =  e ? e.currentTarget : document.getElementById('bg-sound');

    if( target.id === 'bg-sound'){
      this.bgSound.paused ? this.bgSound.play() : this.bgSound.pause();

    }
    const [originText1, originText2] = target.innerText.split(' ');
    originText2 === 'On' ? (target.innerText = originText1.concat(' ','Off')) : (target.innerText = originText1.concat(' ','On'));
  }

  updateStatus(){
    this.player.updateStatus();

    switch (this.jumpCount) {
      case 10:
        this.acelerationTweening = 1;
        this.platformManager.maxDistanceBetween = 430;
        this.scoreColor = '#076C00';
        break;
      case 25:
        this.acelerationTweening = 2;
        this.platformManager.maxDistanceBetween = 530;
        this.scoreColor = '#0300A9';
        break;
      case 40:
        this.acelerationTweening = 3;
        this.platformManager.maxDistanceBetween = 580;
        this.scoreColor = '#9F8F00';
        break;
    }

    this.aceleration += (this.acelerationTweening - this.aceleration) * 0.01;

    //check collision with plaforms
    for (let i = 0; i < this.platformManager.platforms.length; i++) {
      if(this.player.isCollidedWith(this.platformManager.platforms[i])){
        this.collidedPlatform = this.platformManager.platforms[i];

        if (this.player.y < this.platformManager.platforms[i].y) {
          this.player.y = this.platformManager.platforms[i].y;
          this.player.velocityY = 0;
        }

        this.player.x = this.player.prevX;
        this.player.y = this.player.prevY;


        if(this.player.isCollidedWithLeft(this.platformManager.platforms[i])) {

          this.player.x = this.collidedPlatform.x - 64;
          this.player.velocityY = -10 + -(this.aceleration * 4);
          this.player.velocityX = -20 + -(this.aceleration * 4);
        } else {

          if (this.dragging || this.keys.SPACE || this.keys.UP || this.keys.W) {
            this.player.velocityY = this.player.jumpSize;
            this.jumpCount++;
            if (this.jumpCount > this.jumpCountRecord) {
              this.jumpCountRecord = this.jumpCount;
            }
          }

        }
      }
    };

    for (let i = 0; i < this.platformManager.platforms.length; i++) {
      this.platformManager.updateStatus();
    };

    //check collision with enemy
    if (this.player.isCollidedWith(this.enemy)){
      this.gamePlaying = false;
    }

    //check the player fall into the ground
    const playerPosY = this.player.y + this.player.height;
    if (playerPosY > this.height){
      this.gamePlaying = false;
    }
    this.score.updateStatus();
  }

  draw(ctx){
    this.background.draw(ctx);
    this.water.draw(ctx);
    this.player.draw(ctx);
    this.platformManager.draw(ctx);
    this.score.draw(ctx);
  }

}

module.exports = Game;
