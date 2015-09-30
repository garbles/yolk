const test = require(`tape`)
const Yolk = require(`../../lib/yolk`)

function DestroyChildren () {
  const handleAdd = this.createEventHandler(null, 0)
  const handleRemove = this.createEventHandler(null, 0)

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

test(`destroying children`, t => {
  t.plan(4)

  const component = <DestroyChildren />
  const node = document.createElement(`div`)
  Yolk.render(component, node)

  const adder = node.querySelector(`#add`)
  const remover = node.querySelector(`#remove`)
  const children = node.querySelector(`#children`)

  t.equal(children.innerHTML, `<b></b><p></p><p></p><p></p><p></p>`)

  remover.click()

  t.equal(children.innerHTML, `<b></b><p></p><p></p><p></p>`)

  remover.click()
  remover.click()

  t.equal(children.innerHTML, `<b></b><p></p>`)

  adder.click()
  adder.click()

  t.equal(children.innerHTML, `<b></b><b></b><b></b><p></p>`)
})
