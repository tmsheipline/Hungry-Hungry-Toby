// ====================== Setting Canvas and Context ====================//
let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d')

// ====================== PAINT INTIAL SCREEN =========================== //
canvas.setAttribute("width", getComputedStyle(canvas)["width"])
canvas.setAttribute("height", getComputedStyle(canvas)["height"])

// ====================== Variables / DOM Manipulation ==================//
let tobyImage = new Image();
tobyImage.src = "./img/front view toby.png"
// console.log(tobyImage);
// tobyImage.onload = () => {
//     ctx.drawImage(tobyImage, 50, 50);
// }
console.log(tobyImage)

let hamburger;
let rubberband;

// =================== Function or class for the main character (Toby)===================//
function TobyMaker(url, x, y, width, height){
    this.url = url;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.alive = true;
    this.render = function (){
        ctx.drawImage(this.url, this.x, this.y, this.width, this.height);
    };
}
let toby = new TobyMaker("./img/front view toby.png", 200, 400, 20, 40);
console.log(toby);




// === Event Listener to get Toby on the gameboard ==========//
window.addEventListener('DOMContentLoaded', function (e){
    toby = new ObjectMaker(tobyImage, 100, 20, 40, 50);
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