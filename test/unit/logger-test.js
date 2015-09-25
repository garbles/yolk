const test = require(`tape`)
const logger = require(`../../lib/logger`)

test(`throw exceptions on falsy conditions with logger`, t => {
  t.plan(3)

  const someErrorWrapper = logger(`this is an error`)

  t.throws(() => someErrorWrapper(false), /this is an error/)
  t.throws(() => someErrorWrapper(false, `and you should be sad`), /this is an error and you should be sad/)
  t.doesNotThrow(() => someErrorWrapper(true))
})
