/** @jsx Yolk.createElement */

const {createEventHandler, render} = Yolk

function NestedCallback () {
  const handleInc = createEventHandler(() => 1, 0)
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

describe(`calling nested callbacks`, () => {
  it(`handles calling callback functions from a child component`, () => {
    const component = <NestedCallback />
    const node = document.createElement(`div`)
    render(component, node)

    const count = node.querySelector(`#count`)
    const button = node.querySelector(`#nested-button`)

    assert.equal(count.innerHTML, `0`)

    button.click()
    button.click()
    button.click()

    assert.equal(count.innerHTML, `3`)
  })
})
