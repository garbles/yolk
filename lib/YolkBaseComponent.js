const Rx = require(`rx`)
const create = require(`virtual-dom/create-element`)
const diff = require(`virtual-dom/diff`)
const h = require(`virtual-dom/h`)
const patch = require(`virtual-dom/patch`)
const flatten = require(`lodash.flattendeep`)
const wrapObject = require(`./wrapObject`)
const transformProperties = require(`./transformProperties`)

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

YolkBaseComponent.prototype.name = `YolkBaseComponent`
YolkBaseComponent.prototype.type = `Widget`

YolkBaseComponent.prototype.init = function YolkBaseComponentInit () {
  this._propSubject = new Rx.BehaviorSubject(this._props)
  this._childSubject = new Rx.BehaviorSubject(this._children)

  const vNode = h(this.id)
  const node = create(vNode)
  const propObservable = this._propSubject.flatMapLatest(wrapObject).map(transformProperties)
  const childObservable = this._childSubject.flatMapLatest(wrapObject)

  this._patchSubscription =
    Rx.Observable
    .combineLatest(propObservable, childObservable, (p, c) => h(this.id, p, flatten(c)))
    .scan(([old], next) => [next, diff(old, next)], [vNode])
    .subscribe(([__, patches]) => patch(node, patches))

  return node
}

YolkBaseComponent.prototype.update = function YolkBaseComponentUpdate (previous) {
  this._propSubject = previous._propSubject
  this._childSubject = previous._childSubject
  this._patchSubscription = previous._patchSubscription

  this._propSubject.onNext(this._props)
  this._childSubject.onNext(this._children)
}

YolkBaseComponent.prototype.destroy = function YolkBaseComponentDestroy () {
  this._patchSubscription.dispose()
}

module.exports = YolkBaseComponent
