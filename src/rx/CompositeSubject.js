/* @flow */

import {Subject} from 'rxjs/Subject'
import {Subscriber} from 'rxjs/Subscriber'
import {Subscription} from 'rxjs/Subscription'
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject'
import {createObservableFromObject} from './createObservableFromObject'
import {createObservableFromArray} from './createObservableFromArray'

import 'rxjs/add/operator/switchMap'

export class CompositeSubject extends Subject {
  _inner: BehaviorSubject;
  _value: any;

  constructor (value: Object, scopeInnerSubjectFn: Function) {
    super()

    const inner = this._inner = new BehaviorSubject(value)
    const scoped = scopeInnerSubjectFn(inner)

    scoped.subscribe(
      this._innerNext.bind(this),
      this._innerError.bind(this),
      this._innerComplete.bind(this)
    )
  }

  _innerNext (value: Object): void {
    Subject.prototype._next.call(this, this._value = value)
  }

  _innerError (err: Error): void {
    Subject.prototype._error.call(this, err)
  }

  _innerComplete (): void {
    Subject.prototype._complete.call(this)
  }

  _next (value: Object): void {
    this._inner.next(value)
  }

  _subscribe (subscriber: Subscriber): Subscription | Function | void {
    const subscription = Subject.prototype._subscribe.call(this, subscriber)
    if (subscription && !subscription.isUnsubscribed) {
      subscriber.next(this._value)
    }
    return subscription
  }

  unsubscribe (): void {
    Subject.prototype.unsubscribe.call(this)
    this._inner.unsubscribe()
  }

  complete (): void {
    Subject.prototype.complete.call(this)
    this._inner.complete()
  }
}

CompositeSubject.fromObject = (value: any): CompositeSubject => {
  const scopeFn = sub => sub.switchMap(createObservableFromObject)

  return new CompositeSubject(value, scopeFn)
}

CompositeSubject.fromArray = (value: any): CompositeSubject => {
  const scopeFn = sub => sub.switchMap(createObservableFromArray)

  return new CompositeSubject(value, scopeFn)
}

