const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const snapshotButton = document.getElementById('snapshotButton')
const snapshotImageElement = document.getElementById('snapshotImageElement')
const FONT_HEIGHT = 15
const MARGIN = 35
const HAND_TRUNCATION = canvas.width/25
const HOUR_HAND_TRUNCATION = canvas.width/10
const NUMERAL_SPACING = 20
const RADIUS = canvas.width/2 - MARGIN
const HAND_RADIUS = RADIUS + NUMERAL_SPACING
let loop

// Functions...
function drawCircle() {
    context.beginPath()
    context.arc(canvas.width/2, canvas.height/2, RADIUS, 0, Math.PI*2, true)
    context.stroke()
}

function drawNumerals() {
    const numerals = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
    let angle = 0
    let numeralWidth = 0

    numerals.forEach(function(numeral) {
        angle = Math.PI/6 * (numeral-3)
        numeralWidth = context.measureText(numeral).width
        context.fillText(numeral,
            canvas.width/2  + Math.cos(angle)*(HAND_RADIUS) - numeralWidth/2,
            canvas.height/2 + Math.sin(angle)*(HAND_RADIUS) + FONT_HEIGHT/3)
    })
}

function drawCenter() {
    context.beginPath()
    context.arc(canvas.width/2, canvas.height/2, 5, 0, Math.PI*2, true)
    context.fill()
}

function drawHand(loc, isHour) {
    const angle = (Math.PI*2) * (loc/60) - Math.PI/2
    let handRadius = isHour ? RADIUS-HAND_TRUNCATION-HOUR_HAND_TRUNCATION : RADIUS-HAND_TRUNCATION

    context.moveTo(canvas.width/2, canvas.height/2)
    context.lineTo(canvas.width/2  + Math.cos(angle)*handRadius, canvas.height/2 + Math.sin(angle)*handRadius)
    context.stroke()
}

function drawHands() {
    const date = new Date
    let hour = date.getHours()
    hour = hour > 12 ? hour - 12 : hour;
    drawHand(hour*5 + (date.getMinutes()/60)*5, true, 0.5)
    drawHand(date.getMinutes(), false, 0.5)
    drawHand(date.getSeconds(), false, 0.2)
}

function drawClock() {
    context.clearRect(0,0,canvas.width,canvas.height)

    context.save()

    context.fillStyle = 'rgba(255,255,255,0.8)'
    context.fillRect(0, 0, canvas.width, canvas.height)

    drawCircle()
    drawCenter()
    drawHands()

    context.restore()

    drawNumerals()
}

snapshotButton.onclick = function(e) {
    let dataUrl
    if (snapshotButton.value === "Take snapshot") {
        dataUrl = canvas.toDataURL()
        clearInterval(loop)
        snapshotImageElement.src = dataUrl
        snapshotImageElement.style.display = "inline"
        canvas.style.display = "none"
        snapshotButton.value = "Return to Canvas"
    } else {
        snapshotButton.value = 'Take snapshot'
        canvas.style.display = "inline"
        snapshotImageElement.style.display = "none"
        loop = setInterval(drawClock, 1000)
    }
}

context.font = FONT_HEIGHT + 'px Arial'
loop = setInterval(drawClock, 1000)
