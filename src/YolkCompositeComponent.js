const Rx = require(`rx`)
const create = require(`yolk-virtual-dom/create-element`)
const YolkCompositeFunctionWrapper = require(`./YolkCompositeFunctionWrapper`)
const CompositePropSubject = require(`./CompositePropSubject`)

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
    this._propSubject = new CompositePropSubject(this._props)
    this._childSubject = new Rx.BehaviorSubject(this._children)

    const propObservable = this._propSubject.asObservableObject()
    const childObservable = this._childSubject.asObservable()

    const fn = this._fn
    this._component = YolkCompositeFunctionWrapper.create(fn, propObservable, childObservable)

    return create(this._component.getVirtualNode())
  },

  update (previous) {
    this._propSubject = previous._propSubject
    this._childSubject = previous._childSubject
    this._component = previous._component

    this._propSubject.onNext(this._props)
    this._childSubject.onNext(this._children)
  },

  destroy () {
    this._component.destroy()

    const children = this._children
    const length = children.length
    let i = -1

    while (++i < length) {
      const child = children[i]
      isFunction(child.destroy) && child.destroy()
    }
  },
}

module.exports = YolkCompositeComponent
