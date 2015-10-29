const test = require(`tape`)
const transformProperties = require(`transformProperties`)
const EventHook = require(`EventHook`)
const AttributeHook = require(`yolk-virtual-dom/virtual-hyperscript/hooks/attribute-hook`)

test(`transformProperties: transforms props so that they will work correctly with virtual dom`, t => {
  t.plan(1)
  const onClick = function onClick () {}

  const props = {
    className: [`someName`, `otherName`],
    acceptCharset: true,
    data: {tag: true, otherTag: true},
    action: `/`,
    rowSpan: 5,
    onClick: onClick,
    onmouseup: function onMouseUp () {},
    nonStandardAttr: true,
    disabled: false,
  }

  const transformedProps = {
    className: `someName otherName`,
    onclick: new EventHook(onClick),
    disabled: new AttributeHook(false),
    attributes: {
      action: `/`,
      rowspan: 5,
      'accept-charset': true,
      'data-tag': true,
      'data-other-tag': true,
    },
  }

  t.deepEqual(transformProperties(props), transformedProps)
})
