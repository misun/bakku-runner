class Background {
  constructor(options){
    // load a image image
    this.image = new Image();
    this.image.src = options.src; //"./assets/images/bg1.jpg";
    this.speed = 1;
    this.x=0;
    this.y=0;
    this.width = 9992;
    this.height = 3333;
  }
  updateStatus(){

  }
  draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // debugger
    // context.drawImage(imageObj, 0, 0, 100, 100 * imageObj.height / imageObj.width)9992 × 3333
    ctx.drawImage(this.image,
      0, 0, this.width, this.height,
      this.x, this.y, ctx.canvas.width, ctx.canvas.height );

    ctx.drawImage(this.image,
      0 , 0, this.width, this.height,
      this.x + ctx.canvas.width, this.y, ctx.canvas.width, ctx.canvas.height );

    // console.log(`x: ${this.x}, cavas.width : ${ctx.canvas.width}, this.width: ${this.width}`);
    let srcreenIndex = 2;
    if (this.x < ctx.canvas.width * -1) {
      const newX = this.x + ctx.canvas.width * srcreenIndex;

      ctx.drawImage(this.image,
        0 , 0, this.width, this.height,
        newX, this.y, ctx.canvas.width, ctx.canvas.height );

      // console.log(`newX: ${newX}`);
      if ((this.x % ctx.canvas.width) == 0) {
        srcreenIndex++;
      }
    }

    this.scrollImage();
  }

  scrollImage() {
    this.x -= this.speed;
  }

}

module.exports = Background;
