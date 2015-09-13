/** @jsx createElement */

const {createElement, createEventHandler, render} = Yolk

function DestroyChildren () {
  const handleAdd = createEventHandler(null, 0)
  const handleRemove = createEventHandler(null, 0)

  const addable = handleAdd.scan(acc => acc.concat([<b />]), [])
  const removeable = handleRemove.scan(acc => acc.slice(1), [<p />, <p />, <p />, <p />, <p />])

  return (
    <div>
      <div id="children">
        {addable}
        {removeable}
      </div>
      <button onClick={handleAdd} id="add"></button>
      <button onClick={handleRemove} id="remove"></button>
    </div>
  )
}

describe(`destroying children`, () => {

  it(`throws them into an object pool`, () => {
    const component = <DestroyChildren />
    const node = document.createElement(`div`)
    render(component, node)

    const adder = node.querySelector(`#add`)
    const remover = node.querySelector(`#remove`)
    const children = node.querySelector(`#children`)

    assert.equal(children.innerHTML, `<b></b><p></p><p></p><p></p><p></p>`)

    remover.click()

    assert.equal(children.innerHTML, `<b></b><p></p><p></p><p></p>`)

    remover.click()
    remover.click()

    assert.equal(children.innerHTML, `<b></b><p></p>`)

    adder.click()
    adder.click()

    assert.equal(children.innerHTML, `<b></b><b></b><b></b><p></p>`)

  })

})
