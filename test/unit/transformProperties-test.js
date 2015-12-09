import { default as test } from 'tape'
import { default as transformProperties } from 'transformProperties'
import { default as EventHook } from 'EventHook'
import { default as SoftSetHook } from 'yolk-virtual-dom/virtual-hyperscript/hooks/soft-set-hook'

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
    disabled: new SoftSetHook(false),
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
