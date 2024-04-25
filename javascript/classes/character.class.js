class Character extends MovableObject {
  width = 150;
  height = 300;
  y = 120;
  x = 80;
  speed = 10;
  timePassed = 0;
  IMAGES_WALKING = [
    "./img/ElPoloLoco/2_character_pepe/2_walk/W-21.png",
    "./img/ElPoloLoco/2_character_pepe/2_walk/W-22.png",
    "./img/ElPoloLoco/2_character_pepe/2_walk/W-23.png",
    "./img/ElPoloLoco/2_character_pepe/2_walk/W-24.png",
    "./img/ElPoloLoco/2_character_pepe/2_walk/W-25.png",
    "./img/ElPoloLoco/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img/ElPoloLoco/2_character_pepe/3_jump/J-31.png",
    "img/ElPoloLoco/2_character_pepe/3_jump/J-32.png",
    "img/ElPoloLoco/2_character_pepe/3_jump/J-33.png",
    "img/ElPoloLoco/2_character_pepe/3_jump/J-34.png",
    "img/ElPoloLoco/2_character_pepe/3_jump/J-35.png",
    "img/ElPoloLoco/2_character_pepe/3_jump/J-36.png",
    "img/ElPoloLoco/2_character_pepe/3_jump/J-37.png",
    "img/ElPoloLoco/2_character_pepe/3_jump/J-38.png",
    "img/ElPoloLoco/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/ElPoloLoco/2_character_pepe/5_dead/D-51.png",
    "img/ElPoloLoco/2_character_pepe/5_dead/D-52.png",
    "img/ElPoloLoco/2_character_pepe/5_dead/D-53.png",
    "img/ElPoloLoco/2_character_pepe/5_dead/D-54.png",
    "img/ElPoloLoco/2_character_pepe/5_dead/D-55.png",
    "img/ElPoloLoco/2_character_pepe/5_dead/D-56.png",
    "img/ElPoloLoco/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/ElPoloLoco/2_character_pepe/4_hurt/H-41.png",
    "img/ElPoloLoco/2_character_pepe/4_hurt/H-42.png",
    "img/ElPoloLoco/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGE_ENDSCREEN = ["img/ElPoloLoco/2_character_pepe/5_dead/D-57.png"];

  IMAGE_DONOTHING = [
    "img/ElPoloLoco/2_character_pepe/1_idle/idle/I-1.png",
    "img/ElPoloLoco/2_character_pepe/1_idle/idle/I-2.png",
    "img/ElPoloLoco/2_character_pepe/1_idle/idle/I-3.png",
    "img/ElPoloLoco/2_character_pepe/1_idle/idle/I-4.png",
    "img/ElPoloLoco/2_character_pepe/1_idle/idle/I-5.png",
    "img/ElPoloLoco/2_character_pepe/1_idle/idle/I-6.png",
    "img/ElPoloLoco/2_character_pepe/1_idle/idle/I-7.png",
    "img/ElPoloLoco/2_character_pepe/1_idle/idle/I-8.png",
    "img/ElPoloLoco/2_character_pepe/1_idle/idle/I-9.png",
    "img/ElPoloLoco/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGE_LONGIDLE = [
    "./img/ElPoloLoco/2_character_pepe/1_idle/long_idle/I-11.png",
    "./img/ElPoloLoco/2_character_pepe/1_idle/long_idle/I-12.png",
    "./img/ElPoloLoco/2_character_pepe/1_idle/long_idle/I-13.png",
    "./img/ElPoloLoco/2_character_pepe/1_idle/long_idle/I-14.png",
    "./img/ElPoloLoco/2_character_pepe/1_idle/long_idle/I-15.png",
    "./img/ElPoloLoco/2_character_pepe/1_idle/long_idle/I-16.png",
    "./img/ElPoloLoco/2_character_pepe/1_idle/long_idle/I-17.png",
    "./img/ElPoloLoco/2_character_pepe/1_idle/long_idle/I-18.png",
    "./img/ElPoloLoco/2_character_pepe/1_idle/long_idle/I-19.png",
    "./img/ElPoloLoco/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  walking_sound = new Audio("./audio/walking.mp3");
  jumping_sound = new Audio("./audio/jump.mp3");
  snore_sound = new Audio("./audio/snore.mp3");
  hurt_sound = new Audio("./audio/hurt.mp3");

  offset = {
    left: 50,
    top: 50,
    right: 50,
    bottom: 10,
  };

  constructor() {
    super().loadImage("./img/ElPoloLoco/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGE_DONOTHING);
    this.loadImages(this.IMAGE_LONGIDLE);
    this.animate();
    this.applyGravity(this.y);
  }

  /**
   * Animates the character's movements and actions.
   * @returns {void}
   */
  animate() {
    setInterval(() => {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.energy >= 1) {
            this.characterMoveRight();
        }
        if (this.world.keyboard.LEFT && this.x > -600 && this.energy >= 1) {
          this.characterMoveLeft();
        }
        if (this.world.keyboard.UP && !this.isAboveGround(120)) {
          this.characterJump();
        }
        this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    /**
     * Animates the character's actions based on its state.
     */
    setInterval(() => {
        if (this.isDead()) {
          this.characterIsDead();
        } else if (this.isHurt()) {
          this.characterHurtAnimation();
        } else if (this.isAboveGround(120)) {
          this.characterJumpAnimation();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.characterWalkAnimation();
        } else if (
            this.checkLastInteraction()
        ) {
          this.characterIdleAnimation();
        } else if (!this.world.keyboard.LEFT || !this.world.keyboard.RIGHT && this.timePassed() >= this.timePassed + 5000) {
            this.playAnimation(this.IMAGE_DONOTHING);
        }
    }, 200);
  }

  /**
  * Calculates the time passed since the last action.
  * @returns {number} - Time passed since the last action in seconds.
  */
  timePassedSinceLastAction() {
    let timePassed = new Date().getTime() - this.timePassed;
    timePassed = timePassed / 1000;
    return timePassed;
  }

  /**
  * Sets the current time as the new time passed.
  * @returns {void}
  */
  setNewTimePassed() {
    this.timePassed = new Date().getTime();
  }

  /**
   * Animates the character's movement right.
   * @returns {void}
   */
  characterMoveRight(){
    this.moveRight();
    this.playSoundSingle(this.walking_sound);
  }

  /**
   * Animates the character's movement jump.
   * @returns {void}
   */
  characterJump(){
    this.jump();
    this.playSoundSingle(this.jumping_sound);
  }

  /**
   * Animates the character's movement left.
   * @returns {void}
   */
  characterMoveLeft(){
    this.moveLeft();
    this.otherDirection = true;
    this.playSoundSingle(this.walking_sound);
  }

  /**
   * Animates the character's action dead.
   */
  characterIsDead(){
    this.playAnimation(this.IMAGES_DEAD);
    setInterval(() => {
        gameOver();
    }, 1500);
  }

  /**
   * Animates the character's action hurt.
   */
  characterHurtAnimation(){
    this.playAnimation(this.IMAGES_HURT);
    this.playSoundSingle(this.hurt_sound);
  }

  /**
   * Animates the character's action jump.
   */
  characterJumpAnimation(){
    this.playAnimation(this.IMAGES_JUMPING);
    this.setNewTimePassed();
  }

  /**
   * Animates the character's action walk.
   */
  characterWalkAnimation(){
    this.playAnimation(this.IMAGES_WALKING);
    this.setNewTimePassed();
  }

  /**
   * Animates the character's action idle.
   */
  characterIdleAnimation(){
    this.playAnimation(this.IMAGE_LONGIDLE);
    this.snore_sound.playbackRate = 0.5;
    this.playSoundSingle(this.snore_sound);
  }

  /**
   * Return true if the last interaction is 5 seconds ago.
   */
  checkLastInteraction(){
    return (!this.world.keyboard.LEFT && this.timePassedSinceLastAction() >= 5) ||
    (!this.world.keyboard.RIGHT && this.timePassedSinceLastAction() >= 5)
  }

}
