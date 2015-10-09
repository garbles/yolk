const flatten = require(`./flatten`)
const wrapObject = require(`./wrapObject`)
const hasToJS = require(`./hasToJS`)

function toJSify (children) {
  const _children = flatten([children])
  const length = _children.length
  let mustFlatten = false
  let i = -1
  let arr = Array(length)

  while (++i < length) {
    const child = _children[i]
    const newChild = hasToJS(child) ? child.toJS() : child
    arr[i] = newChild
    mustFlatten = mustFlatten || child !== newChild
  }

  if (mustFlatten) {
    arr = flatten(arr)
  }

  return arr
}

module.exports = function transformChildren (children) {
  const _children = toJSify(children)
  return wrapObject(_children)
}
