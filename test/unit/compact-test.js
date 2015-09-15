const compact = require(`../../lib/compact`)

describe(`compact`, () => {
  it('compacts arrays', () => {
    const a = ''
    const b = function () {}
    const c = 123
    const d = false
    const e = 0
    const f = {}
    const g = null
    const h = undefined

    const arr = [a,b,c,d,e,f,g,h]
    const compacted = [a,b,c,e,f]

    assert.deepEqual(compact(arr), compacted)
  })
})
