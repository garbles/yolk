const test = require(`tape`)
const Yolk = require(`yolk`) // eslint-disable-line no-unused-vars
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

test(`WrapCustomComponent: works just as any other component would`, t => {
  t.plan(2)

  const component = <WrapCustomComponent />
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.firstChild.tagName, `STRONG`)
  t.equal(node.firstChild.innerHTML, `hello world!`)

  cleanup()
})
