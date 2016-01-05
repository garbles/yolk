/* @flow */

import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject'
import {createObservableFromObject} from './createObservableFromObject'
import {createObservableFromArray} from './createObservableFromArray'

import 'rxjs/add/operator/switchMap'

export const createCompositeSubject = (switchMapFn: Function): Function => (value: any): Subject => {
  const behavior: BehaviorSubject = new BehaviorSubject(value)

  const observable = Observable.create(observer => {
    const subscription = behavior.switchMap(switchMapFn).subscribe(observer)
    return () => subscription.unsubscribe()
  })

  return Subject.create(observable, behavior)
}
