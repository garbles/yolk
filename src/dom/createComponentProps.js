import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject'
import {isObservable} from '../rx/isObservable'

export function createComponentProps (_props) {
  const keys = Object.keys(_props)
  const plainValueKeys = {}

  const props = {}
  const len = keys.length
  let i = -1

  while (++i < len) {
    const key = keys[i]
    const value = _props[key]

    if (isObservable(value)) {
      props[key] = value
    } else {
      plainValueKeys[key] = true
      props[key] = new BehaviorSubject(value)
    }
  }

  return {
    asObject () {
      return props
    },

    next (next) {
      let j = -1

      while (++j < len) {
        const key = keys[j]
        const value = next[key]
        const old = props[key]

        if (plainValueKeys[keys]) {
          old.next(value)
        } else if (value !== old) {
          throw new Error(`Observable prop "${key}" changed to different observable`)
        }
      }

    }
  }
}
