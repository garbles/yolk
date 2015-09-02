module.exports = function flatten (arr) {
  let result = []
  let index = -1
  const length = arr.length

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
