const h = require(`yolk-virtual-dom/h`)
const diff = require(`yolk-virtual-dom/diff`)
const patch = require(`yolk-virtual-dom/patch`)
const generateUid = require(`./generateUid`)

function YolkBaseInnerComponent (tag) {
  this._tag = tag
  this._props = {}
  this._children = []
  this._uid = generateUid()
  this._vNode = null
  this._node = null
}

YolkBaseInnerComponent.prototype = {
  createVirtualNode () {
    this._vNode = h(this._tag, this._props, this._children)
    return this._vNode
  },

  setNode (node) {
    this._node = node
    this.update(this._props, this._children)
  },

  update (props, children) {
    this._props = props
    this._children = children

    if (this._node) {
      const vNode = h(this._tag, props, children)
      const patches = diff(this._vNode, vNode)

      this._vNode = vNode
      patch(this._node, patches)
    }
  },
}

module.exports = YolkBaseInnerComponent
