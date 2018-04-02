const { Vector } = require('./util');
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
