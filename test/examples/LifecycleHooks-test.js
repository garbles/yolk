/** @jsx Yolk.createElement */

const {render} = Yolk

describe(`Lifecycle hooks`, () => {
  it(`will run code after the component mounts`, (done) => {
    const node = document.createElement(`div`)

    function onMount (event) {
      assert.equal(node.childElementCount, 1)
      assert.equal(event.target.outerHTML, `<strong></strong>`)
      assert.equal(node.outerHTML, `<div><strong></strong></div>`)
      done()
    }

    const component = <strong onMount={onMount} />

    render(component, node)
  })

  it(`will run code when the component unmounts`, (done) => {
    const node = document.createElement(`div`)

    function onUnmount (event) {
      assert.equal(node.childElementCount, 1)
      assert.equal(event.target.outerHTML, `<strong></strong>`)
      assert.equal(node.outerHTML, `<div><b></b></div>`)
      done()
    }

    const component = <strong onUnmount={onUnmount} />
    const otherComponent = <b />

    render(component, node)
    render(otherComponent, node)
  })
})
