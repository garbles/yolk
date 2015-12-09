import { default as createEventHandler_ } from './createEventHandler'
import { default as isComponent } from './isComponent'

function YolkCompositeFunctionWrapper (fn, props, children) {
  const eventHandlers = []

  function createEventHandler (mapFn, init) {
    const handler = createEventHandler_(mapFn, init)
    eventHandlers.push(handler)
    return handler
  }

  this.vNode = fn.call(null, {props, children, createEventHandler})
  this.eventHandlers = eventHandlers
}

YolkCompositeFunctionWrapper.create = (fn, props$, children$) => {
  const instance = new YolkCompositeFunctionWrapper(fn, props$, children$)

  if (!isComponent(instance.vNode)) {
    throw new Error(`Function did not return a valid component. See "${fn.name}".`)
  }

  return instance
}

YolkCompositeFunctionWrapper.destroy = (instance) => {
  const length = instance.eventHandlers.length
  let i = -1

  while (++i < length) {
    instance.eventHandlers[i].dispose()
  }

  instance.vNode.destroy()
}

export default YolkCompositeFunctionWrapper
