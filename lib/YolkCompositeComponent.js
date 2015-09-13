const Rx = require(`rx`)
const create = require(`virtual-dom/create-element`)
const wrapObject = require(`./wrapObject`)

module.exports =
class YolkCompositeComponent {
  constructor (fn, props, children) {
    this.name = `YolkCompositeComponent`
    this.type = `Widget`
    this.id = fn.name

    if (props.key) {
      props = {...props}
      this.key = props.key
      delete props.key
    }

    this._fn = fn
    this._props = props
    this._children = children
  }

  init () {
    this._propSubject = new Rx.BehaviorSubject(this._props)
    this._childSubject = new Rx.BehaviorSubject(this._children)

    const propObservable = this._propSubject.flatMapLatest(wrapObject)
    const childObservable = this._childSubject.asObservable()

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
