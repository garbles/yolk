const Rx = require(`rx`)
const test = require(`tape`)
const Yolk = require(`yolk`)
const renderInDoc = require(`../helpers/renderInDoc`)

test(`YolkCustomComponent: a component that has livecycle hooks`, t => {
  t.plan(3)
  t.timeoutAfter(100)

  class CustomOnlyMount extends Yolk.CustomComponent {
    onMount (props, node) {
      const className = props.className.join(` `)
      node.setAttribute(`class`, className)
    }

    onUpdate (props, node) {
      const className = props.className.join(` `)
      node.setAttribute(`class`, className)
    }

    onUnmount () {
      t.pass(`custom component unmounts`)
    }
  }

  const names = new Rx.BehaviorSubject([`a`, `b`, `c`, `d`])

  const instance = <CustomOnlyMount className={names}><p /></CustomOnlyMount>
  const [node, cleanup] = renderInDoc(instance)

  t.equal(node.innerHTML, `<p class="a b c d"></p>`)

  names.onNext([`e`, `ee`, `eee`, `eeee`])

  t.equal(node.innerHTML, `<p class="e ee eee eeee"></p>`)

  Yolk.render(<div />, node)

  cleanup()
})

test(`YolkCustomComponent: should raise when there is more than one child`, t => {
  class CC extends Yolk.CustomComponent {}

  t.plan(6)
  t.timeoutAfter(100)

  t.throws(() => <CC><p /><p /></CC>)
  t.throws(() => <CC><p><p /></p><p /></CC>)
  t.doesNotThrow(() => <CC><p /></CC>)
  t.doesNotThrow(() => <CC><p><p /></p></CC>)
  t.doesNotThrow(() => <CC><p><p /><p /></p></CC>)
  t.doesNotThrow(() => <CC />)
})
