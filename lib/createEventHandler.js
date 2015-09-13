const Rx = require(`rx`)
const isDefined = require(`./isDefined`)

module.exports = function createEventHandler (mapFn, init) {
  const initIsDefined = isDefined(init)
  const mapFnIsDefined = isDefined(mapFn)
  let handler

  if (mapFnIsDefined) {
    handler = function (value) {
      handler.onNext(mapFn(value))
    }
  } else {
    handler = function (value) {
      handler.onNext(value)
    }
  }

  Rx.internals.addProperties(handler, Rx.ReplaySubject.prototype)
  Rx.ReplaySubject.call(handler, 1)

  if (initIsDefined) {
    handler.onNext(init)
  }

  handler.unhook = handler.dispose

  return handler
}
