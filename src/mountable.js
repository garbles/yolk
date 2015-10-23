const isFunction = require(`./isFunction`)
const CustomEvent = require(`./CustomEvent`)

function emitMount (node, fn) {
  if (!isFunction(fn)) {
    return
  }

  if (node.parentNode) {
    const event = new CustomEvent(`mount`)
    node.dispatchEvent(event)
  } else {
    setTimeout(() => emitMount(node, fn), 0)
  }
}

function emitUnmount (node, fn) {
  if (isFunction(fn)) {
    const event = new CustomEvent(`unmount`)
    node.dispatchEvent(event)
  }
}

module.exports = {emitMount, emitUnmount}
