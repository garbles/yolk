const test = require(`tape`)
const parseDOMNodeAttributes = require(`parseDOMNodeAttributes`)

test(`parseDOMNodeAttributes: no attributes`, t => {
  t.plan(1)

  t.deepEqual(parseDOMNodeAttributes([]), {})
})

test(`parseDOMNodeAttributes: with an array`, t => {
  t.plan(3)

  const attributes1 = [{name: `name`, value: `[]`}]
  const attributes2 = [{name: `cool-name`, value: `[1,2,3]`}]
  const attributes3 = [{name: `name`, value: `[{"a": "b"}]`}]

  t.deepEqual(parseDOMNodeAttributes(attributes1), {name: []})
  t.deepEqual(parseDOMNodeAttributes(attributes2), {coolName: [1, 2, 3]})
  t.deepEqual(parseDOMNodeAttributes(attributes3), {name: [{a: `b`}]})
})

test(`parseDOMNodeAttributes: with an object`, t => {
  t.plan(2)

  const attributes1 = [{name: `name`, value: `{}`}]
  const attributes2 = [{name: `name`, value: `{"a": "b"}`}]

  t.deepEqual(parseDOMNodeAttributes(attributes1), {name: {}})
  t.deepEqual(parseDOMNodeAttributes(attributes2), {name: {a: `b`}})
})

test(`parseDOMNodeAttributes: with an integer`, t => {
  t.plan(1)

  const attributes1 = [{name: `some-cool-name`, value: `1`}]

  t.deepEqual(parseDOMNodeAttributes(attributes1), {someCoolName: 1})
})

test(`parseDOMNodeAttributes: with a string`, t => {
  t.plan(1)

  const attributes1 = [{name: `name`, value: `hello world`}]

  t.deepEqual(parseDOMNodeAttributes(attributes1), {name: `hello world`})
})

test(`parseDOMNodeAttributes: string starts with a number`, t => {
  t.plan(1)

  const attributes1 = [{name: `name`, value: `1 hello world`}]

  t.deepEqual(parseDOMNodeAttributes(attributes1), {name: `1 hello world`})
})

test(`parseDOMNodeAttributes: with a node attributes object`, t => {
  t.plan(1)

  const node = document.createElement(`div`)

  node.innerHTML = `<div some-prop="55" some-other-prop="[{}]"></div>`

  const attributes1 = node.firstChild.attributes

  t.deepEqual(parseDOMNodeAttributes(attributes1), {someProp: 55, someOtherProp: [{}]})
})

test.only(`parseDOMNodeAttributes: with a singleton value`, t => {
  t.plan(3)

  const attributes1 = [{name: `name`, value: `true`}]
  const attributes2 = [{name: `name`, value: `false`}]
  const attributes4 = [{name: `name`, value: `null`}]

  t.deepEqual(parseDOMNodeAttributes(attributes1), {name: true})
  t.deepEqual(parseDOMNodeAttributes(attributes2), {name: false})
  t.deepEqual(parseDOMNodeAttributes(attributes4), {name: null})
})
