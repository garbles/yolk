const isFunction = require(`./isFunction`)
const CustomEvent = require(`./CustomEvent`)

function emitMount (node, fn) {
  if (isFunction(fn) && node.parentNode) {
    const event = new CustomEvent(`mount`)
    node.dispatchEvent(event)
  }
}

function emitUnmount (node, fn) {
  if (isFunction(fn)) {
    const event = new CustomEvent(`unmount`)
    node.dispatchEvent(event)
  }
}

module.exports = {emitMount, emitUnmount}
