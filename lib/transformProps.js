const transformStyle = require(`transformStyle`)
const transformEventKeys = require(`transformEventKeys`)

module.exports = function transformProps (props) {
  props.style = transformStyle(props.style)
  props = transformEventKeys(props)

  return props
}
