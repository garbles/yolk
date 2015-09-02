const YolkBaseComponent = require(`YolkBaseComponent`)
const YolkCompositeComponent = require(`YolkCompositeComponent`)
const wrapProps = require(`wrapProps`)

module.exports = function createElement (tag, props, ...children) {
  props = wrapProps(props || {})

  if (typeof tag === `string`) {
    return new YolkBaseComponent(tag, props, children)
  } else {
    return new YolkCompositeComponent(tag, props, children)
  }
}
