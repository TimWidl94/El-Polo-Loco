class Endboss extends MovableObject {
  IMAGES_WALKING = [
    "./img/ElPoloLoco/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/ElPoloLoco/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/ElPoloLoco/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/ElPoloLoco/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_DEAD = [
  "./img/ElPoloLoco/4_enemie_boss_chicken/5_dead/G24.png",
  "./img/ElPoloLoco/4_enemie_boss_chicken/5_dead/G25.png",
  "./img/ElPoloLoco/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  IMAGES_HURT = [
    './img/ElPoloLoco/4_enemie_boss_chicken/4_hurt/G21.png',
    './img/ElPoloLoco/4_enemie_boss_chicken/4_hurt/G22.png',
    './img/ElPoloLoco/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  IMAGES_ALERT = [
    './img/ElPoloLoco/4_enemie_boss_chicken/2_alert/G5.png',
    './img/ElPoloLoco/4_enemie_boss_chicken/2_alert/G6.png',
    './img/ElPoloLoco/4_enemie_boss_chicken/2_alert/G7.png',
    './img/ElPoloLoco/4_enemie_boss_chicken/2_alert/G8.png',
    './img/ElPoloLoco/4_enemie_boss_chicken/2_alert/G9.png',
    './img/ElPoloLoco/4_enemie_boss_chicken/2_alert/G10.png',
    './img/ElPoloLoco/4_enemie_boss_chicken/2_alert/G11.png',
    './img/ElPoloLoco/4_enemie_boss_chicken/2_alert/G12.png',
  ]

  IMAGES_ATTACK = [
    './img/ElPoloLoco/4_enemie_boss_chicken/3_attack/G13.png',
    './img/ElPoloLoco/4_enemie_boss_chicken/3_attack/G14.png',
    './img/ElPoloLoco/4_enemie_boss_chicken/3_attack/G15.png',
    './img/ElPoloLoco/4_enemie_boss_chicken/3_attack/G16.png',
    './img/ElPoloLoco/4_enemie_boss_chicken/3_attack/G17.png',
    './img/ElPoloLoco/4_enemie_boss_chicken/3_attack/G18.png',
    './img/ElPoloLoco/4_enemie_boss_chicken/3_attack/G19.png',
    './img/ElPoloLoco/4_enemie_boss_chicken/3_attack/G20.png',
  ]

  width = 300;
  height = 300;
  y = 140;
  chickenLive = 100;
  energy = 100;
  endbossWalking = false;
  alertIsOver = false;
  speed = 1;
  lastHit = 0;
  imgAlert = 0;
  chickenDoDmgOnCharacter = false;

  offset = {
    left: 20,
    top: 40,
    right: 20,
    bottom: 50,
  }

  constructor(id){
    super().loadImage(
        "./img/ElPoloLoco/4_enemie_boss_chicken/1_walk/G1.png"
      );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.x = 2900;
    this.animate();
    this.speed = 12;
    this.id = id;
  }

  /**
  * Animates the actions of the chicken.
  * Continuously updates the animation based on the state of the chicken.
  * @returns {void}
  */
  animate() {
    setInterval(() => {
        if (this.chickenLive == 0) {
            this.playAnimation(this.IMAGES_DEAD);
            /**
             * Delays the game over function call after the chicken dies.
             */
            setInterval(() => { gameOver(); }, 2000);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.chickenDoDmgOnCharacter) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.chickenLive >= 0 && this.endbossWalking) {
            if (!this.alertIsOver) {
                this.endbossAnimateAlert();
            }
            if (this.alertIsOver) {
                this.endbossAnimateAfterAlert();
            }
        }
    }, 200);
  }

  /**
  * Decreases the chicken's live points upon being hit by the endboss.
  * @returns {void}
  */
  hitEndboss() {
    this.chickenLive -= 20;
    /**
     * Updates the last hit time if the chicken is not dead yet.
     */
    if (this.chickenLive < 0) {
        this.chickenLive = 0;
    } else {
        this.lastHit = new Date().getTime();
    }
  }

  /**
  * Animate the images from the alert interval.
  * @returns {void}
  */
  endbossAnimateAlert(){
    this.playAnimation(this.IMAGES_ALERT);
    this.imgAlert++;
    if (this.imgAlert >= 7) {
        this.alertIsOver = true;
    }
  }

  /**
  * After animate the alert, endbossChicken starts walking and set Speed if live is under 50.
  * @returns {void}
  */
  endbossAnimateAfterAlert(){
    this.moveLeft();
    this.playAnimation(this.IMAGES_WALKING);
    if(this.chickenLive <= 50){
      this.speed = 20;
    }
  }
}
