const canvas = document.getElementById("canvas")
const context = canvas.getContext("canvas")
const FONT_HEIGHT = 15
const MARGIN = 35
const HAND_TRUNCATION = canvas.width/25
const HOUR_HAND_TRUNCATION = canvas.width/10
const NUMERAL_SPACING = 20
const RADIUS = canvas.width/2 - MARGIN
const HAND_RADIUS = RADIUS + NUMERAL_SPACING

// Functions.......
function drawCircle() {
    context.beginPath()
    context.arc(canvas.width/2, canvas.height/2, RADIUS, 0, Math.PI*2, true)
    context.stroke()
}


