const transformStyle = require(`transformStyle`)

describe(`transformStyle`, () => {
  it(`returns nothing if style isn't defined in the props`, () => {
    assert.equal(transformStyle(undefined), undefined)
  })

  it(`converts necessary number values in px values`, () => {
    const style = {
      height: 1,
      width: 1,
      lineHeight: 50,
      zIndex: 1000
    }

    assert.deepEqual(transformStyle(style), {
      height: `1px`,
      width: `1px`,
      lineHeight: 50,
      zIndex: 1000
    })

  })
})
