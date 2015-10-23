const test = require(`tape`)
const mountable = require(`mountable`)

test.only(`mounting and unmounting an instance`, t => {
  t.plan(2)
  t.timeoutAfter(100)

  const node = document.createElement(`div`)
  const onMount = () => t.pass(`emits mount event`)
  const onUnmount = () => t.pass(`emits unmount event`)

  node.addEventListener(`mount`, onMount)

  document.body.appendChild(node)

  mountable.emitMount(node, onMount)
  mountable.emitUnmount(node, onUnmount)

  setTimeout(() => {
    node.removeEventListener(`mount`, onMount)
    node.removeEventListener(`unmount`, onUnmount)
    document.body.removeChild(node)
  }, 0)
})
