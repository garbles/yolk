const isThunk = require(`virtual-dom/vnode/is-thunk`)
const isWidget = require(`virtual-dom/vnode/is-widget`)
const isVNode = require(`virtual-dom/vnode/is-vnode`)
const isVText = require(`virtual-dom/vnode/is-vtext`)

module.exports = function isComponent (obj) {
  return !!obj && (isWidget(obj) || isThunk(obj) || isVNode(obj) || isVText(obj))
}
