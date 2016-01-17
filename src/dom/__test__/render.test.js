import {Observable} from 'rxjs/Observable'
import {renderInDocument} from './support/renderInDocument'
import {h} from '../h'
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject'

import 'rxjs/add/operator/startWith'

describe(`render`, () => {
  it(`renders a virtual node into a container`, () => {
    let mountCallbackCount = 0
    let unmountCallbackCount = 0
    const onMount = () => mountCallbackCount += 1
    const onUnmount = () => unmountCallbackCount += 1
    const width = new BehaviorSubject(55)
    const height = new BehaviorSubject(100)
    const children = new BehaviorSubject([h(`strong`, {onUnmount}), h(`p`, {onUnmount})])

    const vnode = h(`div`, {className: `cool`, onMount}, [
      h(`span`, {width, onMount}),
      h(`div`, {height}, [children]),
    ])

    const {node, cleanup} = renderInDocument(vnode)

    assert.equal(node.tagName, `div`)
    assert.equal(node.className, `cool`)
    assert.equal(node.children.length, 2)
    assert.equal(node.children[0].tagName, `span`)
    assert.equal(node.children[0].width, 55)
    assert.equal(node.children[1].tagName, `div`)
    assert.equal(node.children[1].height, 100)
    assert.equal(node.children[1].children.length, 2)
    assert.equal(node.children[1].children[0].tagName, `strong`)
    assert.equal(node.children[1].children[1].tagName, `p`)


    const otherChildren = new BehaviorSubject(h(`strong`, {onMount}))
    width.next(550)
    height.next(1000)

    const someChild = () => {
      return (
        h(`div`, {onMount}, [otherChildren])
      )
    }

    children.next([h(`p`), h(someChild)])

    assert.equal(node.children[0].width, 550)
    assert.equal(node.children[1].height, 1000)
    assert.equal(node.children[1].children.length, 2)
    assert.equal(node.children[1].children[0].tagName, `p`)
    assert.equal(node.children[1].children[1].tagName, `div`)
    assert.equal(node.children[1].children[1].children.length, 1)
    assert.equal(node.children[1].children[1].children[0].tagName, `strong`)

    assert.equal(mountCallbackCount, 4)
    assert.equal(unmountCallbackCount, 1)

    cleanup()
  })

  it(`renders a component`, () => {
    function C () {
      return Observable.of(h(`span`)).startWith(h(`noscript`))
    }

    const vnode = h(`div`, {}, [h(C, {}, [])])
    const {node, cleanup} = renderInDocument(vnode)

    assert.equal(node.tagName, `div`)
    assert.equal(node.children.length, 1)
    assert.equal(node.children[0].tagName, `span`)

    cleanup()
  })
})
