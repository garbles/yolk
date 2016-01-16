import {Subject} from 'rxjs/Subject'
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject'
import {isDefined} from '../util/isDefined'
import {isSubject} from '../rx/isSubject'
import {eventsListUIMap} from './eventsList'

export function copyPropsWithWrappedEventHandlers (_props: Object): void {
  const props = {}
  const keys = Object.keys(_props)
  const len = keys.length
  let i = -1

  while (++i < len) {
    const key = keys[i]
    const value = _props[key]
    const event = eventsListUIMap[key]

    if (isDefined(event)) {
      if (isSubject(value)) {
        props[event] = v => {
          value.next(v)
        }
      } else {
        props[event] = value
      }
    } else {
      props[key] = value
    }
  }

  return props
}

export function createEventHandler () {
  return new Subject()
}
