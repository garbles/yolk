const wrapObject = require(`./wrapObject`)
const hasToJS = require(`./hasToJS`)

module.exports = function transformChildren (children) {
  const _children = hasToJS(children) ? children.toJS() : children
  return wrapObject(_children)
}
