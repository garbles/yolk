const transformProperties = require(`../../lib/transformProperties`)

describe(`transformProperties`, () => {
  it(`transforms props so that they will work correctly with virtual dom`, () => {
    const onClick = function(){}

    const props = {
      className: `className`,
      id: `id`,
      acceptCharset: true,
      dataTag: true,
      dataOtherTag: true,
      action: `/`,
      rowSpan: 5,
      onClick: onClick,
      onmouseup: function () {},
      nonStandardAttr: true
    }

    const transformedProps = {
      className: `className`,
      id: `id`,
      style: undefined,
      onclick: onClick,
      attributes: {
        action: `/`,
        rowspan: 5,
        'accept-charset': true,
        'data-tag': true,
        'data-other-tag': true
      }
    }

    assert.deepEqual(transformProperties(props), transformedProps)
  })
})
