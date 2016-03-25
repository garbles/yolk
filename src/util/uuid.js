const cache = {}

const generate = () => parseInt(Math.random() * 1e15, 10).toString(36)

export function uuid () {
  let result = generate()

  while (cache[result]) {
    result = generate()
  }

  return result
}
