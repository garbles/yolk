const Bacon = require(`baconjs`)
const hasOwnProperty = require(`hasOwnProperty`)
const {h, diff, patch, create} = require(`virtual-dom`)

const CONSTRUCTOR_PROPS = ['type', 'name', 'id', '_fn', '_props', '_children']

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
    this._propBus = new Bacon.Bus()
    this._childBus = new Bacon.Bus()
    this._propObservable = this._propBus.toProperty(this._props).flatMapLatest(props => Bacon.combineTemplate(props))
    this._childObservable = this._childBus.toProperty(this._children)

    this._component = this._fn(
      this._propObservable,
      this._childObservable
    )

    const _unsubscribes = [
      this._propBus.onValue(),
      this._childBus.onValue()
    ]

    this._destroyFn = () => {
      _unsubscribes.map(fn => fn())
      this._component.destroy()
    }

    return create(this._component)
  }

  update (previous, node) {
    if (!previous._initialized) {
      previous.init()
    }

    const _update = {
      props: this._props,
      children: this._children,
      node: node
    }

    // transfer properties
    for (let key in previous) {
      if (hasOwnProperty(previous, key) && !CONSTRUCTOR_PROPS.includes(key)) {
        this[key] = previous[key]
      }
    }

    this._propBus.push(this._props)
    this._childBus.push(this._children)
  }

  destroy () {
    this._destroyFn()
  }
}
