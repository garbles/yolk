const Rx = require(`./Rx`)
const isDefined = require(`./isDefined`)
const isFunction = require(`./isFunction`)

module.exports = function createEventHandler (mapFn, init) {
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

  Rx.internals.addProperties(handler, Rx.ReplaySubject.prototype)
  Rx.ReplaySubject.call(handler, 1)

  if (initIsDefined) {
    handler.onNext(init)
  }

  return handler
}
