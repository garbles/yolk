import parseTag_ from 'parse-tag'

const TAG_IS_ONLY_LETTERS = /^[a-zA-Z]*$/

export function parseTag (_tagName, props) {
  let tagName = _tagName

  if (!TAG_IS_ONLY_LETTERS.test(tagName)) {
    tagName = parseTag_(_tagName, props).toLowerCase()
  }

  return tagName
}
