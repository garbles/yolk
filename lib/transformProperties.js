const kababCase = require(`lodash.kebabcase`)
const DOMProperties = require(`./DOMProperties`)
const transformStyle = require(`./transformStyle`)
const transformClassName = require(`./transformClassName`)
const softSetHook = require(`virtual-dom/virtual-hyperscript/hooks/soft-set-hook`)
const attributeHook = require(`virtual-dom/virtual-hyperscript/hooks/attribute-hook`)

const IS_DATA_MATCHER = /^data[A-Z]/

const EMPTY_PROP = {
  hasLowerCase: false,
  hasDashCase: false,
  isAttribute: false,
  isStandard: false,
  usePropertyHook: false,
  useAttributeHook: false,
}

module.exports = function transformProperties (props) {
  const keys = Object.keys(props)
  const length = keys.length
  const newProps = {attributes: {}}
  let i = -1

  while (++i < length) {
    let key = keys[i]

    if (key === `style` || key === `className` || key === `id`) {
      continue
    }

    const value = props[key]
    const property = DOMProperties[key] || EMPTY_PROP
    let isDataAttribute = false

    if (property.isStandard) {
      key = property.computed
    } else {
      isDataAttribute = IS_DATA_MATCHER.test(key)

      if (isDataAttribute) {
        key = kababCase(key)
      }
    }

    if (property.isAttribute || isDataAttribute) {
      newProps.attributes[key] = value
    } else if (property.usePropertyHook) {
      newProps[key] = softSetHook(value)
    } else if (property.useAttributeHook) {
      newProps[key] = attributeHook(value)
    } else if (property.isStandard) {
      newProps[key] = value
    }
  }

  props.className && (newProps.className = transformClassName(props.className))
  props.id && (newProps.id = props.id)
  props.style && (newProps.style = transformStyle(props.style))

  return newProps
}
