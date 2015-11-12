const parseTag = require(`parse-tag`)
const createElement = require(`./createElement`)
const isString = require(`./isString`)
const flatten = require(`./flatten`)

module.exports = function h (_tag, _props, ..._children) {
  let tag
  const props = {..._props}
  const children = flatten(_children)

  if (isString(_tag)) {
    tag = parseTag(_tag, props).toLowerCase()
  } else {
    tag = _tag
  }

  return createElement(tag, props, ...children)
}
