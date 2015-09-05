/** @jsx createElement */

const createElement = require(`createElement`)
const createEventHandler = require(`createEventHandler`)
const render = require(`render`)

function NestedCounter (props) {
  const handlePlus = createEventHandler(1)
  const handleMinus = createEventHandler(-1)
  const count =
    handlePlus.merge(handleMinus)
    .scan((acc, next) => acc + next, 0)
    .combineLatest(props.map(p => p.count), (a, b) => a + b)

  return (
    <div>
      <div>
        <button id="nested-plus" onclick={handlePlus}>+</button>
        <button id="nested-minus" onclick={handleMinus}>-</button>
      </div>
      <div id="nested-count">
        {count}
      </div>
    </div>
  )
}

function Counter () {
  const handlePlus = createEventHandler(1)
  const handleMinus = createEventHandler(-1)
  const count = handlePlus.merge(handleMinus).scan((acc, next) => acc + next, 0)

  return (
    <div>
      <div>
        <button id="wrapper-plus" onclick={handlePlus}>+</button>
        <button id="wrapper-minus" onclick={handleMinus}>-</button>
      </div>
      <div id="wrapper-count">
        {count}
      </div>
      <div>
        <NestedCounter count={count} />
      </div>
    </div>
  )
}

describe(`A nested counter`, () => {

  it(`increments and decrements a wrapper counter and a nested child`, () => {
    const component = <Counter />
    const node = document.createElement(`div`)
    render(component, node)

    const wrapperPlus = node.querySelector(`#wrapper-plus`)
    const wrapperMinus = node.querySelector(`#wrapper-minus`)
    const wrapperCount = node.querySelector(`#wrapper-count`)
    const nestedPlus = node.querySelector(`#nested-plus`)
    const nestedMinus = node.querySelector(`#nested-minus`)
    const nestedCount = node.querySelector(`#nested-count`)

    assert(wrapperCount.innerHTML, `0`)
    assert(nestedCount.innerHTML, `0`)

    wrapperPlus.click()
    wrapperPlus.click()
    wrapperPlus.click()
    wrapperMinus.click()

    assert(wrapperCount.innerHTML, `3`)
    assert(nestedCount.innerHTML, `3`)

    nestedPlus.click()
    nestedPlus.click()
    nestedMinus.click()

    assert(wrapperCount.innerHTML, `3`)
    assert(nestedCount.innerHTML, `4`)

    wrapperMinus.click()

    assert(wrapperCount.innerHTML, `2`)
    assert(nestedCount.innerHTML, `3`)
  })

})
