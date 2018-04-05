class Score{
  constructor({width, height, time}){
    this.time = time;
    this.multiplier = 3;
    this.width = width;
    this.height = height;
    this.difference = 0;
  }
  updateStatus(){
    this.difference = Math.floor((Date.now() - this.time)/60);
  }
  draw(ctx){
    ctx.font = '15pt POLYPTY';//Nanum+Pen+Script
    ctx.fillStyle = '#181818';
    ctx.fillText('SCORE: ' + this.difference * this.multiplier, this.width - 200, this.height - 400);

    //Draw Jump
    // ctx.fillStyle = this.scoreColor;
    // ctx.font = (12 + (this.aceleration * 3)) + 'pt Arial';
    // ctx.fillText('JUMPS: ' + this.jumpCount, this.width - (150 + (this.aceleration * 4)), 50);
  }
}

module.exports=Score;
