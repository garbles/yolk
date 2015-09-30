const createEventHandler = require(`./createEventHandler`)
const isComponent = require(`./isComponent`)
const createCustomError = require(`./createCustomError`)
const NoComponentError = createCustomError(`NoComponentError`)

function YolkCompositeFunctionWrapper () {
  this._eventHandlers = []
  this._result = null
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

YolkCompositeFunctionWrapper.create = (fn, props, children) => {
  const instance = new YolkCompositeFunctionWrapper()
  const result = fn.call(instance, props, children)

  if (!isComponent(result)) {
    throw new NoComponentError(`Function did not return a valid component. See "${fn.name}".`)
  }

  instance._result = result
  return instance
}

module.exports = YolkCompositeFunctionWrapper
