const test = require(`tape`)
const Yolk = require(`yolk`)
const renderInDoc = require(`../helpers/renderInDoc`)

function HasChildren (props, children) {
  return (
    <div className="wrapper">
      {children}
    </div>
  )
}

test(`renders children`, t => {
  t.plan(1)

  const component = (
    <HasChildren>
      <div id="hello" />
    </HasChildren>
  )
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.innerHTML, `<div class="wrapper"><div id="hello"></div></div>`)

  cleanup()
})

test(`renders deeply nested children`, t => {
  t.plan(1)

  const component = (
    <HasChildren>
      <HasChildren>
        <div id="hello" />
        <HasChildren>
          <div id="hello" />
        </HasChildren>
      </HasChildren>
    </HasChildren>
  )

  const [node, cleanup] = renderInDoc(component)

  t.equal(node.innerHTML, `<div class="wrapper"><div class="wrapper"><div id="hello"></div><div class="wrapper"><div id="hello"></div></div></div></div>`)

  cleanup()
})
