// ======================Global Variables / DOM manipulation ====================//
let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d')
let score = document.querySelector('#score')
let lives = document.querySelector('#lifecount')
let hamburger;
let toby;
let yarn;

// ====================== Setting Canvas and Context =========================== //
canvas.setAttribute("width", getComputedStyle(canvas)["width"])
canvas.setAttribute("height", getComputedStyle(canvas)["height"])

//========== Images to load =================//
let tobyImage = document.querySelector('#tobypic');
let rubberbandImage = document.querySelector('#rubberbandpic')
let yarnImage = document.querySelector('#yarnpic')
let chickenImage = document.querySelector('#chickenpic')
let hamburgerImage = document.querySelector('#burgerpic')

// =================== Class Constructor for the main character object================== //
class CharacterMaker {
    constructor (x, y, width, height, speed, image){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.image = image;
        this.alive = true;
        this.render = function (){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
};

// === Get Hamburger on gameboard - falling from random x axis points ===//
// const fallingHamburger = {
//     x: Math.floor(Math.random() * 20),
//     y: 0,
//     width: 50,
//     height: 50,
//     speed: 10,
//     render(){
//         ctx.drawImage(image, this.x, this.y, this.width, this.height);
//     },
//     move(){
//         this.y += this.speed;
//     }
// };

// ==== Function to draw falling objects onto game board ====//
// function fallObject {
//     hamburgerImage.render(hamburgerImage, math.random(), 0, 50, 50);
//     hamburgerImage.move(0, 20)
// }

// fallObject();

// ============= Class Constructor for all falling objects =================== //
class FallingObject {
    constructor (image, width, height, speed, x){
        this.x = x;
        this.y = 0;
        this.image = image;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.alive = true;
        this.render = function (){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        this.move = function (){
            this.y += this.speed;
            if(this.y === 1000){
                this.y = 0
            }
        }
    }
};
// === Event Listener to get images on the gameboard ==========//
window.addEventListener("DOMContentLoaded", function (e){
    toby = new CharacterMaker(300, 280, 150, 250, 1000, tobyImage);
    toby.render();
    // console.log(toby);
    const randomXpos = Math.floor(Math.random() * (canvas.width) - 10);

    hamburger = new FallingObject(hamburgerImage, 50, 50, 50, 3, randomXpos);
    hamburger.render();
    hamburger.move();

    // yarn = new CharacterMaker(250, 0, 50, 50, 3, yarnImage);
    // yarn.render();

    // chicken = new CharacterMaker(500, 0, 50, 50, 3, chickenImage);
    // chicken.render();

    // rubberband = new CharacterMaker(730, 0, 50, 50, 3, rubberbandImage);
    // rubberband.render();

    setInterval(gameloop, 120);
})


// //= Make an empty array to store randomly created fallingobjects - makeItem() will add them, then need to remove when caught or fall off board ==// 
const fallingItems = []


// // === Create random number generator to be called like which object to create, starting position on x axis == //

function randomNum(num1, num2){
        num1 = Math.ceil(num1)
        num2 = Math.floor(num2)
        return Math.floor(Math.random() * num1 - num2 + 1) + num1
    }

    for (f = 0; f < randomNum; f++){
        fallingItems.push(new makeItem());
    }


// // == Function to create falling object items for player to collect or avoid. Want position to be randomly generated on x axis.
// // parameters are name, image, width, height, rate, x
 function makeItem(){
     let hamburger = new FallingObject('hamburger', hamburgerImage, 50, 50, 20, randomNum(0, canvas.width));
     let chicken = new FallingObject('chicken', chickenImage, 50, 50, 40, randomNum(0, canvas.width));
     let rubberband = new FallingObject('rubberband', rubberbandImage, 50, 50, 30, randomNum(0, canvas.width));
     let yarn = new FallingObject('yarn', yarnImage, 50, 50, 20, randomNum(0, canvas.width));
}


// === Get items from array onto gameboard === //
function drawItem(){
    for (let i = 0; i < fallingItems.length; i++){
        fallingItems[i].render()
        fallingItems[i].y += fallingItems[i].rate
    }
};
    
// ========== KEYBOARD INTERACTION LOGIC ============= //
function keyboardMovement(e){
    console.log('the key that was presssed was' + e.key);
    
    switch (e.key){
        case "ArrowLeft":
            ctx.clearRect(toby.x, toby.y, toby.width, toby.height);
            // toby.x = toby.x - 20;
            toby.x > -40 ? toby.x -= 20 : null; //keeps toby on the gameboard
            toby.render(toby.image, toby.x, toby.y);
            break
        case "ArrowRight":
            ctx.clearRect(toby.x, toby.y, toby.width, toby.height);
            // toby.x = toby.x + 20;
            toby.x < (game.width - toby.width) ? toby.x += 20 : null; //keeps toby on gameboard
            toby.render(toby.image, toby.x, toby.y);
            break
        }
        // console.log(toby);
        }
        
//---- Event listener to get Toby to move base on keydown ----//
document.addEventListener('keydown', keyboardMovement);

// ======== Game Loop Logic ============//
function gameloop(){
    ctx.clearRect(toby.x, toby.y, toby.width, toby.height);

    toby.render(toby.x, toby.y, toby.width, toby.height);
    }

    
    // // ==== Add new item onto the board randomly falling from top of page ========//
    function addNewItem(){
        hamburger.alive = false;
        hamburger = new FallingObject(x, y, 50, 50, 3, hamburgerImage);
        setTimeout(function(){
            let x = Math.floor(Math.random() * game.width) + 10;
            let y = 0;
        }, 1000)
        return true;
    }
    // //--- Detect Hit Logic ---//
    // function detectHit(){
    //     for (let i = 0; i < fallingItems.length; i++){
    //         let toby = 
    
    
    //     }
    //     if (hitTest){
    //         let gameScore = Number(score.textContent); //comes in as a string - put number in front - makes it a number
    //         let newScore = gameScore + 100;
    //         score.textContent = newScore;
    //         return addNewItem();
    //     } else {
    //         return false;
    //     }
    // };