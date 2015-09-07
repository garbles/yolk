/** @jsx createElement */

const createElement = require(`createElement`)
const createEventHandler = require(`createEventHandler`)
const render = require(`render`)

function NestedCallback () {
  const handleInc = createEventHandler(1)
  const count = handleInc.scan((x,y) => x+y, 0)

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
  const onClick = props.map(p => p.onClick)

  return (
    <button id="nested-button" onclick={onClick} />
  )
}

describe(`calling nested callbacks`, function () {
  it(`handles calling callback functions from a child component`, () => {
    const component = <NestedCallback />
    const node = document.createElement(`div`)
    render(component, node)

    const count = node.querySelector(`#count`)
    const button = node.querySelector(`#nested-button`)

    assert.equal(count.innerHTML, '0')

    button.click()
    button.click()
    button.click()

    assert.equal(count.innerHTML, '3')
  })
})