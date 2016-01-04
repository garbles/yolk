/* @flow */

export function flatten (arr: Array<any>): Array<any> {
  const len = arr.length
  let i = -1
  let result = []

  while (++i < len) {
    const member = arr[i]

    if (Array.isArray(member)) {
      result = result.concat(flatten(member))
    } else {
      result.push(member)
    }
  }

  return result
}
