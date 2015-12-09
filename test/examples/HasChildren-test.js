import { default as test } from 'tape'
import { default as Yolk } from 'yolk' // eslint-disable-line no-unused-vars
import { default as renderInDoc } from '../helpers/renderInDoc'

function HasChildren ({children}) {
  return (
    <div className="wrapper">
      {children}
    </div>
  )
}

test(`HasChildren: renders children`, t => {
  t.plan(4)
  t.timeoutAfter(100)

  const component = (
    <HasChildren>
      <div id="hello" />
    </HasChildren>
  )
  const [node, cleanup] = renderInDoc(component)

  t.equal(node.tagName, `DIV`)
  t.equal(node.className, `wrapper`)
  t.equal(node.firstChild.tagName, `DIV`)
  t.equal(node.firstChild.id, `hello`)

  cleanup()
})

test(`HasChildren: renders deeply nested children`, t => {
  t.plan(10)
  t.timeoutAfter(100)

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

  const [node, cleanup] = renderInDoc(component)

  t.equal(node.tagName, `DIV`)
  t.equal(node.className, `wrapper`)
  t.equal(node.children[0].tagName, `DIV`)
  t.equal(node.children[0].className, `wrapper`)
  t.equal(node.children[0].children[0].tagName, `DIV`)
  t.equal(node.children[0].children[0].id, `hello`)
  t.equal(node.children[0].children[1].tagName, `DIV`)
  t.equal(node.children[0].children[1].className, `wrapper`)
  t.equal(node.children[0].children[1].children[0].tagName, `DIV`)
  t.equal(node.children[0].children[1].children[0].id, `hello`)

  cleanup()
})
