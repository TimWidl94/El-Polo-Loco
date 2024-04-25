class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;

  constructor() {
    this.bindKeyPressEvents();
    this.mobileBtsPressEvent();
  }

  bindKeyPressEvents(){
    window.addEventListener("keydown", (event) => {
      if (event.keyCode == 39) {
        keyboard.RIGHT = true;
      }
      if (event.keyCode == 37) {
        keyboard.LEFT = true;
      }
      if (event.keyCode == 32) {
        keyboard.UP = true;
      }
      if (event.keyCode == 40) {
        keyboard.DOWN = true;
      }
      if (event.keyCode == 32) {
        keyboard.SPACE = true;
      }
      if (event.keyCode == 68) {
        keyboard.D = true;
      }
    });

    window.addEventListener("keyup", (event) => {
      if (event.keyCode == 39) {
        keyboard.RIGHT = false;
      }
      if (event.keyCode == 37) {
        keyboard.LEFT = false;
      }
      if (event.keyCode == 32) {
        keyboard.UP = false;
      }
      if (event.keyCode == 40) {
        keyboard.DOWN = false;
      }
      if (event.keyCode == 32) {
        keyboard.SPACE = false;
      }
      if (event.keyCode == 68) {
        keyboard.D = false;
      }
    });
    }

  mobileBtsPressEvent() {
    document.getElementById('leftArrowButton').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.LEFT = true;
    });

    document.getElementById('leftArrowButton').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.LEFT = false;
    });

    document.getElementById('rightArrowButton').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.RIGHT = true;
    });

    document.getElementById('rightArrowButton').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.RIGHT = false;
    });

    document.getElementById('jumpButton').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.UP = true;
    });

    document.getElementById('jumpButton').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.UP = false;
    });

    document.getElementById('throwButton').addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.D = true;
    });

    document.getElementById('throwButton').addEventListener('touchend', (e) => {
      e.preventDefault();
      this.D = false;
    });
  } 
}
