const kababCase = require(`lodash.kebabcase`)
const DOMProperties = require(`./DOMProperties`)
const transformStyle = require(`./transformStyle`)

const IS_DATA_MATCHER = /^data[A-Z]/

const EMPTY_PROP = {
  hasLowerCase: false,
  hasDashCase: false,
  isAttribute: false,
  isStandard: false
}

module.exports = function transformProperties (props) {
  const keys = Object.keys(props)
  const length = keys.length
  let i = -1

  let newProps = {
    attributes: {},
    className: props.className,
    id: props.id,
    style: transformStyle(props.style)
  }

  while (++i < length) {
    let key = keys[i]

    if (key === 'style' || key === 'className' || key === 'id') {
      continue
    }

    let isDataAttribute
    const value = props[key]
    const property = DOMProperties[key] || EMPTY_PROP

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
    } else if (property.isStandard) {
      newProps[key] = value
    }
  }

  return newProps
}
