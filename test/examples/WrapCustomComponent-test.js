const test = require(`tape`)
const Yolk = require(`yolk`)

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

test(`works just as any other component would`, t => {
  t.plan(1)

  const component = <WrapCustomComponent />
  const node = document.createElement(`div`)
  Yolk.render(component, node)

  t.equal(node.innerHTML, `<div><strong>hello world!</strong></div>`)
})
