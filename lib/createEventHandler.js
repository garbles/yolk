const Rx = require(`rx`)

module.exports = function createEventHandler (mapFn) {
  const mapFnIsFn = typeof mapFn === `function`
  const mapFnIsDefined = typeof mapFn !== `undefined`

  function handler (value) {
    if (mapFnIsFn) {
      value = mapFn(value)
    } else if (mapFnIsDefined) {
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
