const Rx = require(`rx`)
const flatten = require(`lodash.flattendeep`)
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

    const vNode = h(this.name, null, [])
    const node = create(vNode)

    const propObservable = wrapObject(this._propSubject)
    const childObservable = wrapObject(this._childSubject)

    this._patchSubscription =
      Rx.Observable
      .combineLatest(propObservable, childObservable, (p, c) => h(this.name, p, flatten(c)))
      .scan(([old], next) => [next, diff(old, next)], [vNode])
      .subscribe(([_, patches]) => patch(node, patches))

    return node
  }

  update (previous, node) {
    this._propSubject = previous._propSubject
    this._childSubject = previous._childSubject

    this._propSubject.onNext(this._props)
    this._childSubject.onNext(this._children)

    return node
  }

  destroy (node) {
    this._propSubject.dispose()
    this._childSubject.dispose()
    this._patchSubscription.dispose()
  }

}
