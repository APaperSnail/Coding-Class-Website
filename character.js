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


      // const canvas = document.getElementById("canvas");
      // const ctx = canvas.getContext("2d");
      // const image = document.getElementById("source");

      // image.addEventListener("load", (e) => {
      //   ctx.drawImage("Greg.png", this.positionVector.x, this.positionVector.y)
      // });
      
      // drawImage("Greg.png", this.positionVector.x, this.positionVector.y);

      // if (point1 || point2) {
      //   // find the slope of the line between p1 and p2
      //   let dx = point1.x - point2.x;
      //   let dy = point1.y - point2.y;
      //   let slope = dx / dy;

      //   // get slope of the point with respect to p1
      //   let pointSlope = (point1.x - this.positionVector.x) / (point1.y - this.positionVector.y);

      //   if (pointSlope > slope){
      //       fill(0,255,0);
      //   } else {
      //       fill(255,0,0);
      //   }
      // }
      
      ellipse(0, 0, this.sprite, this.sprite);

      // rotate it all based on the ordientationAngle

      // make the front half of the circle white
      fill(255);
      arc(0, 0, this.sprite, this.sprite, HALF_PI + PI, 3 * HALF_PI + PI);
      pop();
  }

  isCollide(position, b) {
    return !(
        ((position.y) < (b.positionVector.y)) ||
        (position.y > (b.positionVector.y + b.sizeVector.y)) ||
        ((position.x) < b.positionVector.x) ||
        (position.x > (b.positionVector.x + b.sizeVector.x))
    );
}

  updateCharacter(walls, point1, point2){
    var hit = false;
    if (walls.length > 0) {
      for (let i = 0; i < walls.length; i++) {
        // console.log(i)
        let movedPositionY = createVector(this.positionVector.x, this.positionVector.y + this.velocityVector.y);
        if (this.isCollide(movedPositionY, walls[i])) {
          this.velocityVector = createVector(this.velocityVector.x, 0)
        }

        let movedPositionX = createVector(this.positionVector.x + this.velocityVector.x, this.positionVector.y);
        if (this.isCollide(movedPositionX, walls[i])) {
          this.velocityVector = createVector(0, this.velocityVector.y)
        }
      }
    }

    if (point1 || point2) {
      // find the slope of the line between p1 and p2
      let dx = point1.x - point2.x;
      let dy = point1.y - point2.y;
      let slope = dx / dy;

      // get slope of the point with respect to p1
      let pointSlope = (point1.x - (this.positionVector.x + this.velocityVector.x)) / (point1.y - (this.positionVector.y + this.velocityVector.y));

      if (pointSlope > slope){
          hit = true
      // } else {
      //     hit = true
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