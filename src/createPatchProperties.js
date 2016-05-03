/* @flow */

import type {ElementProxy} from './ElementProxy'

function patchProperties (elementProxy: ElementProxy, props: Object, oldProps: Object): Object {
  for (const key in props) {
    if (props[key] !== oldProps[key]) {
      elementProxy.setAttribute(key, props[key])
    }
  }

  for (const key in oldProps) {
    if (!(key in props)) {
      elementProxy.removeAttribute(key)
    }
  }

  return props
}

export function createPatchProperties (elementProxy: ElementProxy): Function {
  let previous: Object = {}

  return (next: Object): void => {
    previous = patchProperties(elementProxy, next, previous)
  }
}
