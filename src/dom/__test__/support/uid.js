const TAKEN = {}

export function uid () {
  let result

  do {
    result = Math.floor(Math.random() * 1e9).toString(36)
  }
  while (TAKEN[result])

  TAKEN[result] = true

  return result
}
