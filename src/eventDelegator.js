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

export const addEventListener = delegator.addEventListener.bind(delegator)
export const removeEventListener = delegator.removeEventListener.bind(delegator)
