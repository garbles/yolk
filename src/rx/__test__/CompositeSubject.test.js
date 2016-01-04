/* @flow */

import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject'
import {CompositeSubject} from '../CompositeSubject'

import 'rxjs/add/operator/skip'

describe(`CompositeSubject`, () => {
  it(`ends subscriptions`, () => {
    const subject = CompositeSubject.fromObject({hidden: true})

    subject.subscribe()

    assert.equal(subject.isUnsubscribed, false)
    assert.equal(subject.observers.length, 1)

    subject.unsubscribe()

    assert.equal(subject.isUnsubscribed, true)
  })

  it(`does not propegate values after it has been unsubscribed`, () => {
    const hidden = new BehaviorSubject(true)
    const subject = CompositeSubject.fromObject({hidden})
    const error = new Error(`ER MER GERD!`)

    subject.skip(1).subscribe(() => {throw error})

    assert.throws(() => hidden.next(false))
    subject.unsubscribe()
    assert.doesNotThrow(() => hidden.next(true), error)
  })

  describe(`.fromObject`, () => {
    it(`creates a subject that unwraps an object of observables`, done => {
      const height = new BehaviorSubject(12)
      const hidden = new BehaviorSubject(true)
      const className = `gabe gabe gabe`
      const subject = CompositeSubject.fromObject({height, hidden, className})

      subject.subscribe(props => {
        assert.equal(props.height, 12)
        assert.equal(props.hidden, true)
        assert.equal(props.className, `gabe gabe gabe`)
        done()
      })
    })
  })

  describe(`.fromArray`, () => {
    it(`creates a subject that unwraps an array of observables`, done => {
      const height = new BehaviorSubject(12)
      const hidden = new BehaviorSubject(true)
      const className = `gabe gabe gabe`
      const subject = CompositeSubject.fromArray([height, hidden, className])

      subject.subscribe(props => {
        assert.equal(props[0], 12)
        assert.equal(props[1], true)
        assert.equal(props[2], `gabe gabe gabe`)
        done()
      })
    })
  })
})

