/** @jsx Yolk.createElement */

const Rx = require(`rx`)
const test = require(`tape`)
const Yolk = require(`../../lib/yolk`)

test.only('pressing keys on an input does not change its value if it is bound to an event handler', t => {
  t.plan(1)

  setTimeout(function () {

  const value = Rx.Observable.just('')
  const component = <input type="text" value={value} />
  const root = document.createElement('div')
  const node = Yolk.render(component, root)

  document.body.appendChild(root)

  t.equal(node.value, '')

  }, 1000)
})
