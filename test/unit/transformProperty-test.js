const test = require(`tape`)
const transformProperty = require(`transformProperty`)
const SoftSetHook = require(`yolk-virtual-dom/virtual-hyperscript/hooks/soft-set-hook`)
const AttributeHook = require(`yolk-virtual-dom/virtual-hyperscript/hooks/attribute-hook`)
const EventHook = require(`EventHook`)

const BASE_DESCRIPTOR = {
  isStandard: true,
  isAttribute: false,
  usePropertyHook: false,
  useEventHook: false,
  useAttributeHook: false,
  canBeArrayOfStrings: false,
  hasBooleanValue: false,
  isStar: false,
  computed: undefined,
}

test(`transformProperty: property is not standard`, t => {
  t.plan(1)
  t.timeoutAfter(100)

  const props = {attributes: {}}
  const descriptor = {...BASE_DESCRIPTOR, isStandard: false}

  transformProperty(props, `key`, `value`, descriptor)

  t.deepEqual(props, {attributes: {}})
})

test(`transformProperty: property has a boolean value`, t => {
  t.plan(1)
  t.timeoutAfter(100)

  const props = {attributes: {}}
  const descriptor = {...BASE_DESCRIPTOR, hasBooleanValue: true}

  transformProperty(props, `keyWithBooleanTrue`, true, descriptor)
  transformProperty(props, `keyWithBooleanFalse`, false, descriptor)
  transformProperty(props, `keyWithNotBoolean`, 123, descriptor)

  t.deepEqual(props, {keyWithBooleanTrue: true, keyWithBooleanFalse: false, attributes: {}})
})

test(`transformProperty: property has a boolean value and an attribute`, t => {
  t.plan(1)
  t.timeoutAfter(100)

  const props = {attributes: {}}
  const descriptor = {...BASE_DESCRIPTOR, hasBooleanValue: true, isAttribute: true}

  transformProperty(props, `keyWithBooleanTrue`, true, descriptor)
  transformProperty(props, `keyWithBooleanFalse`, false, descriptor)
  transformProperty(props, `keyWithNotBoolean`, 123, descriptor)

  t.deepEqual(props, {attributes: {keyWithBooleanTrue: true, keyWithBooleanFalse: false}})
})

test(`transformProperty: property is star`, t => {
  t.plan(1)
  t.timeoutAfter(100)

  const props = {attributes: {}}
  const descriptor = {...BASE_DESCRIPTOR, isStar: true}

  transformProperty(props, `key`, {key: true, longBigKey: `123`}, descriptor)

  t.deepEqual(props, {attributes: { 'key-key': true, 'key-long-big-key': `123`}})
})

test(`transformProperty: property is attribute`, t => {
  t.plan(1)
  t.timeoutAfter(100)

  const props = {attributes: {}}
  const descriptor = {...BASE_DESCRIPTOR, isAttribute: true}

  transformProperty(props, `key`, `value`, descriptor)

  t.deepEqual(props, {attributes: {key: `value`}})
})

test(`transformProperty: property can be an array of string buts isn't`, t => {
  t.plan(1)
  t.timeoutAfter(100)

  const props = {attributes: {}}
  const descriptor = {...BASE_DESCRIPTOR, canBeArrayOfStrings: true}

  transformProperty(props, `key`, `value`, descriptor)

  t.deepEqual(props, {attributes: {}, key: `value`})
})

test(`transformProperty: property can be an array of string and is one`, t => {
  t.plan(1)
  t.timeoutAfter(100)

  const props = {attributes: {}}
  const descriptor = {...BASE_DESCRIPTOR, canBeArrayOfStrings: true}

  transformProperty(props, `key`, [`value`, `value2`, `value3`], descriptor)

  t.deepEqual(props, {attributes: {}, key: `value value2 value3`})
})

test(`transformProperty: property uses property hook`, t => {
  t.plan(1)
  t.timeoutAfter(100)

  const props = {attributes: {}}
  const descriptor = {...BASE_DESCRIPTOR, usePropertyHook: true}

  transformProperty(props, `key`, `value`, descriptor)

  t.deepEqual(props, {attributes: {}, key: new SoftSetHook(`value`)})
})

test(`transformProperty: property uses event hook`, t => {
  t.plan(1)
  t.timeoutAfter(100)

  const props = {attributes: {}}
  const descriptor = {...BASE_DESCRIPTOR, useEventHook: true}

  transformProperty(props, `key`, `value`, descriptor)

  t.deepEqual(props, {attributes: {}, key: new EventHook(`value`)})
})

test(`transformProperty: property uses attribute hook`, t => {
  t.plan(1)
  t.timeoutAfter(100)

  const props = {attributes: {}}
  const descriptor = {...BASE_DESCRIPTOR, useAttributeHook: true}

  transformProperty(props, `key`, `value`, descriptor)

  t.deepEqual(props, {attributes: {}, key: new AttributeHook(null, `value`)})
})
