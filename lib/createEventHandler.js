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

  if (initIsDefined) {
    Rx.internals.addProperties(handler, Rx.BehaviorSubject.prototype)
    Rx.BehaviorSubject.call(handler, init)
  } else {
    Rx.internals.addProperties(handler, Rx.Subject.prototype)
    Rx.Subject.call(handler)
  }

  handler.unhook = handler.dispose

  return handler
}
