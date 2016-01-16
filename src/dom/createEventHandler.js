/* @flow */

import {Observable} from 'rxjs/Observable'
import {Observer} from 'rxjs/Observer'
import {Subject} from 'rxjs/Subject'
import {Subscription} from 'rxjs/Subscription'
import {ReplaySubject} from 'rxjs/subject/ReplaySubject'
import {isFunction} from '../util/isFunction'
import {isDefined} from '../util/isDefined'

import 'rxjs/add/operator/map'

function wrapMapFn (obs: Subject, mapFn?: any): Observable {
  const mapFnIsDefined: boolean = isDefined(mapFn)
  const mapFnIsFunction: boolean = isFunction(mapFn)

  if (mapFnIsDefined && mapFnIsFunction) {
    return obs.map(mapFn)
  } else if (mapFnIsDefined) {
    return obs.map(() => mapFn)
  }

  return obs
}

export function createEventHandler (mapFn?: any, init?: any): Subject {
  const subject: ReplaySubject = new ReplaySubject(1)

  const observable: Observable = Observable.create((observer: Observer): Function => {
    const subscription: Subscription = wrapMapFn(subject, mapFn).subscribe(observer)

    if (isDefined(init)) {
      observer.next(init)
    }

    return () => subscription.unsubscribe()
  })

  return Subject.create(observable, subject)
}
