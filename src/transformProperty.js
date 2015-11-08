const kababCase = require(`lodash.kebabcase`)
const SoftSetHook = require(`yolk-virtual-dom/virtual-hyperscript/hooks/soft-set-hook`)
const AttributeHook = require(`yolk-virtual-dom/virtual-hyperscript/hooks/attribute-hook`)
const EventHook = require(`./EventHook`)
const compact = require(`./compact`)

const NULL_DESCRIPTOR = {
  isAttribute: false,
  isStandard: false,
  usePropertyHook: false,
  useEventHook: false,
  useAttributeHook: false,
  canBeArrayOfStrings: false,
  hasBooleanValue: false,
  isStar: false,
  computed: undefined,
}

const STAR_DESCRIPTOR = {...NULL_DESCRIPTOR, isAttribute: true, isStandard: true}

module.exports = function transformProperty (props, key, value, descriptor = NULL_DESCRIPTOR) {
  let _value = value
  let _key

  if (!descriptor.isStandard) {
    return props
  }

  if (descriptor.hasBooleanValue && (_value !== true && _value !== false)) {
    return props
  }

  if (descriptor.isStar) {
    const keys = Object.keys(value)
    const length = keys.length
    let i = -1

    while (++i < length) {
      const __key = keys[i]
      const __value = value[__key]
      transformProperty(props, `${key}-${kababCase(__key)}`, __value, STAR_DESCRIPTOR)
    }

    return props
  }

  _key = descriptor.computed || key

  if (descriptor.canBeArrayOfStrings && Array.isArray(_value)) {
    _value = compact(_value).join(` `)
  }

  if (descriptor.isAttribute) {
    props.attributes[_key] = _value
  } else if (descriptor.usePropertyHook) {
    props[_key] = new SoftSetHook(_value)
  } else if (descriptor.useEventHook) {
    props[_key] = new EventHook(_value)
  } else if (descriptor.useAttributeHook) {
    props[_key] = new AttributeHook(null, _value)
  } else if (descriptor.isStandard) {
    props[_key] = _value
  }

  return props
}
