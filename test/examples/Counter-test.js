const test = require(`tape`)
const Yolk = require(`yolk`) // eslint-disable-line no-unused-vars
const {h} = Yolk
const renderInDoc = require(`../helpers/renderInDoc`)

function CounterWithJSX () {
  const handlePlus = this.createEventHandler(1)
  const handleMinus = this.createEventHandler(-1)
  const count = handlePlus.merge(handleMinus).scan((x, y) => x + y, 0).startWith(0)

  return (
    <div>
      <button id="plus" onClick={handlePlus}>+ PLUSSS</button>
      <button id="minus" onClick={handleMinus}>- MINUSSS</button>
      <span>{count}</span>
    </div>
  )
}

function CounterWithHyperScript () {
  const handlePlus = this.createEventHandler(1)
  const handleMinus = this.createEventHandler(-1)
  const count = handlePlus.merge(handleMinus).scan((x, y) => x + y, 0).startWith(0)

  return h(`div`, null, [
    h(`button#plus`, {onClick: handlePlus}, `+`, ` PLUSSS`),
    h(`button#minus`, {onClick: handleMinus}, [`-`, ` MINUSSS`]),
    h(`span`, null, count),
  ])
}


function CounterWithDOMHelpers () {
  const {div, button, span} = Yolk.DOM

  const handlePlus = this.createEventHandler(1)
  const handleMinus = this.createEventHandler(-1)
  const count = handlePlus.merge(handleMinus).scan((x, y) => x + y, 0).startWith(0)

  return div(null, [
    button({id: `plus`, onClick: handlePlus}, `+`, ` PLUSSS`),
    button({id: `minus`, onClick: handleMinus}, [`-`, ` MINUSSS`]),
    span(null, count),
  ])
}

function runTests (instance, t) {
  t.plan(11)
  t.timeoutAfter(100)

  const [node, cleanup] = renderInDoc(instance)

  t.equal(node.tagName, `DIV`)
  t.equal(node.children[0].tagName, `BUTTON`)
  t.equal(node.children[0].id, `plus`)
  t.equal(node.children[0].innerHTML, `+ PLUSSS`)
  t.equal(node.children[1].tagName, `BUTTON`)
  t.equal(node.children[1].id, `minus`)
  t.equal(node.children[1].innerHTML, `- MINUSSS`)
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
}

test(`Counter: a simple counter with JSX`, t => {
  runTests(<CounterWithJSX />, t)
})

test(`Counter: a simple counter with hyperscript`, t => {
  runTests(<CounterWithHyperScript />, t)
})

test(`Counter: a simple counter with DOM helpers`, t => {
  runTests(<CounterWithDOMHelpers />, t)
})
