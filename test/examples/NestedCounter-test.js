const test = require(`tape`)
const Yolk = require(`yolk`)
const renderInDoc = require(`../helpers/renderInDoc`)

function NestedCounter (props) {
  const handlePlus = this.createEventHandler(() => 1, 0)
  const handleMinus = this.createEventHandler(() => -1, 0)
  const count =
    handlePlus.merge(handleMinus)
    .scan((acc, next) => acc + next, 0)
    .combineLatest(props.count, (a, b) => a + b)

  return (
    <div>
      <div>
        <button id="nested-plus" onClick={handlePlus}>+</button>
        <button id="nested-minus" onClick={handleMinus}>-</button>
      </div>
      <div id="nested-count">
        {count}
      </div>
    </div>
  )
}

function Counter () {
  const handlePlus = this.createEventHandler(() => 1, 0)
  const handleMinus = this.createEventHandler(() => -1, 0)
  const count = handlePlus.merge(handleMinus).scan((acc, next) => acc + next, 0)

  return (
    <div>
      <div>
        <button id="wrapper-plus" onClick={handlePlus}>+</button>
        <button id="wrapper-minus" onClick={handleMinus}>-</button>
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

test(`increments and decrements a wrapper counter and a nested child`, t => {
  t.plan(8)

  const component = <Counter />
  const [node, cleanup] = renderInDoc(component)

  const wrapperPlus = node.querySelector(`#wrapper-plus`)
  const wrapperMinus = node.querySelector(`#wrapper-minus`)
  const wrapperCount = node.querySelector(`#wrapper-count`)
  const nestedPlus = node.querySelector(`#nested-plus`)
  const nestedMinus = node.querySelector(`#nested-minus`)
  const nestedCount = node.querySelector(`#nested-count`)

  t.equal(wrapperCount.innerHTML, `0`)
  t.equal(nestedCount.innerHTML, `0`)

  wrapperPlus.click()
  wrapperPlus.click()
  wrapperPlus.click()
  wrapperMinus.click()

  t.equal(wrapperCount.innerHTML, `2`)
  t.equal(nestedCount.innerHTML, `2`)

  nestedPlus.click()
  nestedPlus.click()
  nestedMinus.click()

  t.equal(wrapperCount.innerHTML, `2`)
  t.equal(nestedCount.innerHTML, `3`)

  wrapperMinus.click()

  t.equal(wrapperCount.innerHTML, `1`)
  t.equal(nestedCount.innerHTML, `2`)

  cleanup()
})
