module.exports = function flatten (arr) {
  const length = arr.length
  let result = []
  let index = -1

  while (++index < length) {
    var member = arr[index]

    if (Array.isArray(member)) {
      result = result.concat(flatten(member))
    } else {
      result.push(member)
    }
  }

  return result
}
