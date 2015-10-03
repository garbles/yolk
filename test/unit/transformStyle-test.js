const test = require(`tape`)
const transformStyle = require(`transformStyle`)

test(`transformStyle: converts necessary number values in px values`, t => {
  t.plan(2)

  const props = {}

  transformStyle(props, undefined)

  t.deepEqual(props.style, undefined)

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
