const isNumber = require(`isNumber`)

const isUnitlessNumber = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
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
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
}

function transform (key, value) {
  if (!isUnitlessNumber[key] && isNumber(value)) {
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
