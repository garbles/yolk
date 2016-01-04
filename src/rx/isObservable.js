/* @flow */

export function isObservable (obj: any): boolean {
  return obj && obj.subscribe
}
