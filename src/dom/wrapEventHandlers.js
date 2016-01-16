/* @flow */

import {isSubject} from '../rx/isSubject'
import {eventsListUIMap} from './eventsList'

export function wrapEventHandlers (_props: Object): Object {
  const props = {}
  const keys = Object.keys(_props)
  const len = keys.length
  let i = -1

  while (++i < len) {
    const key = keys[i]
    const value = _props[key]
    const event = eventsListUIMap[key]

    if (eventsListUIMap[key] && isSubject(value)) {
      props[event] = ev => value.next(ev)
    } else {
      props[key] = value
    }
  }

  return props
}
