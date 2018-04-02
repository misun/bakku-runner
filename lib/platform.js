const { Vector } = require('./util');

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
