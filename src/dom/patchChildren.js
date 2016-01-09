/* @flow */

import {VirtualNode} from './VirtualNode'
import {VirtualText} from './VirtualText'
import {createElement} from './createElement'
import {isDefined} from '../util/isDefined'

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

export function patchChildren (node: Object, next: Array<VirtualNode | VirtualText>, previous?: Array<VirtualNode | VirtualText> = []): void {
  const nextLen = next.length
  const previousLen = previous.length
  const nextKeys = keyIndex(next)
  const previousKeys = keyIndex(previous)
  const len = Math.max(nextLen, previousLen)
  let i = -1

  const operations = []

  while (++i < len) {
    const left: VirtualNode | VirtualText = previous[i]
    const right: VirtualNode | VirtualText = next[i]

    if (!isDefined(left) && isDefined(right)) {
      const child: HTMLElement | Text = createElement(right)

      operations.push(() => {
        node.appendChild(child)
        right.insert(child) // change to queue for insertion!
      })
      continue
    }

    if (isDefined(left) && !isDefined(right)) {
      const child: HTMLElement | Text = node.children[i]

      operations.push(() => {
        left.predestroy(child)
        node.removeChild(child)
        left.destroy()
      })
      continue
    }

    const leftIndex = previousKeys[left.key]
    const rightIndex = nextKeys[left.key]

    // this only works if none of the children have keys
    if (left.tagName === right.tagName) {
      const child: HTMLElement | Text = node.children[i]

      operations.push(() => {
        left.patch(right, child)
      })
      continue
    }

    // this only works if none of the children have keys
    if (left.tagName !== right.tagName) {
      const newChild: HTMLElement | Text = createElement(right)
      const child: HTMLElement | Text = node.children[i]

      operations.push(() => {
        left.predestroy(child)
        node.replaceChild(newChild, child)
        left.destroy()
        right.insert(newChild) // change to queue for insertion!
      })
      continue
    }
  }

  operations.forEach(fn => fn())
}
