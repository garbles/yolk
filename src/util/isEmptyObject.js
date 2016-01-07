/* @flow */

export function isEmptyObject (obj: Object): boolean {
  return Object.keys(obj).length === 0
}
