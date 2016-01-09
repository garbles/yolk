/* @flow */

import {VirtualNode} from './VirtualNode'
import {VirtualText} from './VirtualText'
import {createElement} from './createElement'
import {isDefined} from '../util/isDefined'
import {isNumber} from '../util/isNumber'
import {updateChildrenKeys} from './updateChildrenKeys'

function keyIndex (children: Array<VirtualNode | VirtualText>): Object {
  const keys: Object = {}
  const len: number = children.length
  let i: number = -1

  while (++i < len) {
    const child: VirtualNode | VirtualText = children[i]
    keys[child.key] = i
  }

  return keys
}

export function patchChildren (node: Object, next: Array<VirtualNode | VirtualText>, previous?: Array<VirtualNode | VirtualText> = []): Array<VirtualNode | VirtualText> {
  const nextLen = next.length
  const previousLen = previous.length
  const nextKeys = keyIndex(next)
  const previousKeys = keyIndex(previous)
  let i = -1
  let j = -1

  const newChildren: Array<VirtualNode | VirtualText> = []
  const operations: Array<Function> = []

  while (++i < previousLen) {
    const child: VirtualNode | VirtualText = previous[i]
    const childKey: string = child.key

    if (!nextKeys.hasOwnProperty(childKey)) {
      const childNode = node.children[i]

      operations.push(() => {
        child.predestroy(node)
        node.removeChild(childNode)
        child.destroy()
      })
    }
  }

  while (++j < nextLen) {
    const child: VirtualNode | VirtualText = next[j]
    const childKey: string = child.key

    if (previousKeys.hasOwnProperty(childKey)) { // ASSUME ALL TAGS ARE THE SAME FOR NOW
      const previousIndex = previousKeys[childKey]
      const previousChild = previous[previousIndex]

      if (child.tagName === previousChild.tagName) {
        const childNode = node.children[previousIndex]

        operations.push(() => {
          const beforeNode = node.children[j]

          if (isDefined(beforeNode)) {
            if (beforeNode !== childNode) {
              node.insertBefore(childNode, beforeNode)
            }
          } else {
            node.appendChild(childNode)
          }

          previousChild.patch(child, childNode)
          newChildren.push(previousChild)
        })
      } else {
        const childNode = node.children[previousIndex]
        const newNode = createElement(child)

        operations.push(() => {
          const beforeNode = node.children[j]

          if (isDefined(beforeNode)) {
            node.insertBefore(newNode, beforeNode)
          } else {
            node.appendChild(newNode)
          }

          previousChild.predestroy(childNode)
          node.removeChild(childNode)
          previousChild.destroy(childNode)

          child.insert(newNode) // queue for insert
          newChildren.push(child)
        })
      }
    } else {
      const childNode = createElement(child)

      operations.push(() => {
        const beforeNode = node.children[j]

        if (isDefined(beforeNode)) {
          node.insertBefore(childNode, beforeNode)
        } else {
          node.appendChild(childNode)
        }

        child.insert(childNode) // queue for insert
        newChildren.push(child)
      })
    }
  }

  operations.forEach(fn => fn())

  return updateChildrenKeys(newChildren)
}
