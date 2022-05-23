// ====================== Setting Canvas and Context ====================//
let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d')

// ====================== PAINT INTIAL SCREEN =========================== //
canvas.setAttribute("width", getComputedStyle(canvas)["width"])
canvas.setAttribute("height", getComputedStyle(canvas)["height"])

// ====================== Variables / DOM Manipulation ==================//


// Class and Constructor for the main character (Toby)
