const test = require(`tape`)
const Yolk = require(`../../lib/yolk`)

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

test(`a simple counter`, t => {
  t.plan(2)

  const component = <Counter />
  const node = document.createElement(`div`)
  Yolk.render(component, node)

  t.equal(node.innerHTML, `<div><button id="plus">+</button><button id="minus">-</button><span>0</span></div>`)

  const plus = node.querySelector(`#plus`)
  const minus = node.querySelector(`#minus`)

  plus.click()
  plus.click()
  plus.click()
  minus.click()

  t.equal(node.innerHTML, `<div><button id="plus">+</button><button id="minus">-</button><span>2</span></div>`)
})
