import { default as Rx } from 'rx'

export default function isObservable (obj) {
  return obj instanceof Rx.Observable
}
