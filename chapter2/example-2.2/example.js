const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

context.lineJoin = "round"
context.lineWidth = 30

context.font = "24px Helvetica"
context.fillText("Click anywhere to erase", 175, 200)

context.strokeStyle = "goldenrod"
