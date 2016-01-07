/* @flow */

import domDelegator from 'dom-delegator'
import DomDelegator from 'dom-delegator/dom-delegator'
import {eventsList} from './eventsList'

const delegator: DomDelegator = domDelegator()
const len: number = eventsList.length
let i: number = -1

while (++i < len) {
  const event: string = eventsList[i].toLowerCase()
  delegator.listenTo(event)
}

export function addEventListener (node: HTMLElement, key: string, fn: Function): void {
  const event: string = key.substr(2)
  delegator.addEventListener(node, event, fn)
}

export function removeEventListener (node: HTMLElement, key: string, fn: Function): void {
  const event: string = key.substr(2)
  delegator.removeEventListener(node, event, fn)
}
