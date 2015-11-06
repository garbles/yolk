const Rx = require(`rx`)
const create = require(`yolk-virtual-dom/create-element`)
const diff = require(`yolk-virtual-dom/diff`)
const h = require(`yolk-virtual-dom/h`)
const patch = require(`yolk-virtual-dom/patch`)
const wrapObject = require(`./wrapObject`)
const transformProperties = require(`./transformProperties`)
const isFunction = require(`./isFunction`)
const flatten = require(`./flatten`)
const mountable = require(`./mountable`)
const CompositePropSubject = require(`./CompositePropSubject`)

function YolkBaseComponent (tag, props, children) {
  const _props = {...props}
  const _children = children || []

  if (_props.key) {
    this.key = _props.key.toString()
    delete _props.key
  }

  this.name = `YolkBaseComponent_${tag}`
  this.id = tag
  this._props = _props
  this._children = _children
}

YolkBaseComponent.prototype = {
  type: `Widget`,

  init () {
    this._propSubject = new CompositePropSubject(this._props)
    this._childSubject = new Rx.BehaviorSubject(this._children)

    const propObservable = wrapObject(this._propSubject.asSubjectObject(), {wrapToJS: true}).map(transformProperties)
    const childObservable = this._childSubject.flatMapLatest(c => wrapObject(c, {wrapToJS: true}))
    const id = this.id
    const vNode = h(id)
    const node = create(vNode)

    this._patchSubscription =
      Rx.Observable
      .combineLatest(propObservable, childObservable, (p, c) => h(id, p, flatten(c)))
      .scan(([old], next) => [next, diff(old, next)], [vNode, null])
      .subscribe(
        ([__, patches]) => patch(node, patches),
        (err) => {throw err}
      )

    mountable.emitMount(node, this._props.onMount)

    this._node = node
    return this._node
  },

  update (previous) {
    this._node = previous._node
    this._propSubject = previous._propSubject
    this._childSubject = previous._childSubject
    this._patchSubscription = previous._patchSubscription

    this._propSubject.onNext(this._props)
    this._childSubject.onNext(this._children)
  },

  predestroy () {
    mountable.emitUnmount(this._node, this._props.onUnmount)
  },

  destroy () {
    this._patchSubscription.dispose()

    const children = this._children
    const length = children.length
    let i = -1

    while (++i < length) {
      const child = children[i]
      isFunction(child.destroy) && child.destroy()
    }
  },
}

module.exports = YolkBaseComponent
