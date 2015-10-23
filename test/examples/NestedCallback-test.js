const test = require(`tape`)
const Yolk = require(`yolk`)
const renderInDoc = require(`../helpers/renderInDoc`)

function NestedCallback () {
  const handleInc = this.createEventHandler(() => 1, 0)
  const count = handleInc.scan((x, y) => x + y, 0)

  return (
    <div>
      <div id="count">
        {count}
      </div>
      <NestedCallbackChild onClick={handleInc} />
    </div>
  )
}

function NestedCallbackChild (props) {
  return <button id="nested-button" onClick={props.onClick} />
}

test(`handles calling callback functions from a child component`, t => {
  t.plan(2)

  const component = <NestedCallback />
  const [node, cleanup] = renderInDoc(component)

  const count = node.querySelector(`#count`)
  const button = node.querySelector(`#nested-button`)

  t.equal(count.innerHTML, `0`)

  button.click()
  button.click()
  button.click()

  t.equal(count.innerHTML, `3`)

  cleanup()
})
