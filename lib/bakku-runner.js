const Player = require('./player');
const PlatformManager = require('./platform_manager');
const { random, randomColor } = require('./util');
const Game = require('./game');
const Sound = require('./sound');
const LevelHandler = require('./level_handler');

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
