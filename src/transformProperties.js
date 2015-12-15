import { default as DOMAttributeDescriptors } from './DOMAttributeDescriptors'
import { default as transformStyle } from './transformStyle'
import { default as transformProperty } from './transformProperty'

export default function transformProperties (props) {
  const keys = Object.keys(props)
  const length = keys.length
  const newProps = {attributes: {}}
  let i = -1

  while (++i < length) {
    const key = keys[i]
    const value = props[key]

    if (key === `style`) {
      transformStyle(newProps, value)
    } else {
      transformProperty(newProps, key, value, DOMAttributeDescriptors[key])
    }
  }

  return newProps
}
