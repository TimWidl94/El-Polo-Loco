class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  statusBarCoins = new StatusBarCoins();
  statusBarSalsaBottles = new StatusBarSalsaBottles();
  statusBarEndboss = new StatusBarEndboss();
  throwableObjectActive = false;
  throwNewBottleAllowedCheck = true;
  lastHitOnCharacter = false;

  throwing_sound = new Audio("./audio/throwing.mp3");
  collectingCoin_sound = new Audio("./audio/collectingCoin.mp3");
  collectingBottle_sound = new Audio("./audio/collectingBottle.mp3");
  jumpOnChicken_sound = new Audio("./audio/jumpOnChicken.mp3");
  breakingGlass_sound = new Audio("./audio/breakingGlas.mp3");
  chickenGetHit_sound = new Audio("./audio/chickenGetHit.mp3");
  snore_sound = new Audio("./audio/snore.mp3");
  chickenBite_sound = new Audio("./audio/chickenBite.mp3");

  ifEndbossAreNear = false;
  ThrowableObject = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkColisionsWithCoins();
    this.run();
    this.playBackgroundMusic();
  }

  /**
   * Sets the world for the character and initializes the endboss's live points.
   * @returns {void}
   */
  setWorld() {
    this.character.world = this;
    this.level.endboss.chickenLive = 100;
  }

  /**
   * Clears the canvas and draws all objects in the game world.
   * @returns {void}
   */
  draw() {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);

    // Translate the canvas for parallax scrolling
    this.ctx.translate(this.camera_x, 0);

    // Draw background objects
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.cactus);
    // Reset canvas translation
    this.ctx.translate(-this.camera_x, 0);

    // Draw character and other objects
    this.ctx.translate(this.camera_x, 0);

    this.addDifferentObjectsToMap();
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);

    // Draw status bars
    this.addStatusBarsToMap();

    // Check if endboss is near and display its status bar
    this.checkIfEndbossIsNear();

    // Request next animation frame
    let self = this;
    requestAnimationFrame(function () {
        self.draw();
    });
  }

  /**
   * Adds different objects to the map for drawing.
   * @returns {void}
   */
  addDifferentObjectsToMap() {
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coin);
    this.addObjectsToMap(this.level.salsaBottle);
    this.addObjectsToMap(this.ThrowableObject);
  }

  /**
   * Adds status bars to the map for drawing.
   * @returns {void}
   */
  addStatusBarsToMap() {
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarSalsaBottles);
    if (this.ifEndbossAreNear) {
        this.addToMap(this.statusBarEndboss);
    }
  }

  /**
   * Checks if the endboss is near and adds its status bar to the map if so.
   * @returns {void}
   */
  checkIfEndbossIsNear() {
    if (this.ifEndbossAreNear) {
        this.addToMap(this.statusBarEndboss);
    }
  }

  /**
   * Adds multiple objects to the map for drawing.
   * @param {Object[]} objects - An array of objects to be added to the map.
   * @returns {void}
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
        this.addToMap(o);
    });
  }

  /**
   * Adds an object to the map for drawing.
   * @param {Object} mo - The object to be added to the map.
   * @returns {void}
   */
  addToMap(mo) {
    if (mo.otherDirection) {
        this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
        this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image of an object horizontally.
   * @param {Object} mo - The object whose image needs to be flipped.
   * @returns {void}
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Reverts the flipped image back to its original orientation.
   * @param {Object} mo - The object whose image needs to be reverted.
   * @returns {void}
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Initiates various intervals for game functions.
   * @returns {void}
   */
  run() {
    this.colisionChickenInterval();
    this.checkColissionObjectInterval();
    this.endbossVisibleInterval();
    this.checkThrowInterval();
    this.colisionWithCactus();
  }

  /**
   * Initiates an interval to check collisions involving the character and enemies.
   * @returns {void}
   */
  colisionChickenInterval() {
    setInterval(() => {
        this.checkColisionsWithChicken();
        this.checkColisionsWithChickenBoss();
    }, 500);
  }

  /**
   * Initiates an interval to check collisions involving the character and cactus.
   * @returns {void}
   */
  colisionWithCactus(){
    setInterval(()=>{
      this.checkColisionWithCactus();
    }, 200)
  }

  /**
   * Initiates an interval to check if the endboss is visible, if it's not already near.
   * @returns {void}
   */
  endbossVisibleInterval() {
    if (this.ifEndbossAreNear == false) {
        setInterval(() => {
            this.checkIfEndbossIsVisible();
        }, 500);
    }
  }

  /**
   * Initiates an interval to check various collisions involving objects.
   * @returns {void}
   */
  checkColissionObjectInterval() {
    setInterval(() => {
        this.checkColisionsFromTop();
        this.checkColisionsWithCoins();
        this.checkColisionsWithSalsaBottle();
        this.deleteDeadChicken();
        this.checkChickenGetHitFromBottle();
    }, 10);
  }

  /**
   * Initiates an interval to check for actions related to throwing objects.
   * @returns {void}
   */
  checkThrowInterval() {
    setInterval(() => {
        this.checkEndbossGetHit();
        this.checkThrowObjects();
    }, 200);
  }

  /**
   * Plays background music at regular intervals, if sound is not muted.
   * @returns {void}
   */
  playBackgroundMusic() {
    if (!muteSoundsInGame) {
        setInterval(() => {
            backgroundMusic_sound.play();
        }, 200);
    }
  }

  /**
   * Checks conditions for throwing objects and executes the appropriate actions.
   * @returns {void}
   */
  checkThrowObjects() {
    if (
        this.keyboard.D &&
        this.character.bottleValue > 0 &&
        this.throwNewBottleAllowedCheck
    ) {
        this.character.setNewTimePassed();
        this.checkThrowableDirection();
        this.character.timePassedSinceLastAction();
    }
  }

  /**
   * Checks collisions between the character and chicken enemies.
   * @returns {void}
   */
  checkColisionsWithChicken() {
    this.level.enemies.forEach((enemy, id) => {
        if (
            this.character.isColliding(enemy) &&
            this.level.enemies[id].isDead == false &&
            this.character.speedY <= 0 
        ) {
            this.character.hit();
            this.playSound(this.chickenBite_sound);
            this.statusBar.setPercentage(this.character.energy);
            this.character.setNewTimePassed();
        }
    });
  }

  /**
   * Checks collisions between the character and cactus.
   * @returns {void}
   */
  checkColisionWithCactus(){
    this.level.cactus.forEach((cactus) =>{
      if(this.character.isColliding(cactus)){
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        this.character.setNewTimePassed();
      }
    })
  }

   /**
    * Checks collisions between the character and the endboss chickens, triggering specific actions if necessary.
    * @returns {void}
    */
  checkColisionsWithChickenBoss() {
    this.level.endboss.forEach((enemy) => {
        let id = this.level.endboss.indexOf(enemy);
        if (
            this.character.isColliding(enemy) &&
            !this.level.endboss[id].chickenDoDmgOnCharacter
        ) {
            this.whenCollidesWithChicken(id);
        }
    });
  }

  /**
   * Checks collisions from the top of the screen involving small chicken enemies, executing actions accordingly.
   * @returns {void}
   */
  checkColisionsFromTop() {
    this.level.enemies.forEach((enemy, id) => {
        this.killSmallChicken(enemy, id);
    });
  }

  /**
   * Checks collisions between the character and coins, updating the character's score and other relevant data.
   * @returns {void}
   */
  checkColisionsWithCoins() {
    this.level.coin.forEach((coin) => {
        if (this.character.isColliding(coin)) {
            this.character.scoreCoin();
            this.playSound(this.collectingCoin_sound);
            this.statusBarCoins.setPercentage(this.character.coinValue);
            coin.y = -200;
        }
    });
  }

  /**
   * Checks collisions between the character and salsa bottles, updating the character's score and other relevant data.
   * @returns {void}
   */
  checkColisionsWithSalsaBottle() {
    this.level.salsaBottle.forEach((salsaBottle) => {
        if (this.character.isColliding(salsaBottle)) {
            this.character.scoreBottle();
            this.playSound(this.collectingBottle_sound);
            this.statusBarSalsaBottles.setPercentage(this.character.bottleValue);
            salsaBottle.y = -200;
        }
    });
  }

  /**
   * Checks if the endboss is visible on the screen and updates relevant flags and properties accordingly.
   * @returns {void}
   */
  checkIfEndbossIsVisible() {
    if (world.character.x >= 2300) {
        this.ifEndbossAreNear = true;
        world.level.endboss[0].endbossWalking = true;
    }
  }

  /**
   * Checks if the endboss is hit by throwable objects and performs related actions.
   * @returns {void}
   */
  checkEndbossGetHit() {
    this.level.endboss.forEach((enemy) => {
        this.ThrowableObject.forEach((element) => {
            let id = this.ThrowableObject.indexOf(element);
            if (
                element.isColliding(enemy) &&
                this.ThrowableObject[id].isDmgEndboss
            ) {
                this.hitEndbossHelpFunction(id);
            }
            if (element.y >= 300 && !element.isHitGround) {
                this.whenBottleHitsGround(id, element);
                this.playSound(this.breakingGlass_sound);
                this.throwNewBottleAllowed();
            }
        });
    });
  }

    /**
   * Checks if the chicken is hit by throwable objects and performs related actions.
   * @returns {void}
   */
  checkChickenGetHitFromBottle(){
    this.level.enemies.forEach((enemy) => {
      this.ThrowableObject.forEach((element) => {
      let id = this.ThrowableObject.indexOf(element);
      if(element.isColliding(enemy)){
        enemy.isDead = true;
        this.hitChickenWithBottleHelpFunction(id);
      }
    })
  });
}

  /**
   * Allows throwing a new bottle.
   * @returns {void}
   */
  throwNewBottleAllowed() {
    this.throwNewBottleAllowedCheck = true;
  }

  /**
   * Plays a sound if the game sound is not muted.
   * @param {Sound} sound - The sound to be played.
   * @returns {void}
   */
  playSound(sound) {
    if (!muteSoundsInGame) {
        sound.cloneNode(true).play();
    } else {
        sound.pause();
    }
  }

  /**
   * Checks the direction of throwing and creates a new throwable object accordingly.
   * @returns {void}
   */
  checkThrowableDirection() {
    if (!this.character.otherDirection) {
        let bottle = new ThrowableObject(
            this.character.x + 100,
            this.character.y + 100,
            this.character.otherDirection
        );
        this.throwableHelpFunction(bottle);
    } else {
        let bottle = new ThrowableObject(
            this.character.x - 20,
            this.character.y + 100,
            this.character.otherDirection
        );
        this.throwableHelpFunction(bottle);
    }
  }

   /**
    * Handles actions after throwing a bottle.
    * @param {ThrowableObject} bottle - The bottle object thrown.
    * @returns {void}
    */
  throwableHelpFunction(bottle) {
    this.ThrowableObject.push(bottle);
    this.character.bottleValue -= 10;
    this.statusBarSalsaBottles.setPercentage(this.character.bottleValue);
    this.playSound(this.throwing_sound);
    this.throwNewBottleAllowedCheck = false;
  }

  /**
   * Checks and handles collision with small chickens.
   * @param {Enemy} enemy - The enemy object representing a small chicken.
   * @returns {void}
   */
  killSmallChicken(enemy) {
    if (
        this.character.isColliding(enemy) &&
        this.character.isAboveGround(120) && this.character.speedY <= 0
    ) {
        if (!enemy.isDead) {
            this.whenEnemyAliveJumpAndKill(enemy);
            if (enemy.deleteChicken) {
                this.level.enemies.splice(id, 1);
            }
        } else if (this.character.y >= 120) {
            this.character.speedY = 0;
            this.character.y = 120;
        }
    }
  }

  /**
   * Handles actions when a living chicken is jumped on and killed.
   * @param {Enemy} enemy - The enemy object representing a living chicken.
   * @returns {void}
   */
  whenEnemyAliveJumpAndKill(enemy) {
    this.character.setNewTimePassed();
    this.playSound(this.jumpOnChicken_sound);
    this.character.jump();
    enemy.isDead = true;
  }

  /**
   * Handles actions when an endboss is hit.
   * @param {number} id - The index of the endboss object.
   * @returns {void}
   */
  hitEndbossHelpFunction(id) {
    this.level.endboss[0].hitEndboss();
    this.statusBarEndboss.setPercentage(this.level.endboss[0].chickenLive);
    this.ThrowableObject[id].isHitEndboss = true;
    this.throwNewBottleAllowed();
    this.playSound(this.breakingGlass_sound);
    this.playSound(this.chickenGetHit_sound);
  }

  hitChickenWithBottleHelpFunction(id){
    this.ThrowableObject[id].isHitEndboss = true;
    this.throwNewBottleAllowed();
  }

  /**
   * Deletes dead chickens from the game.
   * @returns {void}
   */
  deleteDeadChicken() {
    this.level.enemies.forEach((enemy, id) => {
        if (enemy.deleteChicken) {
            this.level.enemies.splice(id, 1);
        }
    });
  }

  /**
   * Handles actions when colliding with a chicken.
   * @param {number} id - The index of the collided chicken.
   * @returns {void}
   */
  whenCollidesWithChicken(id){
    this.character.chickenDoDmgOnCharacter = true;
    this.character.hit();
    this.playSound(this.chickenBite_sound);
    this.statusBar.setPercentage(this.character.energy);
    this.character.setNewTimePassed();
    this.level.endboss[id].chickenDoDmgOnCharacter = true;
    setTimeout(() => {
        this.level.endboss[id].chickenDoDmgOnCharacter = false;
    }, 2000);
  }

  /**
   * Handles actions when a bottle hits the ground.
   * @param {number} id - The index of the thrown bottle.
   * @param {ThrowableObject} element - The thrown bottle object.
   * @returns {void}
   */
  whenBottleHitsGround(id, element){
    this.ThrowableObject[id].isHitGround = true;
    this.ThrowableObject[id].speedY = 0;
    this.ThrowableObject[id].x = element.x;
    this.ThrowableObject[id].y = element.y;
  }
}
