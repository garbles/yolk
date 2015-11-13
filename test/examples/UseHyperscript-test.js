const test = require(`tape`)
const Yolk = require(`yolk`)
const {h} = Yolk
const renderInDoc = require(`../helpers/renderInDoc`)

test(`UseHyperscript: rendering components using hyperscript helper`, t => {
  t.plan(10)
  t.timeoutAfter(100)

  function Baby () {
    return h(`.a.b.c.d#e`, null, h(`strong`))
  }

  function Child () {
    return <span><Baby /></span>
  }

  function Component () {
    return h(`div.some-class.some-other-class#some-id`, {
      height: 500,
      style: {color: `red`},
    }, h(Child))
  }

  const [node, cleanup] = renderInDoc(h(Component))

  t.equal(node.tagName, `DIV`)
  t.equal(node.id, `some-id`)
  t.equal(node.className, `some-class some-other-class`)
  t.equal(node.getAttribute(`height`), `500`)
  t.equal(node.style.color, `red`)
  t.equal(node.firstChild.tagName, `SPAN`)
  t.equal(node.firstChild.firstChild.tagName, `DIV`)
  t.equal(node.firstChild.firstChild.className, `a b c d`)
  t.equal(node.firstChild.firstChild.id, `e`)
  t.equal(node.firstChild.firstChild.firstChild.tagName, `STRONG`)

  cleanup()
})
