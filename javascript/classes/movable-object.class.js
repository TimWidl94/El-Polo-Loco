class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  coinValue = 0;
  bottleValue = 0;
  lastHit = 0;

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }

  /**
   * Applies gravity to the object's vertical position.
   * @param {number} y - The y-coordinate representing the ground level.
   * @returns {void}
   */
  applyGravity(y) {
    setInterval(() => {
        if (this.isAboveGround(y) || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }, 1000 / 25);
  }

  /**
  * Checks if the object is above the specified y-coordinate, indicating whether it's above ground.
  * @param {number} y - The y-coordinate representing the ground level.
  * @returns {boolean} - True if the object is above the ground, otherwise false.
  */
  isAboveGround(y) {
    if (this instanceof ThrowableObject) {
        return true;
    } else {
        return this.y < y;
    }
  }

  /**
  * Checks if the object is colliding with another movable object.
  * @param {MovableObject} mo - The movable object to check collision with.
  * @returns {boolean} - True if the objects are colliding, otherwise false.
  */
  isColliding(mo) {
    return (
        this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
  * Moves the object to the right based on its speed.
  * @returns {void}
  */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
  * Moves the object to the left based on its speed.
  * @returns {void}
  */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
  * Updates the object's image for animation.
  * @param {string[]} images - An array of image paths representing the animation frames.
  * @returns {void}
  */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
  * Initiates a jump by setting the object's vertical speed.
  * @returns {void}
  */
  jump() {
    this.speedY = 25;
  }

  /**
  * Decreases the object's energy upon being hit.
  * @returns {void}
  */
  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
        this.energy = 0;
    } else {
        this.lastHit = new Date().getTime();
    }
  }

  /**
  * Checks if the object is dead based on its energy level.
  * @returns {boolean} - True if the object's energy is zero, indicating it's dead, otherwise false.
  */
  isDead() {
    return this.energy == 0;
  }

  /**
  * Checks if the object is in a hurt state based on the time since the last hit.
  * @returns {boolean} - True if the object has been hurt recently, otherwise false.
  */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  /**
  * Increases the object's coin value.
  * @returns {void}
  */
  scoreCoin(){
    this.coinValue += 5;
  }

  /**
  * Increases the object's bottle value.
  * @returns {void}
  */
  scoreBottle(){
    this.bottleValue += 10;
  }
}
