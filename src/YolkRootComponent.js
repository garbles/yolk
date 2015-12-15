import { default as create } from 'yolk-virtual-dom/create-element'
import { default as diff } from 'yolk-virtual-dom/diff'
import { default as patch } from 'yolk-virtual-dom/patch'
import { default as initializeWidgets } from 'yolk-virtual-dom/initialize-widgets'
import { default as delegator } from './delegator'

const PREVIOUS_WIDGET_KEY = `__YOLK_PREVIOUS_WIDGET_KEY__`

function YolkRootComponent (child) {
  this._child = child
}

YolkRootComponent.prototype = {
  name: `YolkRootComponent`,
  type: `Widget`,

  init () {
    return this._child
  },

  update (previous, node) {
    if (this._child.key !== previous._child.key) {
      return this.init()
    }

    const patches = diff(previous._child, this._child)
    patch(node, patches)
  },
}

export function render (instance, node) {
  const root = new YolkRootComponent(instance)
  let child = node.children[0]

  if (child) {
    const patches = diff(child[PREVIOUS_WIDGET_KEY], root)
    patch(child, patches)
  } else {
    child = create(root)
    node.appendChild(child)
    delegator(node)
    initializeWidgets(child)
  }

  child[PREVIOUS_WIDGET_KEY] = root

  return root
}

export default YolkRootComponent
