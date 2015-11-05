const YolkCompositeComponent = require(`./YolkCompositeComponent`)
const YolkBaseComponent = require(`./YolkBaseComponent`)
const isString = require(`./isString`)

module.exports = function createElement (tag, props, ...children) {
  const _props = props || {}

  if (isString(tag)) {
    return new YolkBaseComponent(tag, _props, children)
  }

  if (tag._isCustomComponent) {
    return tag.create(_props, children)
  }

  return new YolkCompositeComponent(tag, _props, children)
}
