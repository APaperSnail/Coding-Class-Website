class Character {
    constructor(positionVector, velocityVector, health, characterClass, sprite, ordientationAngle) {
        this.positionVector = positionVector;
        this.velocityVector = velocityVector;
        this.health = health;
        this.characterClass = characterClass;
        this.sprite = sprite;
        this.weapons = [];
        this.maxSpeed = 10;
        this.ordientationAngle = ordientationAngle;
    }

  draw(point1, point2) {
      push();

      translate(this.positionVector.x, this.positionVector.y);
      rotate(this.ordientationAngle);
      
      if (this.characterClass === 'warrior') {
        fill(255, 0, 0); // red for warrior
      } else if (this.characterClass === 'enemies') {
        fill(0, 0, 255); // blue for enemies
      } else {
        fill(128);
      }

      if (point1 || point2) {
        // find the slope of the line between p1 and p2
        let dx = point1.x - point2.x;
        let dy = point1.y - point2.y;
        let slope = dx / dy;

        // get slope of the point with respect to p1
        let pointSlope = (point1.x - this.positionVector.x) / (point1.y - this.positionVector.y);

        if (pointSlope > slope){
            fill(0,255,0);
        } else {
            fill(255,0,0);
        }
      }
      
      ellipse(0, 0, this.sprite, this.sprite);

      // rotate it all based on the ordientationAngle

      // make the front half of the circle white
      fill(255);
      arc(0, 0, this.sprite, this.sprite, HALF_PI + PI, 3 * HALF_PI + PI);
      pop();
  }

  isCollide(b) {
    return !(
        ((this.positionVector.y + this.velocityVector.y) < (b.positionVector.y)) ||
        (this.positionVector.y + this.velocityVector.y > (b.positionVector.y + b.sizeVector.y)) ||
        ((this.positionVector.x + this.velocityVector.x) < b.positionVector.x) ||
        (this.positionVector.x + this.velocityVector.x > (b.positionVector.x + b.sizeVector.x))
    );
}

  updateCharacter(walls){
    var hit = false;
    if (walls.length > 0) {
      for (let i = 0; i < walls.length; i++) {
        // console.log(i)
        if (this.isCollide(walls[i])) {
          hit = true;
        }
      }
    }

    if (hit == true) {
      this.velocityVector = createVector(0, 0);
    }
    this.positionVector.add(this.velocityVector);

    // add friction
    this.velocityVector.mult(0.95);

    //this.ordientationAngle = frameCount * 0.01;
  }
}