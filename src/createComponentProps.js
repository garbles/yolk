/* @flow */

import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import isObservable from 'is-observable'

type ComponentProps = {
  asObject (): Object,
  next (v: Object): void,
}

export function createComponentProps (_props: Object): ComponentProps {
  const keys: Array<string> = Object.keys(_props)
  const plainValueKeys: Object = {}

  const props: Object = {}
  const len: number = keys.length
  let i: number = -1

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
    asObject (): Object {
      return props
    },

    next (next: Object): void {
      let j: number = -1

      while (++j < len) {
        const key: string = keys[j]
        const value: any = next[key]
        const old: any = props[key]

        if (plainValueKeys[key]) {
          old.next(value)
        } else if (value !== old) {
          throw new Error(`Observable prop "${key}" changed to different observable`)
        }
      }
    },
  }
}
