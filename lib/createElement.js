const YolkCompositeComponent = require(`./YolkCompositeComponent`)
const YolkBaseComponent = require(`./YolkBaseComponent`)
const isString = require(`./isString`)

module.exports = function createElement (tag, props, ...children) {
  props || (props = {})

  if (isString(tag)) {
    return new YolkBaseComponent(tag, props, children)
  } else {
    return new YolkCompositeComponent(tag, props, children)
  }
}
