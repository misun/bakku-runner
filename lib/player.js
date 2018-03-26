const { Vector} = require('./util.js');

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
