/** @jsx Yolk.createElement */

const test = require(`tape`)
const Yolk = require(`../../lib/yolk`)

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
  const node = document.createElement(`div`)
  Yolk.render(component, node)

  t.equal(node.innerHTML, `<div class="wrapper"><div id="hello"></div></div>`)
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
  const node = document.createElement(`div`)
  Yolk.render(component, node)

  t.equal(node.innerHTML, `<div class="wrapper"><div class="wrapper"><div id="hello"></div><div class="wrapper"><div id="hello"></div></div></div></div>`)
})
