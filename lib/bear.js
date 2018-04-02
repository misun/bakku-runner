const { Vector } = require('./util');
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
