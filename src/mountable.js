/* @flow */

import {CustomEvent} from './CustomEvent'
import {isFunction, isSubject} from './is'

type MountableElement = {
  parentNode: Node;
  dispatchEvent (event: CustomEvent): boolean;
}

export function emitMount (node: MountableElement, fn: Function | void): void {
  if ((isFunction(fn) || isSubject(fn)) && node.parentNode) {
    const event: CustomEvent = new CustomEvent(`mount`)
    node.dispatchEvent(event)
  }
}

export function emitUnmount (node: MountableElement, fn: Function | void): void {
  if ((isFunction(fn) || isSubject(fn)) && node.parentNode) {
    const event: CustomEvent = new CustomEvent(`unmount`)
    node.dispatchEvent(event)
  }
}
