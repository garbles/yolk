/** @jsx createElement */

const {Rx, createElement, createEventHandler, render} = Yolk
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
  const contents = props.map(p => p.contents)

  return (
    <div>
      {
        new CustomStub([
          <div>This works</div>,
          <p>{contents}</p>
        ])
      }
    </div>
  )
}

describe(`wrapping custom virtual dom widgets`, () => {
  it(`works just as any other component would`, () => {
    const component = <WrapCustomComponentWithChildren contents="and so does this" />
    const node = document.createElement(`div`)
    render(component, node)

    assert.equal(node.innerHTML, `<div><div><div>This works</div><p>and so does this</p></div></div>`)
  })
})
