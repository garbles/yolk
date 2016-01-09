import {isDefined} from '../util/isDefined'
import {isNumber} from '../util/isNumber'

export function appendKeysToChildren (children: Array<VirtualNode | VirtualText>): Array<VirtualNode | VirtualText> {
  const len: number = children.length

  if (len === 0) {
    return children
  }

  let i: number = -1

  while (++i < len) {
    const child: VirtualNode | VirtualText = children[i]

    if (!isDefined(child.key) || isNumber(child.key)) {
      child.key = i
    }
  }

  return children
}
