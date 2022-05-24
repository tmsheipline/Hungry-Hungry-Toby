// ====================== Setting Canvas and Context ====================//
let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d')

// ====================== PAINT INTIAL SCREEN =========================== //
canvas.setAttribute("width", getComputedStyle(canvas)["width"])
canvas.setAttribute("height", getComputedStyle(canvas)["height"])

// ====================== Variables / DOM Manipulation ==================//
let hamburger;
let hairtie;

//========== Images to load =================//
let tobyImage = new Image();
tobyImage.src = "img/front view toby.png"

let hamburgerImage = new Image();
hamburgerImage.src = "img/hamburger icon.png"

let chickenImage = new Image();
chickenImage.src = "img/chickenlegicon.png"

let yarnImage = new Image();
yarnImage.src = "img/yarniconreal.png"

let rubberbandImage = new Image();
rubberbandImage.src = "img/rubberband icon.png"
// =================== Function or class for the main character (Toby)===================//
class TobyMaker {
    constructor (url, x, y, width, height){
    this.url = url;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.alive = true;
    this.render = function (){
        ctx.drawImage(this.url, this.x, this.y, this.width, this.height);
    };
}};

let toby = new TobyMaker("img/front view toby.png", 200, 400, 20, 40);
console.log(toby);




// === Event Listener to get Toby on the gameboard ==========//
window.addEventListener('DOMContentLoaded', function (e){
    toby = new TobyMaker(tobyImage, 100, 20, 40, 50);
})


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