const Platform = require('./platform');
const { random, randomColor } = require('./util');
const Racoon = require('./racoon');

class PlatformManager{
  constructor(options){
    this.maxDistanceBetween = 300;
    this.colors = ['#2ca8c2', '#98cb4a', '#f76d3c', '#f15f74', '#5481e6'];

    this.first = new Platform({
      x: 300,
      y: options.height -70,
      width: 800, //400,
      height: 70,
      src: "./assets/images/platform3.png"
    })
    this.second = new Platform({
      x: (this.first.x + this.first.width) + random(this.maxDistanceBetween - 150, this.maxDistanceBetween),
      y: random(this.first.y - 128, options.height - 80),
      width: 800, //400,
      height: 70,
      src: "./assets/images/platform3.png"
    })
    this.third = new Platform({
      x: (this.second.x + this.second.width) + random(this.maxDistanceBetween - 150, this.maxDistanceBetween),
      y: random(this.second.y - 128, options.height - 80),
      width: 800, //400,
      height: 70,
      src: "./assets/images/platform3.png"
    })
// debugger
    this.first.height = this.first.y + options.height;
    this.second.height = this.second.y + options.height;
    this.third.height = this.third.y + options.height;
    this.first.color = randomColor(this.colors);
    this.second.color = randomColor(this.colors);
    this.third.color = randomColor(this.colors);

    this.platforms = [this.first, this.second, this.third];

    this.aceleration = options.aceleration;
    this.width = options.width;
    this.height = options.height;

    this.racoon = options.racoon;
  }
  draw(ctx){
    this.racoon.draw(ctx);
    for (let i = 0; i < this.platforms.length; i++) {
      // console.log(`${i} platform is drawing`)
      // debugger
      this.platforms[i].draw(ctx);
    };
  }
  updateStatus(){
    this.first.x -= 3 + this.aceleration;
    if (this.first.x + this.first.width < 0) {
      this.first.width = random(450, this.width + 200);
      this.first.x = (this.third.x + this.third.width) + random(this.maxDistanceBetween - 150, this.maxDistanceBetween);
      this.first.y = random(this.third.y - 32, this.height - 80);
      this.first.height = this.first.y + this.height + 10;
      this.first.color = randomColor(this.colors);
    }

    this.second.x -= 3 + this.aceleration;
    if (this.second.x + this.second.width < 0) {
      this.second.width = random(450, this.width + 200);
      this.second.x = (this.first.x + this.first.width) + random(this.maxDistanceBetween - 150, this.maxDistanceBetween);
      this.second.y = random(this.first.y - 32, this.height - 80);
      this.second.height = this.second.y + this.height + 10;
      this.second.color = randomColor(this.colors);
    }

    this.third.x -= 3 + this.aceleration;
    if (this.third.x + this.third.width < 0) {
      this.third.width = random(450, this.width + 200);
      this.third.x = (this.second.x + this.second.width) + random(this.maxDistanceBetween - 150, this.maxDistanceBetween);
      this.third.y = random(this.second.y - 32, this.height - 80);
      this.third.height = this.third.y + this.height + 10;
      this.third.color = randomColor(this.colors);
    }

    //racoon status
    this.racoon.updateStatus({
      x: this.second.x + this.second.width/2,
      y: this.second.y +10
    });

  }
  updateWhenLose(){
    this.first.x = 300;
    this.first.color = randomColor(this.colors);
    this.first.y = this.width / random(2, 3);
    this.second.x = (this.first.x + this.first.width) + random(this.maxDistanceBetween - 150, this.maxDistanceBetween);
    this.third.x = (this.second.x + this.second.width) + random(this.maxDistanceBetween - 150, this.maxDistanceBetween);
  }

}

module.exports = PlatformManager;
