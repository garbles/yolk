const test = require(`tape`)
const Yolk = require(`yolk`)
const renderInDoc = require(`../helpers/renderInDoc`)

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
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.innerHTML, `<div><strong>hello world!</strong></div>`)

  cleanup()
})
