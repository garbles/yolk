import { default as test } from 'tape'
import { default as compact } from 'compact'

test(`compact: compacts arrays`, t => {
  t.plan(1)

  const a = ``
  const b = function name () {}
  const c = 123
  const d = false
  const e = 0
  const f = {}
  const g = null
  const h = undefined

  const arr = [a, b, c, d, e, f, g, h]
  const compacted = [a, b, c, e, f]

  t.deepEqual(compact(arr), compacted)
})
