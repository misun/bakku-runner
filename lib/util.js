export const random = (min, max) => {
    return Math.round(min + (Math.random() * (max - min)));
}

export const randomColor = (array) => {
  return array[Math.round(random(0, array.length -1 ))];
}

export const randomPlatfrom = ( array ) => {
  return array[Math.floor((Math.random() * ( array.length - 1)))];
}
export const inherits = (ChildClass, ParentClass) => {
    function Surrogate(){};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
}

export class Vector{
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.drawingWidth = options.drawingWidth;
    this.drawingHeight = options.drawingHeight;
    this.prevX = 0;
    this.prevY = 0;
    this.setPos(options.x, options.y);
  }

  setPos(x, y){
    this.prevX = this.x;
    this.prevY = this.y;
    this.x = x;
    this.y = y;
  }

  isCollidedWith(otherObject) {
    if (this.x < otherObject.x + otherObject.width &&
     this.x + this.width > otherObject.x &&
     this.y < otherObject.y + otherObject.height &&
     this.height + this.y > otherObject.y) {
      // console.log(`collision detected!!`);
      return true;
    }
    return false;
  }

  isCollidedWithLeft(obj){
    if (obj.x < this.x + this.width && obj.y < this.y + this.height) {
      return true;
    }
    return false;
  }

};
// Find distance between two points.
export const dist = (pos1, pos2) => {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
}
