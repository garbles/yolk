import { default as parseTag_ } from 'parse-tag'

export default function parseTag (_tag) {
  const classIds = {}
  const tag = parseTag_(_tag, classIds).toLowerCase()
  return {tag, classIds}
}
