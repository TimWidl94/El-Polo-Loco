class SmallChicken extends MovableObject {
  y = 365;
  height = 50;
  width = 50;
  energy = 1;
  isDead = false;
  arriveEnd = false;
  chickenIsHighEnough = false;
  deleteChicken = false;
  IMAGES_WALKING = [
    "./img/ElPoloLoco/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/ElPoloLoco/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/ElPoloLoco/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGES_DEAD = [
    "./img/ElPoloLoco/3_enemies_chicken/chicken_small/2_dead/dead.png",
  ];

  offset = { // noch zu bearbeiten
    left: 10,
    top: 10,
    right: 10,
    bottom: 10,
  };
  constructor(id) {
      super().loadImage(
        "./img/ElPoloLoco/3_enemies_chicken/chicken_small/1_walk/1_w.png"
      );
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_DEAD);
      this.x = 600 + Math.random() * 2000;
      this.animate();
      this.speed = 0.5 + Math.random() * 0.5;
      this.id = id;
      this.applyGravity(this.y);
    }
  
    /**
   * Animates the movement and actions of the smallChickens.
   * Continuously updates the smallChickens movement and animation based on its state.
   * @returns {void}
   */
  animate() {
  /**
   * Interval for continuous movement of the smallChickens.
   */
  let moveInterval = setInterval(() => {
    if (!this.arriveEnd) {
        this.moveLeft();
        /**
         * Makes the smallChickens jump periodically if conditions are met.
         */
        if (!this.chickenIsHighEnough && !this.isDead && this.y > 0) {
            setInterval(() => { this.jump(); }, 3000);
            this.chickenIsHighEnough = true;
        }
        if (this.x <= -600) {
            this.arriveEnd = true;
        }
    } else if (this.arriveEnd) {
        this.animateAfterArriveEnd();
    }
  }, 1000 / 60);
  setStoppableInterval(moveInterval, 1000 / 60);

  /**
   * Interval for animating the smallChickens actions.
   */
  let animateInterval = setInterval(() => {
    if (this.isDead) {
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0;
        /**
         * Delays the deletion of the smallChickens after playing the dead animation.
         */
        setTimeout(() => { this.deleteChicken = true; }, 500);
    } else {
        this.playAnimation(this.IMAGES_WALKING);
    }
  }, 200);
  setStoppableInterval(animateInterval, 200);
  }


  /**
  * animate and walk right if chicken arrives end.
  */
  animateAfterArriveEnd(){
    this.moveRight();
    this.otherDirection = true;
    if (!this.isDead) {
        this.speed = 1 + Math.random() * 0.5;
    } else {
        this.speed = 0;
    }
    if (this.x >= 1400) {
        this.arriveEnd = false;
        this.otherDirection = false;
    }
  }
}  