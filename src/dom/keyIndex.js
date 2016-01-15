/* @flow */

export function keyIndex (children: Array<VirtualNode>): Array<Object> {
  const len: number = children.length
  const arr: Array<Object> = []
  let i: number = -1

  while (++i < len) {
    const child: VirtualNode = children[i]

    if (!child) {
      continue
    }

    arr.push({
      key: child.key || child.tagName,
      vnode: child,
      index: i,
    })
  }

  return arr
}