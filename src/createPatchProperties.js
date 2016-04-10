/* @flow */

import type {NodeProxy} from './NodeProxy'

function patchProperties (nodeProxy: NodeProxy, props: Object, oldProps: Object): Object {
  for (const key in props) {
    if (props[key] !== oldProps[key]) {
      nodeProxy.setAttribute(key, props[key])
    }
  }

  for (const key in oldProps) {
    if (!(key in props)) {
      nodeProxy.removeAttribute(key)
    }
  }

  return props
}

export function createPatchProperties (nodeProxy: NodeProxy): Function {
  let previous: Object = {}

  return (next: Object): void => {
    previous = patchProperties(nodeProxy, next, previous)
  }
}
