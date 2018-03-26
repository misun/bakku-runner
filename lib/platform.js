const { Vector } = require('./util');

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
