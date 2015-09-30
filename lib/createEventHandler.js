const Rx = require(`rx`)
const isDefined = require(`./isDefined`)
const isFunction = require(`./isFunction`)
const addProperties = require(`./addProperties`)

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

  addProperties(handler, Rx.ReplaySubject.prototype)
  Rx.ReplaySubject.call(handler, 1)

  if (initIsDefined) {
    handler.onNext(init)
  }

  return handler
}
