const parseTag = require(`parse-tag`)
const YolkCompositeComponent = require(`./YolkCompositeComponent`)
const YolkBaseComponent = require(`./YolkBaseComponent`)
const isString = require(`./isString`)
const flatten = require(`./flatten`)

const TAG_IS_ONLY_LETTERS = /^[a-zA-Z]*$/

module.exports = function createElement (_tag, _props, ..._children) {
  let tag = _tag
  const props = {..._props}
  const children = flatten(_children)

  if (isString(tag)) {
    if (!TAG_IS_ONLY_LETTERS.test(tag)) {
      tag = parseTag(tag, props).toLowerCase()
    }

    return new YolkBaseComponent(tag, props, children)
  }

  if (tag._isCustomComponent) {
    return tag.create(props, children)
  }

  return new YolkCompositeComponent(tag, props, children)
}
