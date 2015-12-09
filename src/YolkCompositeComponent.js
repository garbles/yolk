import { default as Rx } from 'rx'
import { default as YolkCompositeFunctionWrapper } from './YolkCompositeFunctionWrapper'
import { default as CompositePropSubject } from './CompositePropSubject'

function YolkCompositeComponent (fn, props, children) {
  const _props = {...props}
  const _children = children || []

  if (_props.key) {
    this.key = _props.key.toString()
    delete _props.key
  }

  this.name = `YolkCompositeComponent_${fn.name}`
  this.id = fn.name
  this._fn = fn
  this._props = _props
  this._children = _children
  this._component = null
}

YolkCompositeComponent.prototype = {
  type: `Widget`,

  init () {
    this._props$ = new CompositePropSubject(this._props)
    this._children$ = new Rx.BehaviorSubject(this._children)

    const props$ = this._props$.asObservableObject()
    const children$ = this._children$.asObservable()

    const fn = this._fn
    this._component = YolkCompositeFunctionWrapper.create(fn, props$, children$)

    return this._component.vNode
  },

  update (previous) {
    this._props$ = previous._props$
    this._children$ = previous._children$
    this._component = previous._component

    this._props$.onNext(this._props)
    this._children$.onNext(this._children)
  },

  destroy () {
    YolkCompositeFunctionWrapper.destroy(this._component)

    const children = this._children
    const length = children.length
    let i = -1

    while (++i < length) {
      const child = children[i]
      isFunction(child.destroy) && child.destroy()
    }
  },
}

YolkCompositeComponent.create = function createInstance (fn, props, children) {
  return new YolkCompositeComponent(fn, props, children)
}

export default YolkCompositeComponent
