/** @jsx Yolk.createElement */

const test = require(`tape`)
const Yolk = require(`../../lib/yolk`)

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

test(`can have multiple subscribers listening to the same source`, t => {
  t.plan(2)

  let component = <CounterWithMultipleSubscribers count={55} />
  const node = document.createElement(`div`)
  Yolk.render(component, node)

  t.equal(node.innerHTML, `<div><button id="plus">+</button><button id="minus">-</button><span>0</span><span>0</span><span>55</span><span>55</span></div>`)

  const plus = node.querySelector(`#plus`)
  const minus = node.querySelector(`#minus`)

  plus.click()
  plus.click()
  plus.click()
  minus.click()

  component = <CounterWithMultipleSubscribers count={77} />
  Yolk.render(component, node)

  t.equal(node.innerHTML, `<div><button id="plus">+</button><button id="minus">-</button><span>2</span><span>2</span><span>77</span><span>77</span></div>`)
})
