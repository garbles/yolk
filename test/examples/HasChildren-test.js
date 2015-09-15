/** @jsx Yolk.createElement */

const {render} = Yolk

function HasChildren (props, children) {
  return (
    <div className="wrapper">
      {children}
    </div>
  )
}

describe(`Passing children as an argument`, () => {
  it(`renders children`, () => {
    const component = (
      <HasChildren>
        <div id="hello" />
      </HasChildren>
    )
    const node = document.createElement(`div`)
    render(component, node)

    assert.equal(node.innerHTML, `<div class="wrapper"><div id="hello"></div></div>`)
  })

  it(`renders deeply nested children`, () => {
    const component = (
      <HasChildren>
        <HasChildren>
          <div id="hello" />
          <HasChildren>
            <div id="hello" />
          </HasChildren>
        </HasChildren>
      </HasChildren>
    )
    const node = document.createElement(`div`)
    render(component, node)

    assert.equal(node.innerHTML, `<div class="wrapper"><div class="wrapper"><div id="hello"></div><div class="wrapper"><div id="hello"></div></div></div></div>`)
  })
})
