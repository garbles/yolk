const test = require(`tape`)
const mountable = require(`mountable`)

test(`mounting and unmounting and instance`, t => {
  t.plan(2)
  t.timeoutAfter(100)

  const node = document.createElement(`div`)
  const parent = document.createElement(`div`)
  const onMount = () => t.pass(`emits mount event`)
  const onUnmount = () => t.pass(`emits unmount event`)

  node.addEventListener(`mount`, onMount)
  node.addEventListener(`unmount`, onUnmount)
  parent.appendChild(node)

  mountable.emitMount(node)
  mountable.emitUnmount(node, {onMount, onUnmount})
})
