import { default as _parseTag } from 'parse-tag'

export default function parseTag (_tag) {
  const classIds = {}
  const tag = _parseTag(_tag, classIds).toLowerCase()
  return {tag, classIds}
}
