const Rx = require(`rx`)
const create = require(`virtual-dom/create-element`)
const wrapObject = require(`./wrapObject`)

module.exports =
class YolkCompositeComponent {
  constructor (fn, props, children) {
    const _props = {...props}

    this.name = `YolkCompositeComponent`
    this.type = `Widget`
    this.id = fn.name

    if (_props.key) {
      this.key = _props.key
      delete _props.key
    }

    this._fn = fn
    this._props = _props
    this._children = children
  }

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

    this._component = this._fn(propObservable, childObservable)

    return create(this._component)
  }

  update (previous) {
    this._propSubject = previous._propSubject
    this._childSubject = previous._childSubject
    this._component = previous._component
    this._childSubject.onNext(this._children)

    const keys = Object.keys(this._props)
    const length = keys.length
    let i = -1

    while (++i < length) {
      const key = keys[i]
      const value = this._props[key]
      this._propSubject[key].onNext(value)
    }
  }

  destroy () {
    this._component.destroy()
  }
}
