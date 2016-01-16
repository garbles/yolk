/* @flow */

export function createNode (vnode: VirtualElement): HTMLElement {
  const node: HTMLElement = vnode.init()
  vnode.create(node)
  return node
}
