let canvas;
let world;
let keyboard = new Keyboard();
let endbossIsDead = false;
let intervalIds = [];
let muteSoundsInGame = false;
let backgroundMusic_sound = new Audio("./audio/backgroundMusic.mp3");
let endboss_sound = new Audio("./audio/endboss.mp3");
backgroundMusic_sound.volume = 0.5;
endboss_sound.volume = 0.5;

/**
 * Initializes the game by setting up the initial screen, canvas, level, world, and hiding story and manual boxes.
 * @res {void}
 */
async function init() {
  document.getElementById("startScreenContainer").style.display = "none";
  document.getElementById("canvas").style.display = "flex";
  canvas = document.getElementById("canvas");
  initLevel();
  world = new World(canvas, keyboard);
  closeStoryBook();
  closeManual();
  world.character.setNewTimePassed();
}

/**
 * Displays the game over screen, hides the canvas and start screen, stops the game, and pauses the background music.
 * @res {void}
 */
function gameOver() {
  document.getElementById("endScreenContainer").style.display = "flex";
  document.getElementById("canvas").style.display = "none";
  document.getElementById("startScreenContainer").style.display = "none";
  backgroundMusic_sound.pause();
  endboss_sound.pause();
  stopGame();
}

/**
 * Stops all intervals currently running in the game.
 * @res {void}
 */
function stopGame() {
  for (let i = 1; i < 9999; i++){ 
    window.clearInterval(i);
  }
}

/**
 * Sets a stoppable interval for a given function and time.
 * @param {Function} fn - The function to be executed repeatedly.
 * @param {number} time - The interval time in milliseconds.
 * @res {void}
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

/**
 * Restarts the game by initializing the level and world, hides the end screen, and displays the canvas.
 * @res {void}
 */
async function restartGame() {
  await initLevel();
  world = new World(canvas, keyboard);
  document.getElementById("endScreenContainer").style.display = "none";
  document.getElementById("canvas").style.display = "flex";
  checkIfSoundIsMute();
}

/**
 * check if sound is mute in game.
 * @res {void}
 */
function checkIfSoundIsMute(){
  if(!muteSoundsInGame){
    muteSoundsInGame = false;
  } else {muteSoundsInGame = true};
}

/**
 * Mutes or unmutes the game sounds.
 * @res {void}
 */
function muteSound() {
  if (!muteSoundsInGame) {
    muteSoundsInGame = true;
    document.getElementById("musicButtonIcon").src =
      "./img/ElPoloLoco/icons/musicOffIcon.png";
  } else {
    muteSoundsInGame = false;
    document.getElementById("musicButtonIcon").src =
      "./img/ElPoloLoco/icons/musicOnButton.png";
  }
}

/**
 * Opens the game manual box and hides the story book box.
 * @res {void}
 */
function openManual(){
  let manualBox = document.getElementById('manualBox');
  manualBox.style.display = "flex";
  closeStoryBook();
}

/**
 * Closes the game manual box.
 * @res {void}
 */
function closeManual(){
  let manualBox = document.getElementById('manualBox');
  manualBox.style.display = "none";
}

/**
 * Opens the game story book box and hides the manual box.
 * @res {void}
 */
function openStoryBook(){
  let storyBookBox = document.getElementById('storyBookBox')
  storyBookBox.style.display = "flex";
  closeManual();
}

/**
 * Closes the game story book box.
 * @res {void}
 */
function closeStoryBook(){
  let storyBookBox = document.getElementById('storyBookBox')
  storyBookBox.style.display = "none";
}

/**
 * Displays the start screen of the game.
 * @res {void}
 */
function startScreen(){
  document.getElementById("endScreenContainer").style.display = "none";
  document.getElementById("canvas").style.display = "none";
  document.getElementById("startScreenContainer").style.display = "flex";
}

