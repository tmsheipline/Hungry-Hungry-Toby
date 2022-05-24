// ====================== Setting Canvas and Context ====================//
let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d')

// ====================== PAINT INTIAL SCREEN =========================== //
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
        // console.log(toby);
        toby.render();

        hamburger = new CharacterMaker(0, 0, 50, 50, 3, hamburgerImage);
        hamburger.render();

        yarn = new CharacterMaker(250, 0, 50, 50, 3, yarnImage);
        yarn.render();

        chicken = new CharacterMaker(500, 0, 50, 50, 3, chickenImage);
        chicken.render();

        rubberband = new CharacterMaker(730, 0, 50, 50, 3, rubberbandImage);
        rubberband.render();
    })()
    
// ========== KEYBOARD INTERACTION LOGIC ============= //
function keyboardMovement(e){
    console.log('the key that was presssed was' + e.key);

    switch (e.key){
        case "ArrowLeft":
            toby.x > 0 ? toby.x -= 10 : null;
            break
        case "ArrowRight":
            toby.x < (game.width - toby.width) ? toby.x += 10 : null;

    }
// console.log(toby);
}

//---- Event listener to get Toby to move base on keydown ----//
document.addEventListener('keydown', keyboardMovement);


// ======== Game Loop Logic ============//
function gameloop(){

    //render game characters






}