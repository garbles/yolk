const test = require(`tape`)
const addProperties = require(`addProperties`)

test(`addProperties: extends a base object`, t => {
  t.plan(1)

  const obj1 = {a: 1, b: 2, c: 3}
  const obj2 = {d: 4, e: 5, f: 6}
  const obj3 = {g: 7, b: 100}

  const result = {
    a: 1, b: 100, c: 3,
    d: 4, e: 5, f: 6,
    g: 7
  }

  t.deepEqual(addProperties(obj1, obj2, obj3), result)
})
