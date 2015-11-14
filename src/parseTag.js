const _parseTag = require(`parse-tag`)

module.exports = function parseTag (_tag) {
  const classIds = {}
  const tag = _parseTag(_tag, classIds).toLowerCase()
  return {tag, classIds}
}
