class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 270;
  width = 100;
  height = 150;

  /**
   * Loads an image from the given path.
   * @param {string} path - The path of the image file.
   * @returns {void}
   */
  loadImage(path) {
      this.img = new Image();
      this.img.src = path;
  }

  /**
   * Draws the loaded image on the canvas context at the specified position and dimensions.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @returns {void}
   */
  draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Loads multiple images from an array of paths and stores them in the image cache.
   * @param {string[]} arr - An array of paths to image files.
   * @returns {void}
   */
  loadImages(arr) {
      arr.forEach((path) => {
          let img = new Image();
          img.src = path;
          this.imageCache[path] = img;
      });
  }

  /**
   * Plays the specified sound if game sounds are not muted.
   * @param {HTMLAudioElement} sound - The sound to play.
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
   * Plays the specified sound once if game sounds are not muted.
   * @param {HTMLAudioElement} sound - The sound to play.
   * @returns {void}
   */
  playSoundSingle(sound) {
      if (!muteSoundsInGame) {
          sound.play();
      } else {
          sound.pause();
      }
  }
}
