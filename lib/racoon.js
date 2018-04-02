const { Vector } = require('./util');
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
