import { default as test } from 'tape'
import { default as parseTag } from 'parseTag'

test(`parseTag: returns a new tag with it's classes and ids`, t => {
  t.plan(6)
  t.timeoutAfter(100)

  let parsed = parseTag(`div.a.b.c`)
  t.equal(parsed.tag, `div`)
  t.deepEqual(parsed.classIds, {className: `a b c`})

  parsed = parseTag(`strong.some-thing#some-other-thing.a`)
  t.equal(parsed.tag, `strong`)
  t.deepEqual(parsed.classIds, {className: `some-thing a`, id: `some-other-thing`})

  parsed = parseTag(`#some-other-thing`)
  t.equal(parsed.tag, `div`)
  t.deepEqual(parsed.classIds, {id: `some-other-thing`})
})
