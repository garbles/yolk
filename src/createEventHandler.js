import { default as Rx } from 'rx'
import { default as isDefined } from './isDefined'
import { default as isFunction } from './isFunction'
import { default as addProperties } from './addProperties'

export default function createEventHandler (mapFn, init) {
  const initIsDefined = isDefined(init)
  const mapFnIsDefined = isDefined(mapFn)
  const mapFnIsFunction = isFunction(mapFn)
  let handler

  if (mapFnIsDefined && mapFnIsFunction) {
    handler = function handlerWithFunctionMap (value) {
      handler.onNext(mapFn(value))
    }
  } else if (mapFnIsDefined) {
    handler = function handlerWithValueMap () {
      handler.onNext(mapFn)
    }
  } else {
    handler = function handlerWithoutMap (value) {
      handler.onNext(value)
    }
  }

  addProperties(handler, Rx.ReplaySubject.prototype)
  Rx.ReplaySubject.call(handler, 1)

  if (initIsDefined) {
    handler.onNext(init)
  }

  return handler
}
