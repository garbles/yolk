const Rx = require(`rx`)
const wrapObject = require(`./wrapObject`)
const transformProperties = require(`./transformProperties`)
const isFunction = require(`./isFunction`)
const flatten = require(`./flatten`)
const mountable = require(`./mountable`)
const CompositePropSubject = require(`./CompositePropSubject`)
const YolkBaseInnerComponent = require(`./YolkBaseInnerComponent`)

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
    const childObservable = this._childSubject.flatMapLatest(c => wrapObject(c, {wrapToJS: true})).map(flatten)
    const innerComponent = new YolkBaseInnerComponent(this.id)
    const node = innerComponent.createNode()

    this._patchSubscription =
      Rx.Observable
        .combineLatest(propObservable, childObservable)
        .subscribe(([props, children]) => innerComponent.update(props, children))

    mountable.emitMount(node, this._props.onMount)

    return node
  },

  update (previous) {
    this._propSubject = previous._propSubject
    this._childSubject = previous._childSubject
    this._patchSubscription = previous._patchSubscription

    this._propSubject.onNext(this._props)
    this._childSubject.onNext(this._children)
  },

  predestroy (node) {
    mountable.emitUnmount(node, this._props.onUnmount)
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
