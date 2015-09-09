const Rx = require(`rx`)

module.exports = function createEventHandler (mapFn) {
  const isFunction = (typeof mapFn === `function`)
  const isDefined = (typeof mapFn !== `undefined`)

  function handler (value) {
    if (isFunction) {
      value = mapFn(value)
    } else if (isDefined) {
      value = mapFn
    }

    handler.onNext(value)
  }

  for (let key in Rx.BehaviorSubject.prototype) {
    handler[key] = Rx.BehaviorSubject.prototype[key]
  }

  Rx.BehaviorSubject.call(handler, null)
  handler.unhook = handler.dispose

  return handler
}
