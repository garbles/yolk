const DOMProperties = require(`./DOMProperties`)
const transformStyle = require(`./transformStyle`)
const transformProperty = require(`./transformProperty`)

module.exports = function transformProperties (tag, props) {
  const keys = Object.keys(props)
  const length = keys.length
  const newProps = {attributes: {}}
  let i = -1

  while (++i < length) {
    const key = keys[i]
    const value = props[key]

    if (key === `style`) {
      transformStyle(newProps, props.style)
    } else {
      transformProperty(newProps, key, value, DOMProperties[key])
    }
  }

  return newProps
}
