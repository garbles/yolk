const Bacon = require(`baconjs`)
const hasOwnProperty = require(`hasOwnProperty`)
const flatten = require(`flatten`)
const {h, diff, patch, create} = require(`virtual-dom`)

const CONSTRUCTOR_PROPS = ['type', 'name', 'id', '_props', '_children']

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

    this._initialized = false
    this._props = _props
    this._children = children
  }

  init () {
    this._initialized = true
    this._vNode = h(this.name, null, [])
    this._updateBus = new Bacon.Bus()

    const _node = create(this._vNode)

    const _initial = {
      props: this._props,
      children: this._children,
      node: _node
    }

    this._destroyFn =
      this._updateBus
      .scan(_initial, (acc, next) => ({...acc, ...next}))
      .flatMapLatest(update => {
        const {props, children, node} = update

        return Bacon.combineTemplate({
          props: Bacon.combineTemplate(props),
          children: Bacon.combineAsArray(children),
          node: Bacon.once(node)
        })
      })
      .onValue(template => {
        const {props, children, node} = template
        const vNode = h(this.name, props, flatten(children))
        const patches = diff(this._vNode, vNode)

        this._vNode = vNode
        patch(node, patches)
      })

    return _node
  }

  update (previous, node) {
    if (!previous._initialized) {
      previous.init()
    }

    const _update = {
      props: this._props,
      children: this._children,
      node: node
    }

    // transfer properties
    for (let key in previous) {
      if (hasOwnProperty(previous, key) && !CONSTRUCTOR_PROPS.includes(key)) {
        this[key] = previous[key]
      }
    }

    this._updateBus.push(_update)

    return node
  }

  destroy (node) {
    this._destroyFn()
  }

}
