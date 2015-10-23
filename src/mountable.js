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
  if (!isFunction(fn)) {
    return
  }

  const event = new CustomEvent(`unmount`)

  // node has already been removed from the DOM, so we can`t use delegation
  node.addEventListener(`unmount`, fn, true)
  node.dispatchEvent(event)
  node.removeEventListener(`unmount`, fn, true)
}

module.exports = {emitMount, emitUnmount}
