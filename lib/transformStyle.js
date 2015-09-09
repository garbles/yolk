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

module.exports = function transformStyle (style) {
  if (!style) return

  const keys = Object.keys(style)
  const length = keys.length
  let newStyle = {}

  for (let i = 0; i < length; i++) {
    const key = keys[i]
    const isUnitlessNumber = unitlessNumberProperties[key] || false
    let value = style[key]

    if (!isUnitlessNumber && isNumber(value)) {
      value = `${value}px`
    }

    newStyle[key] = value
  }

  return newStyle
}
