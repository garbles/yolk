const hasToJS = require(`./hasToJS`)

module.exports = function transformChildren (children) {
  return hasToJS(children) ? children.toJS() : children
}
