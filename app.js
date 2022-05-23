// Initial setting of the canvas and context
let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d')

canvas.setAttribute("width", getComputedStyle(canvas)["width"])
canvas.setAttribute("height", getComputedStyle(canvas)["height"])