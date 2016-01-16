import {ReplaySubject} from 'rxjs/subject/ReplaySubject'
import {isDefined} from '../util/isDefined'
import {isFunction} from '../util/isFunction'

export function createEventHandler (mapFn, init) {
  const initIsDefined = isDefined(init)
  const mapFnIsDefined = isDefined(mapFn)
  const mapFnIsFunction = isFunction(mapFn)
  let handler

  if (mapFnIsDefined && mapFnIsFunction) {
    handler = function handlerWithFunctionMap (value) {
      handler.next(mapFn(value))
    }
  } else if (mapFnIsDefined) {
    handler = function handlerWithValueMap () {
      handler.next(mapFn)
    }
  } else {
    handler = function handlerWithoutMap (value) {
      handler.next(value)
    }
  }

  for (const key in ReplaySubject.prototype) {
    handler[key] = ReplaySubject.prototype[key]
  }

  ReplaySubject.call(handler, 1)

  if (initIsDefined) {
    handler.next(init)
  }

  return handler
}
