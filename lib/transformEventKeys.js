const eventsMap = require(`eventsMap`)

module.exports = function transformEventKeys (props) {
  props = {...props}

  const keys = Object.keys(props)
  const length = keys.length
  let i = -1

  while (++i < length) {
    const key = keys[i]
    const newKey = eventsMap[key] || key

    if (newKey !== key) {
      const value = props[key]
      delete props[key]
      props[newKey] = value
    }
  }

  return props
}
