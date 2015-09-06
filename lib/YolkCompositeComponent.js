const Rx = require(`rx`)
const {h, diff, patch, create} = require(`virtual-dom`)
const wrapObject = require(`wrapObject`)

module.exports =
class YolkCompositeComponent {
  constructor (fn, props, children) {
    this.type = `Widget`
    this.name = fn.name

    if (props.key) {
      props = {...props}
      this.key = props.key
      this.id = props.key
      delete props.key
    }

    this._fn = fn
    this._props = props
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
    this._component = previous._component

    this._propSubject.onNext(this._props)
    this._childSubject.onNext(this._children)
  }

  destroy () {
    this._component.destroy()
  }
}
