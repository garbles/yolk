/* @flow */

import {flatten} from '../flatten'

describe(`flatten`, () => {
  it(`flattens arrays`, () => {
    const desired = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const wat1 = [[1, 2, 3, 4, 5, 6, 7, 8], 9, 10, 11, 12]
    const wat2 = [[1, 2, 3, 4, 5, [6, [7], 8, 9], 10], 11, 12]
    const wat3 = [[1, 2, 3], 4, [5, 6, 7, 8], 9, [[], 10, 11, [12]]]
    const wat4 = [[1, 2], 3, 4, [5, 6, 7, 8], [9, 10], [11,  [],  [],  []], 12]
    const wat5 = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]]

    assert.deepEqual(desired, flatten(wat1))
    assert.deepEqual(desired, flatten(wat2))
    assert.deepEqual(desired, flatten(wat3))
    assert.deepEqual(desired, flatten(wat4))
    assert.deepEqual(desired, flatten(wat5))
  })
})
