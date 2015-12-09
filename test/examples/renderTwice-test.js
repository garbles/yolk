import { default as test } from 'tape'
import { h, render } from 'yolk'
import { default as renderInDoc } from '../helpers/renderInDoc'

function Counter ({createEventHandler, props}) {
  const handlePlus = createEventHandler(() => 1, 0)
  const count = handlePlus.scan((x, y) => x + y, 0).combineLatest(props.count, (a, b) => a + b)

  return (
    <div>
      <button id="plus" onClick={handlePlus}>+</button>
      <span id="count">Count: {count}</span>
    </div>
  )
}

test(`RenderTwice: only updates the props and or children`, t => {
  t.plan(10)

  const component = <Counter count={0} />
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.tagName, `DIV`)
  t.equal(node.children[0].tagName, `BUTTON`)
  t.equal(node.children[0].id, `plus`)
  t.equal(node.children[0].innerHTML, `+`)
  t.equal(node.children[1].tagName, `SPAN`)
  t.equal(node.children[1].innerHTML, `Count: 0`)

  const plus = node.querySelector(`#plus`)
  const count = node.querySelector(`#count`)

  plus.click()
  plus.click()

  t.equal(count.tagName, `SPAN`)
  t.equal(count.innerHTML, `Count: 2`)

  const newComponent = <Counter count={5} />
  render(newComponent, node.parentNode)

  t.equal(count.tagName, `SPAN`)
  t.equal(count.innerHTML, `Count: 7`)

  cleanup()
})
