const isFunction = require(`./isFunction`)
const CustomEvent = require(`./CustomEvent`)

function emitMount (node) {
  if (node.parentNode) {
    const event = new CustomEvent(`mount`)
    node.dispatchEvent(event)
  } else {
    setTimeout(() => emitMount(node), 0)
  }
}

function emitUnmount (node, {onMount, onUnmount}) {
  const event = new CustomEvent(`unmount`)
  node.dispatchEvent(event)

  if (isFunction(onUnmount)) {
    node.removeEventListener(`unmount`, onUnmount)
  }

  if (isFunction(onMount)) {
    node.removeEventListener(`mount`, onMount)
  }
}

module.exports = {emitMount, emitUnmount}
