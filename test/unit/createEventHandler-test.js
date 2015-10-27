const test = require(`tape`)
const createEventHandler = require(`createEventHandler`)

test(`createEventHandler: without any arguments`, t => {
  t.plan(1)
  t.timeoutAfter(100)

  const handler = createEventHandler()
  const val = Math.random()


  const disposable = handler.subscribe(_val => t.equal(val, _val))

  handler(val)

  disposable.dispose()
})

test(`createEventHandler: with a value as the first arg`, t => {
  t.plan(2)
  t.timeoutAfter(100)

  const val = Math.random()
  const handler = createEventHandler(val)

  const disposable = handler.subscribe(_val => t.equal(val, _val))

  handler(Math.random())
  handler(Math.random())

  disposable.dispose()
})

test(`createEventHandler: with a function as the first arg`, t => {
  t.plan(1)
  t.timeoutAfter(100)

  const handler = createEventHandler((val) => val + 2)
  const val = Math.random()

  const disposable = handler.subscribe(_val => t.equal(val + 2, _val))

  handler(val)

  disposable.dispose()
})

test(`createEventHandler: with both arguments defined`, t => {
  t.plan(2)
  t.timeoutAfter(100)

  const init = Math.random()
  const val = Math.random()
  const handler = createEventHandler((_val) => _val + 2, init)

  const disposable = handler.subscribe(_val => t.equal(init, _val))

  disposable.dispose()

  handler(val)

  const disposable2 = handler.subscribe(_val => t.equal(val + 2, _val))

  disposable2.dispose()
})
