const Rx = require(`rx`)
const create = require(`virtual-dom/create-element`)
const diff = require(`virtual-dom/diff`)
const h = require(`virtual-dom/h`)
const patch = require(`virtual-dom/patch`)
const flatten = require(`lodash.flattendeep`)
const wrapObject = require(`./wrapObject`)
const transformProperties = require(`./transformProperties`)

module.exports =
class YolkBaseComponent {
  constructor (tag, props, children) {
    this.name = `YolkBaseComponent`
    this.type = `Widget`
    this.id = tag

    if (props.key) {
      props = {...props}
      this.key = props.key
      delete props.key
    }

    this._props = props
    this._children = children
  }

  init () {
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
      .subscribe(([_, patches]) => patch(node, patches))

    return node
  }

  update (previous) {
    this._propSubject = previous._propSubject
    this._childSubject = previous._childSubject
    this._patchSubscription = previous._patchSubscription

    this._propSubject.onNext(this._props)
    this._childSubject.onNext(this._children)
  }

  destroy () {
    this._patchSubscription.dispose()
  }

}
