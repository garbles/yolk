import { default as test } from 'tape'
import { default as flatten } from 'flatten'

test(`flatten: makes nested arrays flat`,  t => {
  t.plan(4)
  t.timeoutAfter(100)

  const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  const arr1 = [1, 2, [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 13, 14, 15, 16]
  const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, []]
  const arr3 = [1, 2, 3, 4, 5, [6, 7, [8, 9, 10, [11, [12]]], 13], 14, 15, 16]
  const arr4 = [1, [2, 3, 4, 5, 6], [7, 8, 9, 10, 11], [12, 13, 14, 15, 16]]

  t.deepEqual(result, flatten(arr1))
  t.deepEqual(result, flatten(arr2))
  t.deepEqual(result, flatten(arr3))
  t.deepEqual(result, flatten(arr4))
})
