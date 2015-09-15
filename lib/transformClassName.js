const isString = require(`./isString`)
const compact = require(`./compact`)

module.exports = function transformClassName (className) {
  if (isString(className)) {
    return className
  } else if (Array.isArray(className)) {
    return compact(className).join(' ')
  }
}
