const createEventHandler = require(`./createEventHandler`)

function YolkCompositeFunctionWrapper (fn, props, children) {
  this._fn = fn
  this._eventHandlers = []
  this._result = this._fn(props, children)
}

YolkCompositeFunctionWrapper.prototype = {
  createEventHandler (mapFn, init) {
    const handler = createEventHandler(mapFn, init)
    this._eventHandlers.push(handler)
    return handler
  },

  destroy () {
    const length = this._eventHandlers.length
    let i = -1

    while (++i < length) {
      this._eventHandlers[i].dispose()
    }

    this._result.destroy()
  },
}

module.exports = YolkCompositeFunctionWrapper
