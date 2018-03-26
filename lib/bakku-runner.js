const Player = require('./player');
const PlatformManager = require('./platform_manager');
const { random, randomColor } = require('./util');
const Game = require('./game');

document.addEventListener('DOMContentLoaded', () => {
  console.log('bakku runner start');

  const canvas = document.getElementById('container');
  const ctx = canvas.getContext('2d');
  const game = new Game(ctx);

  game.start();
});
