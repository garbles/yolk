const test = require(`tape`)
const Yolk = require(`yolk`) // eslint-disable-line no-unused-vars

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

function WrapCustomWidgetWithChildren (props) {
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

test(`WrapCustomWidgetWithChildren: wrapping custom virtual dom widgets`, t => {
  t.plan(4)

  const component = <WrapCustomWidgetWithChildren contents="and so does this" />
  const [node, cleanup] = renderInDoc(component)
  const widget = node.firstChild

  t.equal(widget.children[0].tagName, `DIV`)
  t.equal(widget.children[0].innerHTML, `This works`)
  t.equal(widget.children[1].tagName, `P`)
  t.equal(widget.children[1].innerHTML, `and so does this`)

  cleanup()
})
