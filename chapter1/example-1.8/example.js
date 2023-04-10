const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
const startButton = document.getElementById("startButton")
const glassPane = document.getElementById("glassPane")
let paused = true
let circles = []

drawGrid(context, "lightgray", 10, 10)

context.lineWidth = 0.5
context.font = "32px Arial"

for (let i = 0; i < 100; i++) {
    circles[i] = {
        x: 100,
        y: 100,
        velocityX: 3 * Math.random(),
        velocityY: 3 * Math.random(),
        radius: 50 * Math.random(),
        color: `rgba(${(Math.random()*255).toFixed(0)}, 
                ${(Math.random()*255).toFixed(0)}, 
                ${(Math.random()*255).toFixed(0)}, 1.0)`
    }
}

startButton.onclick = function(e) {
    e.preventDefault()
    e.stopPropagation()
    paused = !paused
    startButton.innerText = paused ? "start" : "stop"
}

glassPane.onmousedown = function(e) {
    e.preventDefault()
    e.stopPropagation()
}

context.canvas.onmousedown = function(e) {
    e.preventDefault()
    e.stopPropagation()
}

setInterval(() => {
    if (!paused) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        drawGrid(context, "lightgray", 10, 10)

        circles.forEach(circle => {
            context.beginPath()
            context.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2, false)
            context.fillStyle = circle.color
            context.fill()
            adjustPosition(circle)
        })
    }
}, 1000/60)

function adjustPosition(circle) {
    let { x, y, velocityX, velocityY, radius } = circle
    if (x + velocityX + radius > context.canvas.width || x + velocityX - radius < 0) {
        velocityX = - velocityX
    }

    if (y + velocityY + radius > context.canvas.height || y + velocityY - radius < 0) {
        velocityY = - velocityY
    }

    x += velocityX
    y += velocityY
}

function drawGrid(context, color, stepX, stepY) {
    context.strokeStyle = color
    context.lineWidth = 0.5

    for (let i = stepX + 0.5; i < context.canvas.width; i += stepX) {
        context.beginPath()
        context.moveTo(i, 0)
        context.lineTo(i, context.canvas.height)
        context.stroke()
    }

    for (let i = stepY + 0.5; i < context.canvas.height; i += stepY) {
        context.beginPath()
        context.moveTo(0, i)
        context.lineTo(context.canvas.width, i)
        context.stroke()
    }
}
