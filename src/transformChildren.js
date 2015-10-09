const wrapObject = require(`./wrapObject`)
const hasToJS = require(`./hasToJS`)

module.exports = function transformChildren (children) {
  const _children = children.map(child => hasToJS(child) ? child.toJS() : child)
  return wrapObject(_children)
}
