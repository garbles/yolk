const isNumber = require(`isNumber`)
const unitlessNumberProperties = require(`unitlessNumberProperties`)

function transform (key, value) {
  const isUnitlessNumber = unitlessNumberProperties[key] || false

  if (!isUnitlessNumber && isNumber(value)) {
    value = `${value}px`
  }

  return {key, value}
}

function transformStyle (style) {
  if (!style) return

  let newStyle = {}

  for (let attr in style) {
    const {key, value} = transform(attr, style[attr])
    newStyle[key] = value
  }

  return newStyle
}

transformStyle.wrapProps = function wrapProps (props) {
  props.style = transformStyle(props.style)
  return props
}

module.exports = transformStyle
