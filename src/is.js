/* @flow */

import {Subject} from 'rxjs/Subject'
import {$$virtual} from './symbol'

export function isDefined (obj: any): boolean {
  return (typeof obj !== `undefined`)
}

export function isEmptyObject (obj: any): boolean {
  return Object.keys(obj).length === 0
}

export function isFunction (obj: any): boolean {
  return Object.prototype.toString.call(obj) === `[object Function]`
}

export function isNumber (obj: any): boolean {
  return (typeof obj === `number`)
}

export function isString (obj: any): boolean {
  return (typeof obj === `string`)
}

export function isSubject (obj: any): boolean {
  return obj instanceof Subject
}

export function isVirtual (obj: any): boolean {
  return !!obj && obj[$$virtual]
}
