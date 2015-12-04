const wrapObject = require(`./wrapObject`)
const addProperties = require(`./addProperties`)
const YolkBaseComponent = require(`./YolkBaseComponent`)
const CompositePropSubject = require(`./CompositePropSubject`)

function YolkCustomComponent () {}

YolkCustomComponent.prototype = {
  type: `Widget`,
  onMount () {},
  onUpdate () {},
  onUnmount () {},

  _initialize (props, children) {
    this._props = props
    this._props$ = null

    switch (children.length) {
    case 1:
      this._child = children[0]
      break
    case 0:
      this._child = new YolkBaseComponent(`div`)
      break
    default:
      throw new Error(`${this.constructor.name} may not have more than one child`)
    }
  },

  init () {
    this._props$ = new CompositePropSubject(this._props)

    return this._child
  },

  postinit (node) {
    const props$ = wrapObject(this._props$.asSubjectObject())
    const mountDisposable = props$.take(1).subscribe(props => this.onMount(props, node))
    const updateDisposable = props$.skip(1).subscribe(props => this.onUpdate(props, node))

    this._onDestroy = () => {
      mountDisposable.dispose()
      updateDisposable.dispose()
    }
  },

  update (previous) {
    this._onDestroy = previous._onDestroy
    this._props$ = previous._props$
    this._props$.onNext(this._props)
  },

  predestroy (node) {
    this.onUnmount(node)
  },

  destroy () {
    this._onDestroy && this._onDestroy()
  },
}

YolkCustomComponent._isCustomComponent = true

YolkCustomComponent.create = function createInstance (props, children) {
  const instance = new this(props, children)
  instance._initialize(props, children)

  return instance
}

YolkCustomComponent.extend = function extend (obj) {
  function Component () {}
  addProperties(Component, YolkCustomComponent)
  Component.prototype = Object.create(YolkCustomComponent.prototype)
  addProperties(Component.prototype, obj)

  return Component
}

module.exports = YolkCustomComponent
