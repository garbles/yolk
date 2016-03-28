/* @flow */

import {CustomEvent} from 'yolk/CustomEvent'
import {isFunction} from 'yolk/isFunction'

export function emitMount (node: HTMLElement, fn: Function | void): void {
  if (isFunction(fn) && node.parentNode) {
    const event: CustomEvent = new CustomEvent(`mount`)
    node.dispatchEvent(event)
  }
}

export function emitUnmount (node: HTMLElement, fn: Function | void): void {
  if (isFunction(fn) && node.parentNode) {
    const event: CustomEvent = new CustomEvent(`unmount`)
    node.dispatchEvent(event)
  }
}
