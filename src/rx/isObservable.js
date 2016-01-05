/* @flow */

export function isObservable (obj: any): boolean {
  return Boolean(obj && obj.subscribe)
}
