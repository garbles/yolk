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
    this._props$ = new CompositePropSubject(this._props)
    this._children$ = new Rx.BehaviorSubject(this._children)

    const props$ = wrapObject(this._props$.asSubjectObject(), {wrapToJS: true}).map(transformProperties)
    const children$ = this._children$.flatMapLatest(c => wrapObject(c, {wrapToJS: true})).map(flatten)
    const innerComponent = new YolkBaseInnerComponent(this.id)
    const node = innerComponent.createNode()

    this._disposable =
      props$.combineLatest(children$)
      .subscribe(
        ([props, children]) => innerComponent.update(props, children),
        (err) => {throw err}
      )

    mountable.emitMount(node, this._props.onMount)

    return node
  },

  update (previous) {
    this._props$ = previous._props$
    this._children$ = previous._children$
    this._disposable = previous._disposable

    this._props$.onNext(this._props)
    this._children$.onNext(this._children)
  },

  predestroy (node) {
    mountable.emitUnmount(node, this._props.onUnmount)
  },

  destroy () {
    this._disposable.dispose()

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
