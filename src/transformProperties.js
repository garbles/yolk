const DOMProperties = require(`./DOMProperties`)
const transformStyle = require(`./transformStyle`)
const transformProperty = require(`./transformProperty`)
const hasToJS = require(`./hasToJS`)

module.exports = function transformProperties (props) {
  const keys = Object.keys(props)
  const length = keys.length
  const newProps = {attributes: {}}
  let i = -1

  while (++i < length) {
    const key = keys[i]
    let value = props[key]
    value = hasToJS(value) ? value.toJS() : value

    if (key === `style`) {
      transformStyle(newProps, value)
    } else {
      transformProperty(newProps, key, value, DOMProperties[key])
    }
  }

  return newProps
}
