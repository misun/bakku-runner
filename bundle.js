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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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

const Platform = __webpack_require__(5);
const { random, randomColor } = __webpack_require__(0);
const Racoon = __webpack_require__(3);

class PlatformManager{
  constructor(options){
    this.maxDistanceBetween = 300;
    this.colors = ['#2ca8c2', '#98cb4a', '#f76d3c', '#f15f74', '#5481e6'];

    this.first = new Platform({
      x: 300,
      y: options.height -70,
      width: 800, //400,
      height: 70,
      src: "./assets/images/platform3.png"
    })
    this.second = new Platform({
      x: (this.first.x + this.first.width) + random(this.maxDistanceBetween - 150, this.maxDistanceBetween),
      y: random(this.first.y - 128, options.height - 80),
      width: 800, //400,
      height: 70,
      src: "./assets/images/platform3.png"
    })
    this.third = new Platform({
      x: (this.second.x + this.second.width) + random(this.maxDistanceBetween - 150, this.maxDistanceBetween),
      y: random(this.second.y - 128, options.height - 80),
      width: 800, //400,
      height: 70,
      src: "./assets/images/platform3.png"
    })
// debugger
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

    this.racoon = options.racoon;
  }

  draw(ctx){
    this.racoon.draw(ctx);
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

    //racoon status
    this.racoon.updateStatus({
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
    this.image.src = options.src;
    this.spriteSpeed = 0;

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(1);
const PlatformManager = __webpack_require__(2);
const { random, randomColor } = __webpack_require__(0);
const Game = __webpack_require__(6);
const Sound = __webpack_require__(9);
const LevelHandler = __webpack_require__(10);

document.addEventListener('DOMContentLoaded', () => {
  console.log('bakku runner start');

  this.canvas = document.getElementById('container');
  this.ctx = this.canvas.getContext('2d');
  this.menu = document.getElementById('menu');
  const game = new Game(this.ctx);
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
/* 5 */
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

  }

  draw(ctx){
    // ctx.fillText('end of square', this.x+this.width, this.y);
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image,0, 0, 450, 71, this.x, this.y, this.width, 90);
  }
  
}
module.exports = Platform;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const PlatformManager = __webpack_require__(2);
const Player = __webpack_require__(1);
const { random, randomColor } = __webpack_require__(0);
const Racoon = __webpack_require__(3);
const Background = __webpack_require__(7);
const Water = __webpack_require__(8);

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
    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;
    this.ctx = ctx;
  }

  setup(){
    this.jumpCount = 0;
    this.aceleration = 0;
    this.acelerationTweening = 0;
    this.collidedPlatform = null;
    this.scoreColor = '#181818';
    this.jumpCountRecord = 0;
    this.keys = [];

    for( var name in keynames){
      this.keys[keynames[name]] = false;
    }
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
    this.background = new Background({
      src: "./assets/images/bg2.jpg"
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
  }

  start() {
    this.setup();
    if (this.gamePlaying) return;
    this.gamePlaying = true;
    this.lastTime = 0;
    this.toggleSound();

    // this.now = Date.now();
    // requestAnimationFrame(this.animate.bind(this));

    const fps = 80;
    this.fpsInterval = 1000 / fps;
    this.then = Date.now();
    this.startTime = this.then;

    this.animate();
  }
  drawMenu(){
    // this.ctx.font = '12pt Arial';
    // this.ctx.fillStyle = '#181818';
    // this.ctx.fillText("Menu", this.width/2, this.height/2);
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
    this.ctx.font = "50px POLYPTY";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Press 'ENTER' to reset", this.width/2, this.height/2);
    this.dogCryingSound.play();
    this.toggleSound();
  }

  keydown(event) {
    this.keys[keynames[event.keyCode]] = true;

    if (this.keys.ENTER){
      this.start();
    }else if(this.keys.UP){
      this.jumpSound.play();
    }
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
    this.water.draw(ctx);
    this.player.draw(ctx);
    this.platformManager.draw(ctx);

    //Draw Score
    ctx.font = '15pt POLYPTY';
    ctx.fillStyle = '#181818';
    ctx.fillText('SCORE: ' + this.jumpCountRecord * 30, this.width - 200, this.height - 400);

    //Draw Jump
    // ctx.fillStyle = this.scoreColor;
    // ctx.font = (12 + (this.aceleration * 3)) + 'pt Arial';
    // ctx.fillText('JUMPS: ' + this.jumpCount, this.width - (150 + (this.aceleration * 4)), 50);
  }

}

module.exports = Game;


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
    this.width = 9992;
    this.height = 3333;
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
    this.image.src = './assets/images/water_wave.png';
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
/* 10 */
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
    this.game.start();
  }

}

module.exports = LevelHandler;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map