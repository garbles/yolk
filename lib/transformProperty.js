const kababCase = require(`lodash.kebabcase`)
const softSetHook = require(`virtual-dom/virtual-hyperscript/hooks/soft-set-hook`)
const attributeHook = require(`virtual-dom/virtual-hyperscript/hooks/attribute-hook`)
const compact = require(`./compact`)

const IS_DATA_MATCHER = /^data[A-Z]/

const EMPTY_PROP = {
  hasLowerCase: false,
  hasDashCase: false,
  isAttribute: false,
  isStandard: false,
  usePropertyHook: false,
  useAttributeHook: false,
  canBeArrayOfStrings: false,
}

module.exports = function transformProperty (props, key, value, property) {
  const _property = property || EMPTY_PROP
  let isDataAttribute = false
  let _value = value
  let _key

  if (_property.isStandard) {
    _key = _property.computed
  } else {
    isDataAttribute = IS_DATA_MATCHER.test(key)

    if (isDataAttribute) {
      _key = kababCase(key)
    }
  }

  if (_property.canBeArrayOfStrings && Array.isArray(value)) {
    _value = compact(value).join(` `)
  }

  if (_property.isAttribute || isDataAttribute) {
    props.attributes[_key] = _value
  } else if (_property.usePropertyHook) {
    props[_key] = softSetHook(_value)
  } else if (_property.useAttributeHook) {
    props[_key] = attributeHook(_value)
  } else if (_property.isStandard) {
    props[_key] = _value
  }

  return props
}
