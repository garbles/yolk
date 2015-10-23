const test = require(`tape`)
const Yolk = require(`yolk`)
const renderInDoc = require(`../helpers/renderInDoc`)

function Counter (props) {
  const handlePlus = this.createEventHandler(() => 1, 0)
  const count = handlePlus.scan((x, y) => x + y, 0).combineLatest(props.count, (a, b) => a + b)

  return (
    <div>
      <button id="plus" onClick={handlePlus}>+</button>
      <span>Count: {count}</span>
    </div>
  )
}

test(`only updates the props and or children`, t => {
  t.plan(3)

  const component = <Counter count={0} />
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.innerHTML, `<div><button id="plus">+</button><span>Count: 0</span></div>`)

  const plus = node.querySelector(`#plus`)

  plus.click()
  plus.click()

  t.equal(node.innerHTML, `<div><button id="plus">+</button><span>Count: 2</span></div>`)

  const newComponent = <Counter count={5} />
  Yolk.render(newComponent, node)

  t.equal(node.innerHTML, `<div><button id="plus">+</button><span>Count: 7</span></div>`)

  cleanup()
})
