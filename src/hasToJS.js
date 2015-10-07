const isFunction = require(`./isFunction`)

module.exports = function hasToJS (obj) {
  return !!obj && isFunction(obj.toJS)
}
