import { Rx } from './yolk'

export default function isObservable (obj) {
  return obj instanceof Rx.Observable
}
