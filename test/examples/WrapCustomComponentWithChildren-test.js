/** @jsx Yolk.createElement */

const test = require(`tape`)
const Yolk = require(`../../lib/yolk`)
const {h, create} = require(`virtual-dom`)

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
  const node = document.createElement(`div`)
  Yolk.render(component, node)

  t.equal(node.innerHTML, `<div><div><div>This works</div><p>and so does this</p></div></div>`)
})
