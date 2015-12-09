import { default as test } from 'tape'
import { default as Yolk } from 'yolk' // eslint-disable-line no-unused-vars
import { default as renderInDoc } from '../helpers/renderInDoc'

function DestroyChildren ({createEventHandler}) {
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

test(`DestroyChildren: remove children after clicking`, t => {
  t.plan(19)

  const component = <DestroyChildren />
  const [node, cleanup] = renderInDoc(component)

  const adder = node.querySelector(`#add`)
  const remover = node.querySelector(`#remove`)
  const children = node.querySelector(`#children`)

  t.equal(children.children[0].tagName, `B`)
  t.equal(children.children[1].tagName, `P`)
  t.equal(children.children[2].tagName, `P`)
  t.equal(children.children[3].tagName, `P`)
  t.equal(children.children[4].tagName, `P`)
  t.notOk(children.children[5])

  remover.click()

  t.equal(children.children[0].tagName, `B`)
  t.equal(children.children[1].tagName, `P`)
  t.equal(children.children[2].tagName, `P`)
  t.equal(children.children[3].tagName, `P`)
  t.notOk(children.children[4])

  remover.click()
  remover.click()

  t.equal(children.children[0].tagName, `B`)
  t.equal(children.children[1].tagName, `P`)
  t.notOk(children.children[2])

  adder.click()
  adder.click()

  t.equal(children.children[0].tagName, `B`)
  t.equal(children.children[1].tagName, `B`)
  t.equal(children.children[2].tagName, `B`)
  t.equal(children.children[3].tagName, `P`)
  t.notOk(children.children[4])

  cleanup()
})
