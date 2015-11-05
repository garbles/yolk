let requestAnimFrame, cancelAnimFrame

if (global.requestAnimationFrame) {
  requestAnimFrame = global.requestAnimationFrame
  cancelAnimFrame = global.cancelAnimationFrame
} else if (global.mozRequestAnimationFrame) {
  requestAnimFrame = global.mozRequestAnimationFrame
  cancelAnimFrame = global.mozCancelAnimationFrame
} else if (global.webkitRequestAnimationFrame) {
  requestAnimFrame = global.webkitRequestAnimationFrame
  cancelAnimFrame = global.webkitCancelAnimationFrame
} else if (global.msRequestAnimationFrame) {
  requestAnimFrame = global.msRequestAnimationFrame
  cancelAnimFrame = global.msCancelAnimationFrame
} else if (global.oRequestAnimationFrame) {
  requestAnimFrame = global.oRequestAnimationFrame
  cancelAnimFrame = global.oCancelAnimationFrame
} else {
  requestAnimFrame = cb => global.setTimeout(cb, 1000 / 60)
  cancelAnimFrame = global.clearTimeout
}

module.exports = {requestAnimFrame, cancelAnimFrame}
