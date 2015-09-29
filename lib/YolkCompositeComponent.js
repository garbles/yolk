const Rx = require(`./Rx`)
const create = require(`virtual-dom/create-element`)
const wrapObject = require(`./wrapObject`)
const isComponent = require(`./isComponent`)
const YolkCompositeFunctionWrapper = require(`./YolkCompositeFunctionWrapper`)
const createCustomError = require(`./createCustomError`)

const NoComponentError = createCustomError(`NoComponentError`)

function YolkCompositeComponent (fn, props, children) {
  const _props = {...props}
  const _children = children || []

  if (_props.key) {
    this.key = _props.key.toString()
    delete _props.key
  }

  this.id = fn.name
  this._fn = fn
  this._props = _props
  this._children = _children
  this._component = null
}

YolkCompositeComponent.prototype = {
  name: `YolkCompositeComponent`,
  type: `Widget`,

  init () {
    const keys = Object.keys(this._props)
    const length = keys.length
    const propsSubject = {}
    let i = -1

    this._propSubject = {}

    while (++i < length) {
      const key = keys[i]
      const value = this._props[key]
      this._propSubject[key] = new Rx.BehaviorSubject(value)
      propsSubject[key] = this._propSubject[key].flatMapLatest(wrapObject)
    }

    this._childSubject = new Rx.BehaviorSubject(this._children)

    const propObservable = propsSubject
    const childObservable = this._childSubject.asObservable()

    this._component = new YolkCompositeFunctionWrapper(this._fn, propObservable, childObservable)

    if (!isComponent(this._component._result)) {
      throw new NoComponentError(`Function did not return a valid component. See "${this._fn.name}".`)
    }

    const node = create(this._component._result)
    return node
  },

  update (previous) {
    this._propSubject = previous._propSubject
    this._childSubject = previous._childSubject
    this._component = previous._component
    this._eventHandlers = previous._eventHandlers
    this._childSubject.onNext(this._children)

    const keys = Object.keys(this._props)
    const length = keys.length
    let i = -1

    while (++i < length) {
      const key = keys[i]
      const value = this._props[key]
      this._propSubject[key].onNext(value || null)
    }
  },

  destroy () {
    this._component.destroy()
  },
}

module.exports = YolkCompositeComponent
