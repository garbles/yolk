const create = require(`virtual-dom/create-element`)
const diff = require(`virtual-dom/diff`)
const patch = require(`virtual-dom/patch`)

const PREVIOUS_WIDGET_KEY = `__YOLK_PREVIOUS_WIDGET_KEY`

function YolkRootComponent (child) {
  this._child = child
  this.key = child.key
}

YolkRootComponent.prototype = {
  name: `YolkRootComponent`,
  type: `Widget`,

  init () {
    return create(this._child)
  },

  update (previous, node) {
    if (this.key !== previous.key) {
      return create(this._child)
    }

    const patches = diff(previous._child, this._child)
    patch(node, patches)
  },
}

YolkRootComponent.render = function render (instance, node) {
  const root = new YolkRootComponent(instance)
  let child = node.children[0]

  if (child) {
    const patches = diff(child[PREVIOUS_WIDGET_KEY], root)
    patch(child, patches)
  } else {
    child = create(root)
    node.appendChild(child)
  }

  child[PREVIOUS_WIDGET_KEY] = root

  return root
}

module.exports = YolkRootComponent
