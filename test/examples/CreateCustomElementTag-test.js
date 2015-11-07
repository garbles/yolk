const test = require(`tape`)
const Yolk = require(`yolk`)
const YolkCompositeComponent = require(`YolkCompositeComponent`)

function CreateCustom () {
  return <h1>hello world</h1>
}

Yolk.registerElement(`create-custom`, CreateCustom)

function createInstance () {
  const div = document.createElement(`div`)
  div.innerHTML = `<create-custom height="10"></create-custom>`
  const node = div.firstChild
  document.body.appendChild(node)

  const cleanup = () => document.body.removeChild(node)

  return [node, cleanup]
}

test(`CreateCustomElementTag: creating a custom HTML5 element`, t => {
  t.plan(4)
  t.timeoutAfter(2000)

  const [node, cleanup] = createInstance()

  // document.registerElement polyfill uses setTimeout(fn, 10) if requestAnimationFrame
  // is not present. phantomJS does not use requestionAnimationFrame (?) so timeout for
  // at least one frame
  setTimeout(() => {
    t.equal(node.tagName, `CREATE-CUSTOM`)
    t.equal(node.getAttribute(`height`), `10`)
    t.equal(node.firstChild.tagName, `H1`)
    t.equal(node.firstChild.innerHTML, `hello world`)
    cleanup()
  }, 17)
})

test(`CreateCustomElementTag: changing an attribute of a node should change internal Yolk instance`, t => {
  t.plan(7)
  t.timeoutAfter(2000)

  const [node, cleanup] = createInstance()
  let instance

  setTimeout(() => {
    instance = node.__YOLK_INSTANCE_KEY__
    t.ok(instance instanceof YolkCompositeComponent)
    node.setAttribute(`height`, 500)
  }, 17)


  setTimeout(() => {
    const newInstance = node.__YOLK_INSTANCE_KEY__
    t.ok(newInstance instanceof YolkCompositeComponent)
    t.notEqual(instance, newInstance)
    t.equal(node.tagName, `CREATE-CUSTOM`)
    t.equal(node.getAttribute(`height`), `500`)
    t.equal(node.firstChild.tagName, `H1`)
    t.equal(node.firstChild.innerHTML, `hello world`)
    cleanup()
  }, 17)
})
