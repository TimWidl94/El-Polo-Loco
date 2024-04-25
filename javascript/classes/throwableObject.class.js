class ThrowableObject extends MovableObject {
  isHitEndboss = false;
  isDmgEndboss = true;
  isHitGround = false;

  offset = {
    left: 20,
    top: 20,
    right: 20,
    bottom: 20,
  };

  IMAGE_SALSABOTTLE = [
    "./img/ElPoloLoco/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./img/ElPoloLoco/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./img/ElPoloLoco/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./img/ElPoloLoco/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGE_SALSABOTTLESPLASH = [
    "./img/ElPoloLoco/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./img/ElPoloLoco/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./img/ElPoloLoco/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./img/ElPoloLoco/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./img/ElPoloLoco/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./img/ElPoloLoco/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y, otherDirection) {
    super().loadImage(
      "./img/ElPoloLoco/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGE_SALSABOTTLE);
    this.loadImages(this.IMAGE_SALSABOTTLESPLASH);
    this.direction = otherDirection;
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 70;
    this.throw();
    this.animate();
  }

  /**
   * Initiates the throwing action of the character.
   * Throws the character upwards with a certain initial vertical speed and applies gravity to it.
   * Additionally, moves the character horizontally based on its direction.
   * @returns {void}
   */
  throw() {
    this.speedY = 20;
    this.applyGravity();
    setInterval(() => {
        if (this.isHitEndboss) {
            this.speedY = 0;
        }
        else if (this.direction) {
            this.x -= 10;
        }
        else {
            this.x += 10;
        }
    }, 25);
  }

  /**
   * Animates the actions of the character while throwing objects.
   * Plays different animations based on whether the character hits the endboss, the ground, or remains in the air.
   * @returns {void}
   */
  animate() {
    setInterval(() => {
        if (this.isHitEndboss) {
            this.isDmgEndboss = false;
            this.playAnimation(this.IMAGE_SALSABOTTLESPLASH);
            setInterval(() => {
                this.y = -200;
            }, 500);
        }         
        else if (this.isHitGround) {
            this.playAnimation(this.IMAGE_SALSABOTTLESPLASH);
        } else {
            this.playAnimation(this.IMAGE_SALSABOTTLE);
        }
    }, 100);
  }
}
