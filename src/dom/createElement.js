/* @flow */

export function createElement (vnode: VirtualElement): HTMLElement {
  const node: HTMLElement = vnode.init()
  vnode.create(node)
  return node
}
