const test = require(`tape`)
const Rx = require(`rx`)
const Yolk = require(`yolk`)

test(`disposing of event handlers when a component unmounts`, t => {
  t.plan(8)

  const node = document.createElement(`div`)
  const handlers = []
  const subject1 = new Rx.Subject()
  const subject2 = new Rx.Subject()

  function DisposeEventHandlers () {
    const handler = this.createEventHandler()
    const handler2 = this.createEventHandler()
    handlers.push(handler)
    handlers.push(handler2)

    handler.subscribe(subject1)
    handler.subscribe(subject2)
    handler2.subscribe(subject1)

    return <div />
  }

  Yolk.render(<DisposeEventHandlers />, node)

  t.equal(handlers[0].isDisposed, false)
  t.equal(handlers[0].observers.length, 2)
  t.equal(handlers[1].isDisposed, false)
  t.equal(handlers[1].observers.length, 1)

  Yolk.render(<p />, node)

  t.equal(handlers[0].isDisposed, true)
  t.equal(handlers[0].observers, null)
  t.equal(handlers[1].isDisposed, true)
  t.equal(handlers[0].observers, null)
})
