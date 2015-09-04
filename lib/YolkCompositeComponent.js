const Rx = require(`rx`)
const wrapObject = require(`wrapObject`)
const {h, diff, patch, create} = require(`virtual-dom`)

const CONSTRUCTOR_PROPS = [`type`, `name`, `id`, `key`, `_fn`, `_props`, `_children`]

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

    this._initialized = false
    this._fn = fn
    this._props = _props
    this._children = children
  }

  init () {
    this._initialized = true
    this._propSubject = new Rx.BehaviorSubject(this._props)
    this._childSubject = new Rx.BehaviorSubject(this._children)

    const childObservable = this._childSubject.asObservable()

    const propObservable =
      this._propSubject.flatMapLatest(props => {
        const keys = Object.keys(props)
        let values = []

        for (var i = 0; i < keys.length; i++) {
          let key = keys[i]
          let value = props[key]
          values[i] = wrapObject(value)
        }

        return Rx.Observable.combineLatest(values, (...args) => {
          let props = {}

          for (var i = 0; i < args.length; i++) {
            let key = keys[i]
            let value = args[i]
            props[key] = value
          }

          return props
        })
      })

    this._component = this._fn(propObservable, childObservable)

    return create(this._component)
  }

  update (previous, node) {
    if (!previous._initialized) {
      previous.init()
    }

    for (let key in previous) {
      if (!CONSTRUCTOR_PROPS.includes(key)) {
        this[key] = previous[key]
      }
    }

    this._propSubject.onNext(this._props)
    this._childSubject.onNext(this._children)

    return node
  }

  destroy () {
    this._propSubject.dispose()
    this._childSubject.dispose()
    this._component.destroy()
  }
}
