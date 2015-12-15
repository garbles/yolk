import { default as test } from 'tape'
import { default as transformStyle } from 'transformStyle'

test(`transformStyle: returns nothing if style is nothing`, t => {
  t.plan(1)
  t.timeoutAfter(100)

  const props = {}

  transformStyle(props, undefined)
  t.deepEqual(props.style, undefined)
})

test(`transformStyle: converts necessary number values in px values`, t => {
  t.plan(1)
  t.timeoutAfter(100)

  const props = {}

  const style = {
    height: 1,
    width: 1,
    lineHeight: 50,
    zIndex: 1000,
  }
  const transformed = {
    height: `1px`,
    width: `1px`,
    lineHeight: 50,
    zIndex: 1000,
  }

  transformStyle(props, style)

  t.deepEqual(props.style, transformed)
})
