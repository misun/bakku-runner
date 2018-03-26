const PlatformManager = require('./platform_manager');
const Player = require('./player');
const { random, randomColor } = require('./util');
const Racoon = require('./racoon');
const Background = require('./background');

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
  40: 'DOWN'
};

class Game {
  constructor(ctx){
    this.jumpCount = 0;
    this.aceleration = 0;
    this.acelerationTweening = 0;
    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;
    this.collidedPlatform = null;
    this.scoreColor = '#181818';
    this.jumpCountRecord = 0;
    this.keys = [];

    for( var name in keynames){
      this.keys[keynames[name]] = false;
    }
    this.ctx = ctx;
    this.gamePlaying = false;

    //load Objects
    this.player = new Player({
      x: 150,
      y: 30,
      width: 111,
      height: 53,
      drawingWidth: 131,
      drawingHeight: 63,
      src: "./assets/images/dog_sprite2.png",
      game: this
    });

    this.racoon = new Racoon({
      src: "./assets/images/raccoon_sprite3.png",
      width: 58,
      height: 67,
      drawingWidth: 78,
      drawingHeight: 77
    });

    this.platformManager = new PlatformManager({
      width: this.width,
      height: this.height,
      aceleration: this.aceleration,
      racoon: this.racoon
    });

    //load background
    this.background = new Background({src: "./assets/images/bg2.jpg"});

    //event listener
    document.addEventListener('keydown', this.keydown.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));

    document.querySelector('.bg-sound').addEventListener('click', this.toggleSound.bind(this));

    document.querySelector('.other-sound').addEventListener('click', this.toggleSound.bind(this));

    //laod Sounds
    this.setSounds.bind(this);
    this.setSounds();
    this.bgSound.play();
  }
  setSounds() {
    this.jumpSound = new Audio('./assets/sounds/jump.mp3');
    this.bgSound = new Audio('./assets/sounds/bg.ogg');
  }
  toggleSound(e){
    if( e.currentTarget.className === 'bg-sound'){
      this.bgSound.paused ? this.bgSound.play() : this.bgSound.pause();

    }else{
      // debugger
      this.jumpSound.paused ? this.jumpSound.play() : this.jumpSound.pause();
    }
    const [originText1, originText2] = e.currentTarget.innerText.split(' ');

    originText2 === 'On' ? (e.currentTarget.innerText = originText1.concat(' ','Off')) : (e.currentTarget.innerText = originText1.concat(' ','On'));
  }
  start() {
    if (this.gamePlaying) return;
    this.gamePlaying = true;

    this.lastTime = 0;

    this.now = Date.now();
    requestAnimationFrame(this.animate.bind(this));
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    if (this.gamePlaying) {
      this.updateStatus(this.dt);
      this.clear();
      this.draw(this.ctx);
      this.lastTime = time;
    }else{ //game end
      this.ctx.font = "30px Comic Sans MS";
      this.ctx.fillStyle = "red";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = 'bottom';
      this.ctx.fillText("The Game End", this.width/2, this.height/2);
    }
    requestAnimationFrame(this.animate.bind(this));
  }

  keydown(event) {
    // debugger
    this.keys[keynames[event.keyCode]] = true;
    this.jumpSound.play();
  }

  keyup(event) {
    this.keys[keynames[event.keyCode]] = false;
    this.jumpSound.pause();
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

    for (let i = 0; i < this.platformManager.platforms.length; i++) {
      if (this.player.isCollidedWith(this.platformManager.platforms[i])) {
        this.collidedPlatform = this.platformManager.platforms[i];
        if (this.player.y < this.platformManager.platforms[i].y) {
          this.player.y = this.platformManager.platforms[i].y;
          this.player.velocityY = 0;
        }

        this.player.x = this.player.prevX;
        this.player.y = this.player.prevY;


        if (this.player.isCollidedWithLeft(this.platformManager.platforms[i])) {
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

    //check collision with racoon
    if (this.player.isCollidedWith(this.racoon)){
      this.gamePlaying = false;
    }

    //check the player fall into the ground
    const playerPosY = this.player.y + this.player.height;
    if (playerPosY > this.height){
      this.gamePlaying = false;
    }
  }

  draw(ctx){
    this.background.draw(ctx);
    this.player.draw(ctx);
    this.platformManager.draw(ctx);

    ctx.font = '12pt Arial';
    ctx.fillStyle = '#181818';
    ctx.fillText('SCORE: ' + this.jumpCountRecord, this.width - (150 + (this.aceleration * 4)), 33 - (this.aceleration * 4));

    ctx.fillStyle = this.scoreColor;
    ctx.font = (12 + (this.aceleration * 3)) + 'pt Arial';
    ctx.fillText('JUMPS: ' + this.jumpCount, this.width - (150 + (this.aceleration * 4)), 50);
  }

}

module.exports = Game;
