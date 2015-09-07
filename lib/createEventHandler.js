const Rx = require(`rx`)

module.exports = function createEventHandler (mapFn) {
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
  handler.unhook = () => handler.dispose()

  return handler
}
