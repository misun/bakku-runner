class MovingObject{
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.vel = options.vel;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;
  }

  collideWith(otherObject) {
    // default do nothing
  }

  draw(ctx) {
    ctx.fillStyle = '#fffff';
    ctx.fillRect = (this.x, this.y, this.width, this.height);
  }

  isCollidedWith(otherObject) {
    // debugger
    if (this.x < otherObject.x + otherObject.width &&
     this.x + this.width > otherObject.x &&
     this.y < otherObject.y + otherObject.height &&
     this.height + this.y > otherObject.y) {
      // collision detected!
      console.log(`collision detected!!`);
      console.log(this);
      console.log(otherObject);

      return true;
    }
    return false;
  }
  move() {

  }

  remove() {
    // this.game.remove(this);
  }
}

module.exports = MovingObject;
