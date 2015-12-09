import { default as isFunction } from './isFunction'
import { default as CustomEvent } from './CustomEvent'

export function emitMount (node, fn) {
  if (isFunction(fn) && node.parentNode) {
    const event = new CustomEvent(`mount`)
    node.dispatchEvent(event)
  }
}

export function emitUnmount (node, fn) {
  if (isFunction(fn)) {
    const event = new CustomEvent(`unmount`)
    node.dispatchEvent(event)
  }
}
