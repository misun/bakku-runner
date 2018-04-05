/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const random = (min, max) => {
    return Math.round(min + (Math.random() * (max - min)));
}
/* harmony export (immutable) */ __webpack_exports__["random"] = random;


const randomColor = (array) => {
  return array[Math.round(random(0, array.length -1 ))];
}
/* harmony export (immutable) */ __webpack_exports__["randomColor"] = randomColor;


const randomPlatfrom = ( array ) => {
  return array[Math.floor((Math.random() * ( array.length - 1)))];
}
/* harmony export (immutable) */ __webpack_exports__["randomPlatfrom"] = randomPlatfrom;

const inherits = (ChildClass, ParentClass) => {
    function Surrogate(){};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
}
/* harmony export (immutable) */ __webpack_exports__["inherits"] = inherits;


class Vector{
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.drawingWidth = options.drawingWidth;
    this.drawingHeight = options.drawingHeight;
    this.prevX = 0;
    this.prevY = 0;
    this.setPos(options.x, options.y);
  }

  setPos(x, y){
    this.prevX = this.x;
    this.prevY = this.y;
    this.x = x;
    this.y = y;
  }

  isCollidedWith(otherObject) {
    if (this.x < otherObject.x + otherObject.width &&
     this.x + this.width > otherObject.x &&
     this.y < otherObject.y + otherObject.height &&
     this.height + this.y > otherObject.y) {
      // console.log(`collision detected!!`);
      return true;
    }
    return false;
  }

  isCollidedWithLeft(obj){
    if (obj.x < this.x + this.width && obj.y < this.y + this.height) {
      return true;
    }
    return false;
  }

}
/* harmony export (immutable) */ __webpack_exports__["Vector"] = Vector;
;
// Find distance between two points.
const dist = (pos1, pos2) => {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
}
/* harmony export (immutable) */ __webpack_exports__["dist"] = dist;



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const { Vector} = __webpack_require__(0);

const DOG_SPRITES = [
  { x: 0, y: 0 },
  { x: 141, y: 0 },
  { x: 282, y: 0 },

  { x: 0, y: 73 },
  { x: 141, y: 73 },
  { x: 282, y: 73 },

  { x: 0, y: 146 },
  { x: 141, y: 146 },
  { x: 282, y: 146 }
]

class Player extends Vector{
  constructor(options){
    super(options);

    this.velocityX = 0;
    this.velocityY = 0;
    this.jumpSize = -13;
    this.color = '#181818';
    this.game = options.game

    this.image = new Image();
    this.image.src = options.src;
    this.spriteSpeed = 0;
  }

  updateStatus(){
    this.velocityY += 1;
    this.setPos(this.x + this.velocityX, this.y + this.velocityY);

    if (this.y > this.game.height || this.x + this.width < 0) {
      this.x = 150;
      this.y = 50;
      this.velocityX = 0;
      this.velocityY = 0;
      this.game.jumpCount = 0;
      this.game.aceleration = 0;
      this.game.acelerationTweening = 0;
      this.game.scoreColor = '#181818';
      this.game.platformManager.maxDistanceBetween = 350;
      this.game.platformManager.updateWhenLose();
    }
    if ((this.game.keys.UP || this.game.keys.SPACE || this.game.keys.W || this.game.dragging) && this.velocityY < -8) {
      this.velocityY += -0.75;
    }

    this.spriteSpeed += 0.2;
  }
  
  draw(ctx) {
    const spriteIndex = parseInt(this.spriteSpeed) % DOG_SPRITES.length;
    const srcPlayerWidth = 141, srcPlayerHeight = 73;
    const sprite = DOG_SPRITES[spriteIndex];

    ctx.drawImage(this.image,
      sprite.x, sprite.y , srcPlayerWidth, srcPlayerHeight,
      this.x, this.y + 5, this.drawingWidth, this.drawingHeight);
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);
  }

}

module.exports = Player;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Platform = __webpack_require__(4);
const { random, randomColor, randomPlatfrom } = __webpack_require__(0);

class PlatformManager{
  constructor(options){
    this.maxDistanceBetween = 300;
    this.colors = ['#2ca8c2', '#98cb4a', '#f76d3c', '#f15f74', '#5481e6'];

    this.first = new Platform({
      x: 300,
      y: options.height -70,
      width: 800, //400,
      height: 70,
      src: options.src,
      imgWidth: options.imgWidth,
      imgHeight: options.imgHeight
    })
    this.second = new Platform({
      x: (this.first.x + this.first.width) + random(this.maxDistanceBetween - 150, this.maxDistanceBetween),
      y: random(this.first.y - 128, options.height - 80),
      width: 800, //400,
      height: 70,
      src: options.src,
      imgWidth: options.imgWidth,
      imgHeight: options.imgHeight
    })
    this.third = new Platform({
      x: (this.second.x + this.second.width) + random(this.maxDistanceBetween - 150, this.maxDistanceBetween),
      y: random(this.second.y - 128, options.height - 80),
      width: 800, //400,
      height: 70,
      src: options.src,
      imgWidth: options.imgWidth,
      imgHeight: options.imgHeight
    })
    this.first.height = this.first.y + options.height;
    this.second.height = this.second.y + options.height;
    this.third.height = this.third.y + options.height;
    this.first.color = randomColor(this.colors);
    this.second.color = randomColor(this.colors);
    this.third.color = randomColor(this.colors);

    this.platforms = [this.first, this.second, this.third];

    this.aceleration = options.aceleration;
    this.width = options.width;
    this.height = options.height;

    this.enemy = options.enemy;
  }

  draw(ctx){
    this.enemy.draw(ctx);
    for (let i = 0; i < this.platforms.length; i++) {
      // console.log(`${i} platform is drawing`)
      // debugger
      this.platforms[i].draw(ctx);
    };
  }

  updateStatus(){
    this.first.x -= 3 + this.aceleration;
    if (this.first.x + this.first.width < 0) {
      this.first.width = random(450, this.width + 200);
      this.first.x = (this.third.x + this.third.width) + random(this.maxDistanceBetween - 150, this.maxDistanceBetween);
      this.first.y = random(this.third.y - 32, this.height - 80);
      this.first.height = this.first.y + this.height + 10;
      this.first.color = randomColor(this.colors);
    }

    this.second.x -= 3 + this.aceleration;
    if (this.second.x + this.second.width < 0) {
      this.second.width = random(450, this.width + 200);
      this.second.x = (this.first.x + this.first.width) + random(this.maxDistanceBetween - 150, this.maxDistanceBetween);
      this.second.y = random(this.first.y - 32, this.height - 80);
      this.second.height = this.second.y + this.height + 10;
      this.second.color = randomColor(this.colors);
    }

    this.third.x -= 3 + this.aceleration;
    if (this.third.x + this.third.width < 0) {
      this.third.width = random(450, this.width + 200);
      this.third.x = (this.second.x + this.second.width) + random(this.maxDistanceBetween - 150, this.maxDistanceBetween);
      this.third.y = random(this.second.y - 32, this.height - 80);
      this.third.height = this.third.y + this.height + 10;
      this.third.color = randomColor(this.colors);
    }

    //enemy status
    const randPlatform = randomPlatfrom(this.platforms);
    // debugger
    this.enemy.updateStatus({
      x: this.second.x + this.second.width/2,
      y: this.second.y +10
    });

  }

  updateWhenLose(){
    this.first.x = 300;
    this.first.color = randomColor(this.colors);
    this.first.y = this.width / random(2, 3);
    this.second.x = (this.first.x + this.first.width) + random(this.maxDistanceBetween - 150, this.maxDistanceBetween);
    this.third.x = (this.second.x + this.second.width) + random(this.maxDistanceBetween - 150, this.maxDistanceBetween);
  }

}

module.exports = PlatformManager;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(1);
const PlatformManager = __webpack_require__(2);
const { random, randomColor } = __webpack_require__(0);
const Game = __webpack_require__(5);
const Sound = __webpack_require__(11);
const LevelHandler = __webpack_require__(12);

document.addEventListener('DOMContentLoaded', () => {
  console.log('bakku runner start');

  this.canvas = document.getElementById('container');
  this.ctx = this.canvas.getContext('2d');
  this.menu = document.getElementById('menu');
  const game = new Game({
    ctx: this.ctx,
    menu: this.menu
  });
  // debugger
  // game.toggleSound.bind(game);
  // game.toggleSound();
  //background music
  // this.sound = new Sound();
  // document.getElementById('bg-sound').addEventListener('click', this.sound.toggleSound.bind(this.sound));

  //handle levels
  this.levelHandler = new LevelHandler({ menu, game });
  this.levelHandler.easy.addEventListener('click', this.levelHandler.setLevel.bind(this.levelHandler));
  this.levelHandler.medium.addEventListener('click', this.levelHandler.setLevel.bind(this.levelHandler));
  this.levelHandler.hard.addEventListener('click', this.levelHandler.setLevel.bind(this.levelHandler));



});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const { Vector } = __webpack_require__(0);

class Platform extends Vector{
  constructor(options = {}){
    super(options)
    this.prevX = 0;
    this.prevY = 0;
    this.color = options.color;

    this.image = new Image();
    this.image.src = options.src;
    this.imgWidth = options.imgWidth;
    this.imgHeight = options.imgHeight;
  }

  draw(ctx){
    ctx.drawImage(this.image,0, 0, this.imgWidth, this.imgHeight, this.x, this.y, this.width, 90);
  }

}
module.exports = Platform;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const PlatformManager = __webpack_require__(2);
const Player = __webpack_require__(1);
const { random, randomColor } = __webpack_require__(0);
const Racoon = __webpack_require__(6);
const Background = __webpack_require__(7);
const Water = __webpack_require__(8);
const Bear = __webpack_require__(9);
const Wolf = __webpack_require__(10);
const Score = __webpack_require__(13);

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
    this.toggleSound();

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const { Vector } = __webpack_require__(0);
const RACCOON_SPRITES = [
  { x: 0, y: 0 },
  { x: 0, y: 114 },
  { x: 0, y: 228 },
  { x: 0, y: 342 },
  { x: 0, y: 456 }
]

class Racoon extends Vector{
  constructor(options={}){
    super(options);

    this.image = new Image();
    this.image.src =  "./assets/images/raccoon_sprite.png";
    this.spriteSpeed = 0;
    this.drawingWidth =  78;
    this.drawingHeight = 77;
  }

  updateStatus(options={}){
    this.x = options.x;
    this.y = options.y - this.height;
    this.spriteSpeed += 0.05;
  }

  draw(ctx) {
    const spriteIndex = parseInt(this.spriteSpeed) % RACCOON_SPRITES.length;
    const sprite = RACCOON_SPRITES[spriteIndex];
    const srcRacoonWidth = 118, srcRacoonHeight = 107;

    ctx.drawImage(
      this.image,
      sprite.x, sprite.y , srcRacoonWidth, srcRacoonHeight,
      this.x, this.y -10 ,
      this.drawingWidth , this.drawingHeight);
  }

}

module.exports = Racoon;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

class Background {
  constructor(options){
    // load a image image
    this.image = new Image();
    this.image.src = options.src;
    this.speed = 1;
    this.x=0;
    this.y=0;
    this.width = options.width;
    this.height = options.height;
  }
  draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.drawImage(this.image,
      0, 0, this.width, this.height,
      this.x, this.y, ctx.canvas.width, ctx.canvas.height );

    ctx.drawImage(this.image,
      0 , 0, this.width, this.height,
      this.x + ctx.canvas.width, this.y, ctx.canvas.width, ctx.canvas.height );

    //redraw after two backgrounds pass by
    if (this.x < ctx.canvas.width * -1){
      this.x = 0;
    }
    this.scrollImage();
  }

  scrollImage() {
    this.x -= this.speed;
  }

}

module.exports = Background;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

class Water{
  constructor(){
    this.image = new Image();
    this.image.src = './assets/images/water_wave1.png';
    this.x = 0;
    this.y = 400;
    this.width = 547;
    this.height = 70;

  }
  draw(ctx){
    ctx.drawImage(this.image, 0, 0, this.width, 80, 0, ctx.canvas.height - this.height, ctx.canvas.width, this.height);
    this.scrollImage();
  }
  scrollImage() {
    this.x -= this.speed;
  }
}

module.exports = Water;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const { Vector } = __webpack_require__(0);
const BEAR_SPRITES = [
  { x: 0, y: 0 },
  { x: 93.125, y: 0 },
  { x: 186.25, y: 0 },
  { x: 279.375, y: 0 },
  { x: 372.5, y: 0 },
  { x: 465.625, y: 0 },
  { x: 558.75, y: 0 },
  { x: 651.875, y: 0 },
]

class Bear extends Vector{
  constructor(options={}){
    super(options);

    this.image = new Image();
    this.image.src = "./assets/images/platform_bear2.png";
    this.spriteSpeed = 0;
    this.drawingWidth = 113;
    this.drawingHeight = 126;
  }

  updateStatus(options={}){
    this.x = options.x;
    this.y = options.y - this.height;
    this.spriteSpeed += 0.05;
  }

  draw(ctx) {
    const spriteIndex = parseInt(this.spriteSpeed) % BEAR_SPRITES.length;
    const sprite = BEAR_SPRITES[spriteIndex];
    const srcBearWidth = 93.125, srcBearHeight = 106;

    ctx.drawImage(
      this.image,
      sprite.x, sprite.y , srcBearWidth, srcBearHeight,
      this.x, this.y - 30,
      this.drawingWidth , this.drawingHeight);
  }

}

module.exports = Bear;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const { Vector } = __webpack_require__(0);
const WOLF_SPRITES = [
  { x: 0, y: 0 },
  { x: 66.18, y: 0 },
  { x: 132.26, y: 0 },
  { x: 198.54, y: 0 },
  { x: 264.72, y: 0 },
  { x: 330.90, y: 0 },
  { x: 397, y: 0 },
  { x: 463.56, y: 0 },
  { x: 529.74, y: 0 },
  { x: 595.92, y: 0 },
  { x: 662.10, y: 0 }
]
class Cat extends Vector{
  constructor(options={}){
    super(options);

    this.image = new Image();
    this.image.src = "./assets/images/wolf.png";
    this.spriteSpeed = 0;
    this.drawingWidth = 132;
    this.drawingHeight = 122;
  }

  updateStatus(options={}){
    this.x = options.x;
    this.y = options.y - this.height;
    this.spriteSpeed += 0.01;
  }

  draw(ctx) {
    const spriteIndex = parseInt(this.spriteSpeed) % WOLF_SPRITES.length;
    const sprite = WOLF_SPRITES[spriteIndex];
    const srcCatWidth = 66.18, srcCatHeight = 56;

    ctx.drawImage(
      this.image,
      sprite.x, sprite.y , srcCatWidth, srcCatHeight,
      this.x, this.y - 50,
      this.drawingWidth , this.drawingHeight);
  }

}

module.exports = Cat;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

class Sound {
  constructor(){
    this.bgSoundTag = document.getElementById('bg-sound');
    this.bgSound = new Audio('./assets/sounds/bg.ogg');
  }
  toggleSound(e){
    this.bgSound.paused ? this.bgSound.play() : this.bgSound.pause();
    const [originText1, originText2] = this.bgSoundTag.innerText.split(' ');
    originText2 === 'On' ? (this.bgSoundTag.innerText = originText1.concat(' ','Off')) : (this.bgSoundTag.innerText = originText1.concat(' ','On'));
  }
}

module.exports = Sound;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

class LevelHandler{
  constructor({menu, game}){
    this.easy = document.getElementById("level-easy");
    this.medium = document.getElementById("level-medium");
    this.hard = document.getElementById("level-hard");
    this.menu = menu;
    this.game = game;
  }
  setLevel(e){
    this.menu.style.display = "none";
    this.game.level = e.currentTarget.value;
    this.game.start();
  }

}

module.exports = LevelHandler;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

class Score{
  constructor({width, height, time}){
    this.time = time;
    this.multiplier = 3;
    this.width = width;
    this.height = height;
    this.difference = 0;
  }
  updateStatus(){
    this.difference = Math.floor((Date.now() - this.time)/60);
  }
  draw(ctx){
    ctx.font = '15pt POLYPTY';//Nanum+Pen+Script
    ctx.fillStyle = '#181818';
    ctx.fillText('SCORE: ' + this.difference * this.multiplier, this.width - 200, this.height - 400);

    //Draw Jump
    // ctx.fillStyle = this.scoreColor;
    // ctx.font = (12 + (this.aceleration * 3)) + 'pt Arial';
    // ctx.fillText('JUMPS: ' + this.jumpCount, this.width - (150 + (this.aceleration * 4)), 50);
  }
}

module.exports=Score;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map