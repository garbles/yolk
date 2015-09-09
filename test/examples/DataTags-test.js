/** @jsx createElement */

const createElement = require(`createElement`)
const createEventHandler = require(`createEventHandler`)
const render = require(`render`)

describe(`Using data tags`, () => {

  it(`converts camel-cased data attributes to dashed one`, () => {
    const component = <div dataSomething={55} dataOtherReallyCoolThing="123123" />
    const node = document.createElement(`div`)
    render(component, node)

    assert.equal(node.innerHTML, `<div data-something="55" data-other-really-cool-thing="123123"></div>`)
  })
})
