const test = require(`tape`)
const createErrorClass = require(`../../lib/createErrorClass`)

test(`creating custom error classes`, t => {
  t.plan(4)

  const StubError = createErrorClass(`StubError`)

  try {
    throw new StubError(`this is an error`)
  } catch (err) {
    t.equal(err.constructor, StubError)
    t.equal(err.constructor.name, `StubError`)
    t.equal(err.message, `this is an error`)
    t.equal(err.name, `StubError`)
  }
})
