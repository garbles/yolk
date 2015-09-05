const Rx = require(`rx`)
const {h, diff, patch, create} = require(`virtual-dom`)
const flatten = require(`lodash.flattendeep`)
const wrapObject = require(`wrapObject`)
const actsAsPoolable = require(`actsAsPoolable`)

module.exports =
@actsAsPoolable(20)
class YolkBaseComponent {
  constructor (tag, props, children) {
    this.type = `Widget`
    this.name = tag

    if (props.key) {
      props = {...props}
      this.key = props.key
      this.id = props.key
      delete props.key
    }

    this._props = props
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

  update (previous) {
    this._propSubject = previous._propSubject
    this._childSubject = previous._childSubject

    this._propSubject.onNext(this._props)
    this._childSubject.onNext(this._children)
  }

  destroy () {
    this._propSubject.dispose()
    this._childSubject.dispose()
    this._patchSubscription.dispose()
    this._propSubject = null
    this._childSubject = null
    this._patchSubscription = null
    this._props = null
    this._children = null
    this.key = null
    this.id = null
    this.name = null
    YolkBaseComponent.releaseInstance(this)
  }

}
