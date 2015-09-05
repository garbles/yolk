const Rx = require(`rx`)
const wrapObject = require(`wrapObject`)
const {h, diff, patch, create} = require(`virtual-dom`)

module.exports =
class YolkCompositeComponent {
  constructor (fn, props, children) {
    const _props = {...props}

    this.type = `Widget`
    this.name = fn.name

    if (_props.key) {
      this.key = _props.key
      this.id = _props.key
      delete _props.key
    }

    this._fn = fn
    this._props = _props
    this._children = children
  }

  init () {
    this._propSubject = new Rx.BehaviorSubject(this._props)
    this._childSubject = new Rx.BehaviorSubject(this._children)

    const propObservable = wrapObject(this._propSubject)
    const childObservable = wrapObject(this._childSubject)

    this._component = this._fn(propObservable, childObservable)

    return create(this._component)
  }

  update (previous) {
    this._propSubject = previous._propSubject
    this._childSubject = previous._childSubject

    this._propSubject.onNext(this._props)
    this._childSubject.onNext(this._children)
  }

  destroy () {
    this._propSubject.dispose()
    this._childSubject.dispose()
    this._component.destroy()
  }
}
