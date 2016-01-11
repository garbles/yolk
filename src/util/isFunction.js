/* @flow */

export function isFunction (fn?: any): boolean {
  return Object.prototype.toString.call(fn) === `[object Function]`
}
