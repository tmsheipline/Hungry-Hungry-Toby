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

// ============= Class Constructor for all falling objects =================== //
class FallingObject {
    constructor (x, y, width, height, speed, image){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = width;
        this.speed = speed;
        this.image = image;
        this.alive = true;
        this.render = function (){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
};

// ======= class constructor for the falling items =============//
 
    
    // === Event Listener to get images on the gameboard ==========//
    (function (){
        toby = new CharacterMaker(300, 280, 150, 250, 1000, tobyImage);
        toby.render();
        // console.log(toby);

// ========= Don't want falling objects directly loaded onto screen on load =========//
        // hamburger = new CharacterMaker(0, 0, 50, 50, 3, hamburgerImage);
        // hamburger.render();

        // yarn = new CharacterMaker(250, 0, 50, 50, 3, yarnImage);
        // yarn.render();

        // chicken = new CharacterMaker(500, 0, 50, 50, 3, chickenImage);
        // chicken.render();

        // rubberband = new CharacterMaker(730, 0, 50, 50, 3, rubberbandImage);
        // rubberband.render();

        setInterval(gameloop, 120);
    })()
    
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

//--- Detect Hit Logic ---//
function detectHit(p1, p2){
    let hitTest = 
        p1.y + p1.height > p2.y &&
        p1.y < p2.y + p2.height &&
        p1.x + p1.width > p2.x &&
        p1.x < p2.x + p2.width; // {boolean} : if all are true -> hit

    if (hitTest){
        let gameScore = Number(score.textContent); //comes in as a string - put number in front - makes it a number
        let newScore = gameScore + 100;
        score.textContent = newScore;
        return addNewItem();
    } else {
        return false;
    }
};

// // ==== Add new item onto the board randomly falling from top of page ========//
function addNewItem(){
    hamburger = new FallingObject(x, y, 50, 50, 3, hamburgerImage);
    hamburger.alive = false;
    setTimeout(function(){
        let x = Math.floor(Math.random() * game.width) + 10;
        let y = 0;
    }, 1000)
    return true;
}