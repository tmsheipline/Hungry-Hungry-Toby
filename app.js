// ====================== Setting Canvas and Context ====================//
let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d')

// ====================== PAINT INTIAL SCREEN =========================== //
canvas.setAttribute("width", getComputedStyle(canvas)["width"])
canvas.setAttribute("height", getComputedStyle(canvas)["height"])

// ====================== Variables / DOM Manipulation ==================//
let toby;
let hamburger;
let rubberband;

// =====================Class and Constructor for the main character (Toby)===================//
class Toby {
    constructor(url, x, y, width, height){
        this.url = url;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.alive = true;
        this.render = function() {
            ctx.drawImage(this.url, this.x, this.y, this.width, this.height);
        };
    }
}
// === Event Listener to get Toby on the gameboard ==========//
window.addEventListener('DOMContentLoaded', function (e){

})