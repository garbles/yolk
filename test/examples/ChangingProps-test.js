/** @jsx createElement */

const {Rx, createElement, createEventHandler, render} = Yolk

function HasChildren (props) {
  return <div>{props.child}</div>
}

describe(`when a changed element changes it's list of properties instead of just the values`, () => {
  it(`should rerender accordingly`, () => {
    const child = new Rx.BehaviorSubject(<span>Hello!</span>)
    const component = <HasChildren child={child}/>
    const node = document.createElement(`div`)
    render(component, node)

    assert.equal(node.innerHTML, `<div><span>Hello!</span></div>`)

    child.onNext(<span className="stub">Goodbye</span>)

    assert.equal(node.innerHTML, `<div><span class="stub">Goodbye</span></div>`)
  })
})
