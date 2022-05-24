// ====================== Setting Canvas and Context ====================//
let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d')
let image = document.querySelector('#tobypic');

// ====================== PAINT INTIAL SCREEN =========================== //
canvas.setAttribute("width", getComputedStyle(canvas)["width"])
canvas.setAttribute("height", getComputedStyle(canvas)["height"])

// ====================== Variables / DOM Manipulation ==================//
let hamburger;
let rubberband;
// let toby;
let yarn;

//========== Images to load =================//

let hamburgerImage = new Image();
hamburgerImage.src = "img/hamburger icon.png"

let chickenImage = new Image();
chickenImage.src = "img/chickenlegicon.png"

let yarnImage = new Image();
yarnImage.src = "img/yarniconreal.png"

let rubberbandImage = new Image();
rubberbandImage.src = "img/rubberband icon.png"
// =================== Function or class for the main character (Toby)===================//
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
    
    
    
    // === Event Listener to get Toby on the gameboard ==========//
    (function (){
        // let tobyImage = new Image();
        // tobyImage.src = "img/frontviewtoby.png"
        toby = new CharacterMaker(0, 0, 100, 200, 2, image);
        console.log(toby);
        toby.render();
        // console.log(tobyImage);
        // shrek = new Crawler(100, 200, "#bada55", 40, 80);
    
        // console.log(donkey, shrek);
    })()
    
    // window.addEventListener('DOMContentLoaded', function (e){
    //     toby = new CharacterMaker(0, 0, 100, 200, 2, image);
    //     console.log(toby);
    //     toby.render();
    // });
    // toby = new CharacterMaker(20, 30, 100, 200, 2, tobyImage);
    // console.log(toby);
// // ========== KEYBOARD INTERACTION LOGIC ============= //
// function keyboardMovement(e){
//     console.log('the key that was presssed was' + e.key);

//     switch (e.key){
//         case "ArrowLeft":
//             toby.x > 0 ? toby.x -= 10 : null;
//             break
//         case "ArrowRight":
//             toby.x < (game.width - toby.width) ? toby.x += 10 : null;

//     }
// // console.log(toby);
// }

// ======== Game Loop Logic ============//
function gameloop(){

    //render game characters






}