const isWidget = require(`yolk-virtual-dom/vnode/is-widget`)
const isVNode = require(`yolk-virtual-dom/vnode/is-vnode`)
const isVText = require(`yolk-virtual-dom/vnode/is-vtext`)

module.exports = function isComponent (obj) {
  return !!obj && (isWidget(obj) || isVNode(obj) || isVText(obj))
}
