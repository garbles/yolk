const Rx = require(`rx`)

module.exports = function eventHandler (mapFn) {
  function handler (value) {
    if (typeof mapFn === `function`) {
      value = mapFn(value)
    } else if (typeof mapFn !== `undefined`) {
      value = mapFn
    }

    handler.onNext(value)
  }

  for (let key in Rx.BehaviorSubject.prototype) {
    handler[key] = Rx.BehaviorSubject.prototype[key]
  }

  Rx.BehaviorSubject.call(handler, null)
  handler._isHandler = true
  handler.unhook = () => handler.dispose()

  return handler
}
