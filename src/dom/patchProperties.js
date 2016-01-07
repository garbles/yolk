/* @flow */

import descriptors from 'html-props'

export function patchProperties (node: Object, props: Object, oldProps?: Object = {}): void {
  for (const key in props) {
    if (props[key] !== oldProps[key]) {
      const next = props[key]
      const descriptor = descriptors[key]

      if (!descriptor) {
        node[key] = next
        continue
      }

      const {computed} = descriptor

      if (descriptor.setWithEquals) {
        node[computed] = next
        continue
      }

      if (descriptor.hasBooleanValue && !next) {
        node.removeAttribute(computed)
        continue
      }

      node.setAttribute(computed, next)
    }
  }

  for (const key in oldProps) {
    if (!(key in props)) {
      const descriptor = descriptors[key]

      if (!descriptor) {
        node[key] = undefined
        continue
      }

      const {computed} = descriptor

      if (descriptor.setWithFunction) {
        node.removeAttribute(computed)
        continue
      }

      if (descriptor.hasBooleanValue) {
        node[computed] = false
        continue
      }

      node[computed] = undefined
    }
  }
}
