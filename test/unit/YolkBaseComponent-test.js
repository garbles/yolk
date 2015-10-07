const test = require(`tape`)
const YolkBaseComponent = require(`YolkBaseComponent`)

test(`returns a base component`, t => {
  t.plan(2)

  const instance = new YolkBaseComponent(`p`, {height: 5}, [])
  const node = instance.init()

  t.equal(node.outerHTML, `<p height="5"></p>`)

  const patched = new YolkBaseComponent(`p`, {height: 10}, [`hello`])
  patched.update(instance)

  t.equal(node.outerHTML, `<p height="10">hello</p>`)
})

test(`does not apply new prop keys`, t => {
  t.plan(1)

  const instance = new YolkBaseComponent(`p`, {height: 5}, [])
  const node = instance.init()

  const patched = new YolkBaseComponent(`p`, {width: 10}, [`hello`])
  patched.update(instance)

  t.equal(node.outerHTML, `<p height="null">hello</p>`)
})

test(`listens for mount and umount when defined`, t => {
  t.plan(2)
  t.timeoutAfter(100)

  const instance = new YolkBaseComponent(`p`, {}, [])
  const node = instance.init()

  node.addEventListener(`mount`, () => {
    t.pass(`emits mount event`)
  })

  node.addEventListener(`unmount`, () => {
    t.pass(`emits unmount event`)
  })

  // insert it into the `dom` so that mount fires
  document.body.appendChild(node)

  instance.destroy()
})
