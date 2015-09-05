/** @jsx createElement */

const createElement = require(`createElement`)
const eventHandler = require(`eventHandler`)
const render = require(`render`)

class CustomStub {
  constructor () {
    this.type = `Widget`
  }

  init () {
    const node = document.createElement(`strong`)

    node.innerHTML = `hello world!`

    return node
  }

  update (previous, node) {
    return node
  }
}

function WrapCustomComponent () {
  return (
    <div>
      {new CustomStub()}
    </div>
  )
}

describe('wrapping custom virtual dom widgets', () => {
  it('works just as any other component would', () => {
    const component = <WrapCustomComponent />
    const node = document.createElement(`div`)
    render(component, node)

    assert.equal(node.innerHTML, `<div><strong>hello world!</strong></div>`)
  })
})
