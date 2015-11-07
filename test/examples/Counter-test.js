const test = require(`tape`)
const Yolk = require(`yolk`) // eslint-disable-line no-unused-vars
const renderInDoc = require(`../helpers/renderInDoc`)

function Counter () {
  const handlePlus = this.createEventHandler(1)
  const handleMinus = this.createEventHandler(-1)
  const count = handlePlus.merge(handleMinus).scan((x, y) => x + y, 0).startWith(0)

  return (
    <div>
      <button id="plus" onClick={handlePlus}>+</button>
      <button id="minus" onClick={handleMinus}>-</button>
      <span>{count}</span>
    </div>
  )
}

test(`Counter: a simple counter`, t => {
  t.plan(11)
  t.timeoutAfter(100)

  const [node, cleanup] = renderInDoc(<Counter />)

  t.equal(node.tagName, `DIV`)
  t.equal(node.children[0].tagName, `BUTTON`)
  t.equal(node.children[0].id, `plus`)
  t.equal(node.children[0].innerHTML, `+`)
  t.equal(node.children[1].tagName, `BUTTON`)
  t.equal(node.children[1].id, `minus`)
  t.equal(node.children[1].innerHTML, `-`)
  t.equal(node.children[2].tagName, `SPAN`)
  t.equal(node.children[2].innerHTML, `0`)

  const plus = node.querySelector(`#plus`)
  const minus = node.querySelector(`#minus`)

  plus.click()
  plus.click()
  plus.click()
  minus.click()

  t.equal(node.children[2].tagName, `SPAN`)
  t.equal(node.children[2].innerHTML, `2`)

  cleanup()
})
