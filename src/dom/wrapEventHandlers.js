/* @flow */

import {Subject} from 'rxjs/Subject'
import {isSubject} from '../rx/isSubject'
import {eventsListUIMap} from './eventsList'

function createWrapper (subject: Subject): Function {
  return ev => subject.next(ev)
}

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
      props[event] = createWrapper(value)
    } else {
      props[key] = value
    }
  }

  return props
}
