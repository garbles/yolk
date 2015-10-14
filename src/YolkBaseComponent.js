const Rx = require(`rx`)
const create = require(`virtual-dom/create-element`)
const diff = require(`virtual-dom/diff`)
const h = require(`virtual-dom/h`)
const patch = require(`virtual-dom/patch`)
const wrapObject = require(`./wrapObject`)
const transformProperties = require(`./transformProperties`)
const isFunction = require(`./isFunction`)
const CustomEvent = require(`./CustomEvent`)
const flatten = require(`./flatten`)

function YolkBaseComponent (tag, props, children) {
  const _props = {...props}
  const _children = children || []

  if (_props.key) {
    this.key = _props.key.toString()
    delete _props.key
  }

  this.id = tag
  this._props = _props
  this._children = _children
}

YolkBaseComponent.prototype = {
  name: `YolkBaseComponent`,
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

    const propObservable = wrapObject(propsSubject, {wrapToJS: true}).map(transformProperties)
    const childObservable = this._childSubject.flatMapLatest(c => wrapObject(c, {wrapToJS: true}))

    const vNode = h(this.id)
    this.node = create(vNode)

    this._patchSubscription =
      Rx.Observable
      .combineLatest(propObservable, childObservable, (p, c) => h(this.id, p, flatten(c)))
      .scan(([old], next) => [next, diff(old, next)], [vNode, null])
      .subscribe(
        ([__, patches]) => patch(this.node, patches),
        (err) => {throw new Error(err.message)}
      )

    this.emitMount()

    return this.node
  },

  update (previous) {
    this._propSubject = previous._propSubject
    this._childSubject = previous._childSubject
    this._patchSubscription = previous._patchSubscription
    this._childSubject.onNext(this._children)

    const keys = Object.keys(previous._props)
    const length = keys.length
    let i = -1

    while (++i < length) {
      const key = keys[i]
      const value = this._props[key]
      this._propSubject[key].onNext(value || null)
    }
  },

  destroy () {
    this.emitUnmount()
    this._patchSubscription.dispose()

    const children = this._children
    const length = children.length
    let i = -1

    while (++i < length) {
      const child = children[i]
      isFunction(child.destroy) && child.destroy()
    }
  },

  emitUnmount () {
    const {onMount, onUnmount} = this._props
    const event = new CustomEvent(`unmount`)
    this.node.dispatchEvent(event)

    if (isFunction(onUnmount)) {
      this.node.removeEventListener(`unmount`, onUnmount)
    }

    if (isFunction(onMount)) {
      this.node.removeEventListener(`mount`, onMount)
    }
  },

  emitMount () {
    if (this.node.parentNode) {
      const event = new CustomEvent(`mount`)
      this.node.dispatchEvent(event)
    } else {
      setTimeout(() => this.emitMount(), 0)
    }
  },
}

module.exports = YolkBaseComponent
