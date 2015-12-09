import { default as isDefined } from './isDefined'

export default function compact (arr) {
  const length = arr.length
  const newArr = []
  let i = -1

  while (++i < length) {
    const value = arr[i]
    if (isDefined(value) && value !== false) {
      newArr.push(value)
    }
  }

  return newArr
}
