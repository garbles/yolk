/** @jsx createElement */

const createElement = require(`createElement`)
const createEventHandler = require(`createEventHandler`)
const render = require(`render`)

function Counter (props, children) {
  const handlePlus = createEventHandler(1)
  const handleMinus = createEventHandler(-1)
  const count = handlePlus.merge(handleMinus).scan((x, y) => x+y, 0)

  return (
    <div>
      <button id="plus" onClick={handlePlus}>+</button>
      <button id="minus" onClick={handleMinus}>-</button>
      <span>Count: {count}</span>
    </div>
  )
}

describe(`A simple counter`, () => {

  it(`increments and decrements a number`, () => {
    const component = <Counter />
    const node = document.createElement(`div`)
    render(component, node)

    assert.equal(node.innerHTML, `<div><button id="plus">+</button><button id="minus">-</button><span>Count: 0</span></div>`)

    const plus = node.querySelector(`#plus`)
    const minus = node.querySelector(`#minus`)

    plus.click()
    plus.click()
    plus.click()
    minus.click()

    assert.equal(node.innerHTML, `<div><button id="plus">+</button><button id="minus">-</button><span>Count: 2</span></div>`)
  })

})
