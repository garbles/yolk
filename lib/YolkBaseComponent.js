const Rx = require(`./Rx`)
const create = require(`virtual-dom/create-element`)
const diff = require(`virtual-dom/diff`)
const h = require(`virtual-dom/h`)
const patch = require(`virtual-dom/patch`)
const flatten = require(`lodash.flattendeep`)
const wrapObject = require(`./wrapObject`)
const transformProperties = require(`./transformProperties`)
const isFunction = require(`./isFunction`)
const CustomEvent = require(`./CustomEvent`)

function YolkBaseComponent (tag, props, children) {
  const _props = {...props}

  if (_props.key) {
    this.key = _props.key
    delete _props.key
  }

  this.id = tag
  this._props = _props
  this._children = children
}

YolkBaseComponent.prototype = {
  name: `YolkBaseComponent`,
  type: `Widget`,

  init () {
    this._propSubject = new Rx.BehaviorSubject(this._props)
    this._childSubject = new Rx.BehaviorSubject(this._children)

    const vNode = h(this.id)
    const propObservable = this._propSubject.flatMapLatest(wrapObject).map(transformProperties)
    const childObservable = this._childSubject.flatMapLatest(wrapObject)

    this.node = create(vNode)

    this._patchSubscription =
      Rx.Observable
      .combineLatest(propObservable, childObservable, (p, c) => h(this.id, p, flatten(c)))
      .scan(([old], next) => [next, diff(old, next)], [vNode, null])
      .subscribe(([__, patches]) => patch(this.node, patches))

    isFunction(this._props.onMount) && this.onMount()

    return this.node
  },

  update (previous) {
    this._propSubject = previous._propSubject
    this._childSubject = previous._childSubject
    this._patchSubscription = previous._patchSubscription

    this._propSubject.onNext(this._props)
    this._childSubject.onNext(this._children)
  },

  destroy () {
    this.onUnmount()
    this._patchSubscription.dispose()

    const children = this._children
    const length = children.length
    let i = -1

    while (++i < length) {
      const child = children[i]
      isFunction(child.destroy) && child.destroy()
    }
  },

  onUnmount () {
    const {onMount, onUnmount} = this._props

    if (isFunction(onUnmount)) {
      const event = new CustomEvent(`unmount`)
      this.node.dispatchEvent(event)
      this.node.removeEventListener(`umount`, onUnmount)
    }

    if (isFunction(onMount)) {
      this.node.removeEventListener(`mount`, onMount)
    }
  },

  onMount () {
    if (this.node.parentNode) {
      const event = new CustomEvent(`mount`)
      this.node.dispatchEvent(event)
    } else {
      process.nextTick(() => this.onMount())
    }
  },
}

module.exports = YolkBaseComponent
