const isDefined = require(`./isDefined`)

module.exports = function compact (arr) {
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
