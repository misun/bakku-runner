class Water{
  constructor(){
    this.image = new Image();
    this.image.src = './assets/images/water_wave1.png';
    this.x = 0;
    this.y = 400;
    this.width = 547;
    this.height = 70;

  }
  draw(ctx){
    ctx.drawImage(this.image, 0, 0, this.width, 80, 0, ctx.canvas.height - this.height, ctx.canvas.width, this.height);
    this.scrollImage();
  }
  scrollImage() {
    this.x -= this.speed;
  }
}

module.exports = Water;
