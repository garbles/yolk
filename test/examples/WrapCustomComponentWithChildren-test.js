const test = require(`tape`)
const Yolk = require(`yolk`)
const {h, create} = require(`yolk-virtual-dom`)
const renderInDoc = require(`../helpers/renderInDoc`)

class CustomStub {
  constructor (children) {
    this.type = `Widget`
    this.children = children
  }

  init () {
    const vNode = h(`div`, null, this.children)
    return create(vNode)
  }

  update (previous, node) {
    return node
  }
}

function WrapCustomComponentWithChildren (props) {
  return (
    <div>
      {
        new CustomStub([
          <div>This works</div>,
          <p>{props.contents}</p>,
        ])
      }
    </div>
  )
}

test(`wrapping custom virtual dom widgets`, t => {
  t.plan(1)

  const component = <WrapCustomComponentWithChildren contents="and so does this" />
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.innerHTML, `<div><div><div>This works</div><p>and so does this</p></div></div>`)

  cleanup()
})
