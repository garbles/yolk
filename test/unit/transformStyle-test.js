const transformStyle = require(`../../lib/transformStyle`)

describe(`transformStyle`, () => {
  it(`returns an empty object if style isn't defined in the props`, () => {
    const props = {}
    transformStyle(props, undefined)
    assert.deepEqual(props.style, undefined)
  })

  it(`converts necessary number values in px values`, () => {
    const props = {}
    const style = {
      height: 1,
      width: 1,
      lineHeight: 50,
      zIndex: 1000,
    }

    transformStyle(props, style)

    assert.deepEqual(props.style, {
      height: `1px`,
      width: `1px`,
      lineHeight: 50,
      zIndex: 1000,
    })
  })
})
