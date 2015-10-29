const test = require(`tape`)
const Yolk = require(`yolk`)
const evStore = require(`ev-store`)
const renderInDoc = require(`../helpers/renderInDoc`)

test(`disposing of event handlers when a component unmounts`, t => {
  t.plan(8)
  t.timeoutAfter(100)

  const handlers = []

  function DisposeEventHandlers () {
    const handler = this.createEventHandler()
    const handler2 = this.createEventHandler()
    handlers.push(handler)
    handlers.push(handler2)

    return <div onClick={handler} onBlur={handler2} />
  }

  const [node, cleanup] = renderInDoc(<DisposeEventHandlers />)
  const div = node.firstChild

  t.equal(evStore(div).click, handlers[0])
  t.equal(evStore(div).blur, handlers[1])
  t.equal(handlers[0].isDisposed, false)
  t.equal(handlers[1].isDisposed, false)

  Yolk.render(<p />, node)

  t.equal(handlers[0].isDisposed, true)
  t.equal(handlers[0].observers, null)
  t.equal(handlers[1].isDisposed, true)
  t.equal(handlers[0].observers, null)

  cleanup()
})
