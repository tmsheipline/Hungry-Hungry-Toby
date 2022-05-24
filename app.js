// ======================Global Variables / DOM manipulation ====================//
let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d')
let score = document.querySelector('#score')
let lives = document.querySelector('#lifecount')
let hamburger;
let toby;

// ====================== Setting Canvas and Context =========================== //
canvas.setAttribute("width", getComputedStyle(canvas)["width"])
canvas.setAttribute("height", getComputedStyle(canvas)["height"])

//========== Images to load =================//
let tobyImage = document.querySelector('#tobypic');
let rubberbandImage = document.querySelector('#rubberbandpic')
let yarnImage = document.querySelector('#yarnpic')
let chickenImage = document.querySelector('#chickenpic')
let hamburgerImage = document.querySelector('#burgerpic')

// =================== Class Constructor for the character objects===================//
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
    }};
    
    // === Event Listener to get images on the gameboard ==========//
    (function (){
        toby = new CharacterMaker(300, 280, 150, 250, 2, tobyImage);
        toby.render();
        console.log(toby);

        // hamburger = new CharacterMaker(0, 0, 50, 50, 3, hamburgerImage);
        // hamburger.render();

        // yarn = new CharacterMaker(250, 0, 50, 50, 3, yarnImage);
        // yarn.render();

        // chicken = new CharacterMaker(500, 0, 50, 50, 3, chickenImage);
        // chicken.render();

        // rubberband = new CharacterMaker(730, 0, 50, 50, 3, rubberbandImage);
        // rubberband.render();
    })()
    
// ========== KEYBOARD INTERACTION LOGIC ============= //
function keyboardMovement(e){
    console.log('the key that was presssed was' + e.key);
    
    switch (e.key){
        case "ArrowLeft":
            toby.x = toby.x - 10;
            toby.render(toby.image, toby.x, toby.y);
            break
        case "ArrowRight":
            toby.x = toby.x + 10;
            toby.render(toby.image, toby.x, toby.y);
            break
        }
        console.log(toby);
        }
        
    // switch (e.key){
    //     case "ArrowLeft":
    //         toby.x > 300 ? toby.x -= 10 : null;
    //         break
    //     case "ArrowRight":
    //         toby.x < (game.width - toby.width) ? toby.x += 10 : null;
    // }

//---- Event listener to get Toby to move base on keydown ----//
document.addEventListener('keydown', keyboardMovement);

// ======== Game Loop Logic ============//
function gameloop(){
    ctx.clearRect(0, 0, game.width, game.height);

    if(hamburger.alive){
        hamburger = new CharacterMaker(0, 0, 50, 50, 3, hamburgerImage);
        hamburger.render();
        let hit = detectHit(toby, hamburger);
    }
    toby.render();
}

// //--- Detect Hit Logic ---//
// function detectHit(p1, p2){
//     let hitTest = 
//         p1.y + p1.height > p2.y &&
//         p1.y < p2.y + p2.height &&
//         p1.x + p1.width > p2.x &&
//         p1.x < p2.x + p2.width; // {boolean} : if all are true -> hit

//     if (hitTest){
//         let gameScore = Number(score.textContent); //comes in as a string - put number in front - makes it a number
//         let newScore = gameScore + 100;
//         score.textContent = newScore;
//         return addNewItem();
//     } else {
//         return false;
//     }
// };

// // ==== Add new item onto the board randomly falling from top of page ========//
// function addNewItem(){
//     hamburger.alive = false;
//     setTimeout(function(){
//         let x = Math.floor(Math.random() * game.width) + 10;
//         let y = 0;
//         hamburger = new CharacterMaker(x, y, 50, 50, 3, hamburgerImage);
//     }, 1000)
//     return true;
// }