// ====================== Global Variables / DOM manipulation ====================//
let canvas = document.querySelector("#game");
let ctx = canvas.getContext("2d");
let score = document.querySelector("#score");
let lives = document.querySelector("#lifecount");
let foodSpeed = 0;
let randomYposition = Math.floor(Math.random() * game.width) + 10;
let lifeCount = 0;
let newScore = 0;
let startModal = document.querySelector("#start-modal");
let winMessage = document.querySelector("#winMessage");
let loseMessage = document.querySelector("#loseMessage");
let resetButton = document.querySelector(".play-again");
let resetButtonLose = document.querySelector(".play-againlose");
let gameContainer = document.querySelector("#game-container");
let initGame = document.querySelector("#initgame");
const myInterval = setInterval(gameloop, 1200);
let tobyAudio = new Audio('./img/tobymeow.mp3');
let winAudio = new Audio('./img/winaudio.mp3');
let loseAudio = new Audio('./img/losesound.mp3');
let munchAudio = new Audio('./img/munch.mp3');

// ====================== Setting Canvas and Context =========================== //
canvas.setAttribute("width", getComputedStyle(canvas)["width"]);
canvas.setAttribute("height", getComputedStyle(canvas)["height"]);

//========== Images to load =================//
let tobyImage = document.querySelector("#tobypic");
let rubberbandImage = document.querySelector("#rubberbandpic");
let yarnImage = document.querySelector("#yarnpic");
let chickenImage = document.querySelector("#chickenpic");
let hamburgerImage = document.querySelector("#burgerpic");

// =================== Class Constructor for the main character object================== //
class CharacterMaker {
  constructor(x, y, width, height, speed, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.image = image;
    this.alive = true;
    this.render = function () {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
  }
}

// === Get Hamburger on gameboard - falling from random x axis points ===//
const fallingHamburger = {
  x: Math.floor(Math.random() * game.width) + 10,
  y: 0,
  width: 50,
  height: 50,
  foodSpeed: Math.floor(Math.random() * 20) + 11,
  image: hamburgerImage,
  alive: true,
  render() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  },
  move() {
    this.y += this.foodSpeed;
  },
};
// == Get rubberband on board - fall from random x axis point == //
const fallingRubberband = {
  x: Math.floor(Math.random() * game.width) + 10,
  y: 0,
  width: 50,
  height: 50,
  foodSpeed: Math.floor(Math.random() * 20) + 52,
  image: rubberbandImage,
  render() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  },
  move() {
    this.y += this.foodSpeed;
  },
};
// == Get chickenleg on board - fall from random x axis point == //
const fallingChicken = {
  x: Math.floor(Math.random() * game.width) + 10,
  y: 0,
  width: 50,
  height: 50,
  foodSpeed: Math.floor(Math.random() * 20) + 23,
  image: chickenImage,
  render() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  },
  move() {
    this.y += this.foodSpeed;
  },
};
// == Get yarnball on board - fall from random x axis point == //
const fallingYarn = {
  x: Math.floor(Math.random() * game.width) + 10,
  y: 0,
  width: 50,
  height: 50,
  foodSpeed: Math.floor(Math.random() * 20) + 19,
  image: yarnImage,
  render() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  },
  move() {
    this.y += this.foodSpeed;
  },
};
console.log(fallingYarn);

// === Event Listener to get images on the gameboard ==========//
window.addEventListener("DOMContentLoaded", function (e) {
  toby = new CharacterMaker(340, 420, 80, 110, 1000, tobyImage);
  toby.render();
  stopGame();
  gameContainer.style.display = "none";

  // console.log(toby);
});

// ========== KEYBOARD INTERACTION LOGIC ============= //
function keyboardMovement(e) {
  //   console.log("the key that was presssed was" + e.key);
  switch (e.key) {
    case "ArrowLeft":
      ctx.clearRect(toby.x, toby.y, toby.width, toby.height);
      // toby.x = toby.x - 20;
      toby.x > 0 ? (toby.x -= 20) : null; //keeps toby on the gameboard
      toby.render(toby.image, toby.x, toby.y);
      break;
    case "ArrowRight":
      ctx.clearRect(toby.x, toby.y, toby.width, toby.height);
      // toby.x = toby.x + 20;
      toby.x < game.width - toby.width ? (toby.x += 20) : null; //keeps toby on gameboard
      toby.render(toby.image, toby.x, toby.y);
      break;
  }
  // console.log(toby);
}

//---- Event listener to get Toby to move base on keydown ----//
document.addEventListener("keydown", keyboardMovement);

// === Get Items to regenerate and keep falling after hit or after hitting bottom of the gameboard ==//
function repopulate() {
  let randomXposition = Math.floor(Math.random() * game.width) - 10;
  let foodSpeed = Math.floor(Math.random() * 20) + 1;
  if (fallingHamburger.y > canvas.height) {
    fallingHamburger.y = 0;
    fallingHamburger.x = randomXposition;
    fallingHamburger.foodSpeed = foodSpeed;
  } else if (fallingChicken.y > canvas.height) {
    fallingChicken.y = 0;
    fallingChicken.x = randomXposition;
    fallingChicken.foodSpeed = foodSpeed;
  } else if (fallingYarn.y > canvas.height) {
    fallingYarn.y = 0;
    fallingYarn.x = randomXposition;
    fallingYarn.foodSpeed = foodSpeed;
  } else if (fallingRubberband.y > canvas.height) {
    fallingRubberband.y = 0;
    fallingRubberband.x = randomXposition;
    fallingRubberband.foodSpeed = foodSpeed;
  }
}

// ======== Game Loop Logic ============//
function gameloop() {
  // ==== Clear trailing image objects ====== //
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Clear Toby trailing image ===============//
  ctx.clearRect(toby.x, toby.y, toby.width, toby.height);

  // === Draw Toby on the board each loop === //
  toby.render(toby.x, toby.y, toby.width, toby.height);
 
  // === Call Functions to operate in gameloop ==== //
  makeItems();
  repopulate();
  detectHamburgerHit(toby, fallingHamburger);
  detectChickenHit(toby, fallingChicken);
  detectYarnHit(toby, fallingYarn);
  detectRubberbandHit(toby, fallingRubberband);
}

// function to make items and start the falling action
function makeItems() {
  fallingHamburger.render();
  fallingHamburger.move();
  fallingRubberband.render();
  fallingRubberband.move();
  fallingChicken.render();
  fallingChicken.move();
  fallingYarn.render();
  fallingYarn.move();
}

// //--- Detect Hit Logic Functions for each falling item ---//
function detectHamburgerHit(toby, fallingHamburger) {
  let hamHitTest =
    toby.y + toby.height > fallingHamburger.y &&
    toby.y < fallingHamburger.y + fallingHamburger.height &&
    toby.x + toby.width > fallingHamburger.x &&
    toby.x < fallingHamburger.x + fallingHamburger.width; // {boolean} : if all are true -> hit
  if (hamHitTest) {
    // console.log(`hamburger hit toby!`);
    munchAudio.play();
    let randomXposition = Math.floor(Math.random() * game.width) - 10;
    fallingHamburger.x = randomXposition;
    fallingHamburger.y = 0;
    let gameScore = Number(score.textContent);
    let newScore = gameScore + 1;
    score.textContent = newScore;
    winGame();
  } else {
    return false;
  }
}

function detectChickenHit(toby, fallingChicken) {
  let chickenHitTest =
    toby.y + toby.height > fallingChicken.y &&
    toby.y < fallingChicken.y + fallingChicken.height &&
    toby.x + toby.width > fallingChicken.x &&
    toby.x < fallingChicken.x + fallingChicken.width; // {boolean} : if all are true -> hit

  if (chickenHitTest) {
    // console.log(`Chicken hit toby!`);
    munchAudio.play();
    let randomXposition = Math.floor(Math.random() * game.width) - 10;
    fallingChicken.x = randomXposition;
    fallingChicken.y = 0;
    let gameScore = Number(score.textContent);
    let newScore = gameScore + 1;
    score.textContent = newScore;
    winGame();
  } else {
    return false;
  }
}

function detectYarnHit(toby, fallingYarn) {
  let yarnHitTest =
    toby.y + toby.height > fallingYarn.y &&
    toby.y < fallingYarn.y + fallingYarn.height &&
    toby.x + toby.width > fallingYarn.x &&
    toby.x < fallingYarn.x + fallingYarn.width; // {boolean} : if all are true -> hit

  if (yarnHitTest) {
    // console.log(`Yarn hit toby!`);
    tobyAudio.play();
    let randomXposition = Math.floor(Math.random() * game.width) - 10;
    fallingYarn.x = randomXposition;
    fallingYarn.y = 0;
    let live = Number(lives.textContent);
    let lifeCount = live - 1;
    lives.textContent = lifeCount;
    loseGame();
  } else {
    return false;
  }
}

function detectRubberbandHit(toby, fallingRubberband) {
  let rubberbandHitTest =
    toby.y + toby.height > fallingRubberband.y &&
    toby.y < fallingRubberband.y + fallingRubberband.height &&
    toby.x + toby.width > fallingRubberband.x &&
    toby.x < fallingRubberband.x + fallingRubberband.width; // {boolean} : if all are true -> hit

  if (rubberbandHitTest) {
    // console.log(`Rubberband hit Toby`);
    tobyAudio.play();
    let randomXposition = Math.floor(Math.random() * game.width) - 10;
    fallingRubberband.x = randomXposition;
    fallingRubberband.y = 0;
    let live = Number(lives.textContent);
    let lifeCount = live - 1;
    lives.textContent = lifeCount;
    loseGame();
  } else {
    return false;
  }
}

function gameStatus() {
  loseGame();
  winGame();
}

function restartGame() {
  startModal.style.display = "none";
  gameContainer.style.dispaly = "grid";
  // stopGame();
  window.location.reload();

}

function startGame() {
  // window.location.reload();
  startModal.style.display = "none";
  gameContainer.style.display = "grid";
  setInterval(gameloop, 120);
}

function stopGame() {
  clearInterval(myInterval);
  // clearInterval(modal, 1000);
  console.log("stop game called");
}

function loseGame(){
  if (lives.textContent == 0){
    stopGame();
  gameContainer.style.display = "none"
  loseMessage.style.display = "block"
  loseAudio.play();
} else {
  return false
}
}
function winGame(){
  if (score.textContent == 5){
    stopGame();
  gameContainer.style.display = "none";
  winMessage.style.display = "block"
  winAudio.play();

} else {
  return false;
}
}
resetButton.addEventListener("click", restartGame);
resetButtonLose.addEventListener("click", restartGame);
initGame.addEventListener("click", startGame);
