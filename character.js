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

  draw() {
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