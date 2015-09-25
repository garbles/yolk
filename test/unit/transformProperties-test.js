const test = require(`tape`)
const transformProperties = require(`../../lib/transformProperties`)

test(`transformProperties: transforms props so that they will work correctly with virtual dom`, t => {
  t.plan(1)
  const onClick = function onClick () {}

  const props = {
    className: [`someName`, `otherName`],
    acceptCharset: true,
    dataTag: true,
    dataOtherTag: true,
    action: `/`,
    rowSpan: 5,
    onClick: onClick,
    onmouseup: function onMouseUp () {},
    nonStandardAttr: true,
    disabled: false,
  }

  const transformedProps = {
    className: `someName otherName`,
    onclick: onClick,
    attributes: {
      action: `/`,
      rowspan: 5,
      'accept-charset': true,
      'data-tag': true,
      'data-other-tag': true,
    },
  }

  t.deepEqual(transformProperties(`div`, props), transformedProps)
})
