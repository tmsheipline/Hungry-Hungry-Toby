// ======================Global Variables / DOM manipulation ====================//
let canvas = document.querySelector("#game");
let ctx = canvas.getContext("2d");
let score = document.querySelector("#score");
let lives = document.querySelector("#lifecount");
const randomXpos = Math.floor(Math.random() * canvas.width - 10);
let hamburger;
let toby;
let yarn;
let foodSpeed = 0;
let startingPosition = true;
let randomYposition = Math.floor(Math.random() * game.width) + 10;
// //= Make an empty array to store randomly created fallingobjects - makeItem() will add them, then need to remove when caught or fall off board ==//
// const fallingItems = []

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
  foodSpeed: Math.floor(Math.random() * 20) + 5,
  image: hamburgerImage,
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
  foodSpeed: Math.floor(Math.random() * 20) + 4,
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
  foodSpeed: Math.floor(Math.random() * 20) + 3,
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
  foodSpeed: Math.floor(Math.random() * 20) + 2,
  image: yarnImage,
  render() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  },
  move() {
    this.y += this.foodSpeed;
  },
};

// === Event Listener to get images on the gameboard ==========//
window.addEventListener("DOMContentLoaded", function (e) {
  toby = new CharacterMaker(300, 280, 150, 250, 1000, tobyImage);
  toby.render();
  // console.log(toby);

  setInterval(gameloop, 110);
});

// ========== KEYBOARD INTERACTION LOGIC ============= //
function keyboardMovement(e) {
  console.log("the key that was presssed was" + e.key);

  switch (e.key) {
    case "ArrowLeft":
      ctx.clearRect(toby.x, toby.y, toby.width, toby.height);
      // toby.x = toby.x - 20;
      toby.x > -40 ? (toby.x -= 20) : null; //keeps toby on the gameboard
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
  let randomXposition = Math.floor(Math.random() * game.width) + 10;
  let foodSpeed = Math.floor(Math.random() * 20) + 5;
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(toby.x, toby.y, toby.width, toby.height);

  toby.render(toby.x, toby.y, toby.width, toby.height);
  //Items to be drawn and fall randomly along X axis //
  fallingHamburger.render();
  fallingHamburger.move();
  fallingRubberband.render();
  fallingRubberband.move();
  fallingChicken.render();
  fallingChicken.move();
  fallingYarn.render();
  fallingYarn.move();

  repopulate();
}

// //--- Detect Hit Logic ---//
function detectHit(toby, fallingHamburger) {
  let hitTest =
    toby.y + toby.height > fallingHamburger.y &&
    toby.y < fallingHamburger.y + fallingHamburger.height &&
    toby.x + toby.width > fallingHamburger.x &&
    toby.x < fallingHamburger.x + fallingHamburger.width; // {boolean} : if all are true -> hit

  //   if (hitTest) {
  //     let gameScore = Number(score.textContent); //comes in as a string - put number in front - makes it a number
  //     let newScore = gameScore + 100;
  //     score.textContent = `Score:${newScore}`;
  //   } else {
  //     return false;
  //   }
  // }

  if (hitTest) {
    let gameScore = Number(score.textContent); //comes in as a string - put number in front - makes it a number
    let newScore = gameScore + 100;
    score.textContent = `Score:${newScore}`;
  } else if (hitTest) {
    // let lives = document.querySelector("#lifecount");
    let lifeCount = lives.textContent;
    let livesLeft = lifeCount - 1;
  }
}
