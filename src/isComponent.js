import { default as isWidget } from 'yolk-virtual-dom/vnode/is-widget'
import { default as isVNode } from 'yolk-virtual-dom/vnode/is-vnode'
import { default as isVText } from 'yolk-virtual-dom/vnode/is-vtext'

export default function isComponent (obj) {
  return !!obj && (isWidget(obj) || isVNode(obj) || isVText(obj))
}
