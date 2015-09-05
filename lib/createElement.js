const YolkBaseComponent = require(`YolkBaseComponent`)
const YolkCompositeComponent = require(`YolkCompositeComponent`)
const wrapProps = require(`wrapProps`)

module.exports = function createElement (tag, props, ...children) {
  props = wrapProps(props || {})

  if (typeof tag === `string`) {
    return YolkBaseComponent.getPooled(tag, props, children)
  } else {
    return YolkCompositeComponent.getPooled(tag, props, children)
  }
}
