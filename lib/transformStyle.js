const isNumber = require(`isNumber`)

const unitlessNumberProperties = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  fillOpacity: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true
}

function transform (key, value) {
  const isUnitlessNumber = unitlessNumberProperties[key] || false

  if (!isUnitlessNumber && isNumber(value)) {
    value = `${value}px`
  }

  return {key, value}
}

module.exports = function transformStyle (style) {
  if (!style) return

  const keys = Object.keys(style)
  const length = keys.length
  let newStyle = {}

  for (let i = 0; i < length; i++) {
    let attr = keys[i]
    let {key, value} = transform(attr, style[attr])
    newStyle[key] = value
  }

  return newStyle
}
