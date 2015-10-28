const test = require(`tape`)
const evStore = require(`ev-store`)
const EventHook = require(`EventHook`)

test(`EventHook: adds a listener to the event store`, t => {
  t.plan(2)
  t.timeoutAfter(100)

  const stubNode = {}
  const value = () => {}
  const eventHook = new EventHook(value)

  eventHook.hook(stubNode, `onEvent`)
  eventHook.hook(stubNode, `onOther`)

  t.deepEqual(evStore(stubNode), {event: value, other: value})

  eventHook.unhook(stubNode, `onEvent`)
  eventHook.unhook(stubNode, `onOther`)

  t.deepEqual(evStore(stubNode), {event: undefined, other: undefined})
})
