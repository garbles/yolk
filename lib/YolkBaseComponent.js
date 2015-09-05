const Rx = require(`rx`)
const flatten = require(`flatten`)
const wrapObject = require(`wrapObject`)
const {h, diff, patch, create} = require(`virtual-dom`)

const CONSTRUCTOR_PROPS = [`type`, `name`, `id`, `key`, `_props`, `_children`]

module.exports =
class YolkBaseComponent {
  constructor (tag, props, children) {
    const _props = {...props}

    this.type = `Widget`
    this.name = tag

    if (_props.key) {
      this.key = _props.key
      this.id = _props.key
      delete _props.key
    }

    this._props = _props
    this._children = children
  }

  init () {
    this._propSubject = new Rx.BehaviorSubject(this._props)
    this._childSubject = new Rx.BehaviorSubject(this._children)

    const _vNode = h(this.name, null, [])
    const _node = create(_vNode)

    const propObservable = this._propSubject.flatMapLatest(wrapObject)
    const childObservable = this._childSubject.flatMapLatest(wrapObject)

    Rx.Observable.combineLatest(
      propObservable, childObservable,
      (props, children) => h(this.name, props, flatten(children))
    )
    .scan(
      ([old, node], next) => {
        return [next, node, diff(old, next)]
      },
      [_vNode, _node]
    )
    .subscribe(([_, node, patches]) => patch(node, patches))

    return _node
  }

  update (previous, node) {
    for (let key in previous) {
      if (!CONSTRUCTOR_PROPS.includes(key)) {
        this[key] = previous[key]
      }
    }

    this._propSubject.onNext(this._props)
    this._childSubject.onNext(this._children)

    return node
  }

  destroy (node) {
    this._propSubject.dispose()
    this._childSubject.dispose()
  }

}
