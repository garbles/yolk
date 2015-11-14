const YolkCompositeComponent = require(`./YolkCompositeComponent`)
const YolkBaseComponent = require(`./YolkBaseComponent`)
const isString = require(`./isString`)

module.exports = function createElement (tag, _props, ...children) {
  const props = {..._props}

  if (isString(tag)) {
    return YolkBaseComponent.create(tag, props, children)
  }

  if (tag._isCustomComponent) {
    return tag.create(props, children)
  }

  return YolkCompositeComponent.create(tag, props, children)
}
