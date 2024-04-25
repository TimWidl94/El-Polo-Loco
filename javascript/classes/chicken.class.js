class Chicken extends MovableObject {
  y = 330;
  height = 100;
  width = 100;
  energy = 1;
  isDead = false;
  arriveEnd = false;
  deleteChicken = false;
  IMAGES_WALKING = [
    "./img/ElPoloLoco/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/ElPoloLoco/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/ElPoloLoco/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEAD = [
    "./img/ElPoloLoco/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];

  offset = {
    left: 10,
    top: 20,
    right: 10,
    bottom: 10,
  };

  constructor() {
    super().loadImage(
      "./img/ElPoloLoco/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 600 + Math.random() * 2000;
    this.animate();
    this.speed = 0.5 + Math.random() * 0.5;
  }

  /**
  * Animates the movement and actions of the character.
  * Moves the character left until it reaches a certain point, then moves it right.
  * Plays different animations based on the character's state.
  * @returns {void}
  */
  animate() {
    /**
     * Interval for continuous movement of the character.
     * Moves the character left until it reaches a certain point, then moves it right.
     */
    setInterval(() => {
        if (!this.arriveEnd) {
            this.moveLeft();
            if (this.x <= -600) {
                this.arriveEnd = true;
            }
        } else if (this.arriveEnd) {
            this.interactionAfterWalkLeft();
        }
    }, 1000 / 60);

    /**
     * Interval for playing animations based on the character's state.
     * Plays the walking animation if the character is alive, otherwise plays the dead animation.
     */
    setInterval(() => {
        if (this.isDead) {
            this.playAnimation(this.IMAGES_DEAD);
            this.speed = 0;
            /**
             * Delays the deletion of the character after playing the dead animation.
             */
            setTimeout(() => {
                this.deleteChicken = true;
            }, 500);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }, 200);
  }

  interactionAfterWalkLeft(){
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
