class Wall {
    constructor(positionVector, orientationAngle, size, color) {
        this.positionVector = positionVector;
        this.orientationAngle = orientationAngle;
        this.sizeVector = size;
        this.color = color;
    }

  draw() {
      push();

      translate(this.positionVector.x, this.positionVector.y);
      rotate(this.orientationAngle);
      
      fill(this.color);
      
      rect(0, 0, this.sizeVector.x, this.sizeVector.y, 5, 5, 5, 5);

      pop();
  }
}