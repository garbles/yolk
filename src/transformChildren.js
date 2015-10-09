const wrapObject = require(`./wrapObject`)
const hasToJS = require(`./hasToJS`)

function toJSify (child) {
  return hasToJS(child) ? child.toJS() : child
}

module.exports = function transformChildren (children) {
  const _children = ([]).concat(children).map(toJSify)
  return wrapObject(_children)
}
