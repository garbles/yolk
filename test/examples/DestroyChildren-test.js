/** @jsx createElement */

const createElement = require(`createElement`)
const createEventHandler = require(`createEventHandler`)
const YolkBaseComponent = require(`YolkBaseComponent`)
const render = require(`render`)

function DestroyChildren () {
  const handleClick = createEventHandler()
  const children = handleClick.scan(acc => acc.slice(1), [<p />, <p />, <p />, <p />, <p />])

  children.subscribe(a => console.log(a.length))

  return (
    <div id="clickme" onclick={handleClick}>
      {children}
    </div>
  )
}

describe(`destroying children`, () => {

  it(`throws them into an object pool`, () => {
    const component = <DestroyChildren />
    const node = document.createElement(`div`)
    render(component, node)

    const destroyer = node.querySelector(`#clickme`)

    assert.equal(node.innerHTML, `<div id="clickme"><p></p><p></p><p></p><p></p></div>`)

    destroyer.click()

    assert.equal(node.innerHTML, `<div id="clickme"><p></p><p></p><p></p></div>`)

    destroyer.click()
    destroyer.click()

    assert.equal(node.innerHTML, `<div id="clickme"><p></p></div>`)

  })

})
