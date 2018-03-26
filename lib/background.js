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
