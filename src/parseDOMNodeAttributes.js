import { default as camelCase } from 'lodash.camelcase'

const ALL_CHARS_ARE_DIGITS_REGEX = /^\d*$/
const DOES_NOT_LEAD_WITH_ENCLOSING_CHAR_REGEX = /^[^\{\[\"\']/

function isSingleton (value) {
  return (value === `true` || value === `false` || value === `null`)
}

export default function parseDOMNodeAttributes (attributes) {
  const attrs = {}
  const length = attributes.length
  let i = -1

  while (++i < length) {
    const attr = attributes[i]
    const name = camelCase(attr.name)
    let value = attr.value

    if (!ALL_CHARS_ARE_DIGITS_REGEX.test(value) && !isSingleton(value) && DOES_NOT_LEAD_WITH_ENCLOSING_CHAR_REGEX.test(value)) {
      value = `"${value}"`
    }

    attrs[name] = JSON.parse(value)
  }

  return attrs
}
