/* @flow */

import {Observable} from 'rxjs/Observable'
import {Observer} from 'rxjs/Observer'
import {Subject} from 'rxjs/Subject'
import {Subscription} from 'rxjs/Subscription'
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject'

import 'rxjs/add/operator/switchMap'

export const createCompositeSubject =
(switchMapFn: Function): Function =>
(value: any): Subject<any> => {
  const behavior: BehaviorSubject = new BehaviorSubject(value)

  const observable: Observable = Observable.create((observer: Observer): Function => {
    const subscription: Subscription = behavior.switchMap(switchMapFn).subscribe(observer)
    return () => subscription.unsubscribe()
  })

  return Subject.create(observable, behavior)
}
