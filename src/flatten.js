/* @flow */

export function flatten (arr: Array<any>): Array<any> {
  const len: number = arr.length
  let i: number = -1
  let result: Array<any> = []

  while (++i < len) {
    const member: any = arr[i]

    if (Array.isArray(member)) {
      result = result.concat(flatten(member))
    } else {
      result.push(member)
    }
  }

  return result
}
