const test = require(`tape`)
const mountable = require(`mountable`)

test(`mountable: mounting and unmounting an instance`, t => {
  t.plan(2)
  t.timeoutAfter(100)

  const node = document.createElement(`div`)
  const handler = () => t.pass(`emits event`)

  node.addEventListener(`mount`, handler)
  node.addEventListener(`unmount`, handler)

  document.body.appendChild(node)

  mountable.emitMount(node, handler)
  mountable.emitUnmount(node, handler)

  setTimeout(() => {
    node.removeEventListener(`mount`, handler)
    node.removeEventListener(`unmount`, handler)
    document.body.removeChild(node)
  }, 0)
})
