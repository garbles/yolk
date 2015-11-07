const test = require(`tape`)
const Yolk = require(`yolk`)
const evStore = require(`ev-store`)
const renderInDoc = require(`../helpers/renderInDoc`)

function CounterWithMultipleSubscribers (props) {
  const handlePlus = this.createEventHandler(() => 1, 0)
  const handleMinus = this.createEventHandler(() => -1, 0)
  const count = handlePlus.merge(handleMinus).scan((x, y) => x + y, 0)

  return (
    <div>
      <button id="plus" onClick={handlePlus}>+</button>
      <button id="minus" onClick={handleMinus}>-</button>
      <span>{count}</span>
      <span>{count}</span>
      <span>{props.count}</span>
      <span>{props.count}</span>
    </div>
  )
}

test(`MultipleSubscribers: can have multiple subscribers listening to the same source`, t => {
  t.plan(21)

  let component = <CounterWithMultipleSubscribers count={55} />
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.tagName, `DIV`)
  t.equal(node.children[0].tagName, `BUTTON`)
  t.equal(node.children[0].id, `plus`)
  t.equal(node.children[0].innerHTML, `+`)
  t.equal(node.children[1].tagName, `BUTTON`)
  t.equal(node.children[1].id, `minus`)
  t.equal(node.children[1].innerHTML, `-`)
  t.equal(node.children[2].tagName, `SPAN`)
  t.equal(node.children[2].innerHTML, `0`)
  t.equal(node.children[3].tagName, `SPAN`)
  t.equal(node.children[3].innerHTML, `0`)
  t.equal(node.children[4].tagName, `SPAN`)
  t.equal(node.children[4].innerHTML, `55`)
  t.equal(node.children[5].tagName, `SPAN`)
  t.equal(node.children[5].innerHTML, `55`)

  t.ok(evStore(node.children[0]).click)
  t.ok(evStore(node.children[1]).click)

  const plus = node.querySelector(`#plus`)
  const minus = node.querySelector(`#minus`)

  plus.click()
  plus.click()
  plus.click()
  minus.click()

  component = <CounterWithMultipleSubscribers count={77} />
  Yolk.render(component, node.parentNode)

  t.equal(node.children[2].innerHTML, `2`)
  t.equal(node.children[3].innerHTML, `2`)
  t.equal(node.children[4].innerHTML, `77`)
  t.equal(node.children[5].innerHTML, `77`)

  cleanup()
})
