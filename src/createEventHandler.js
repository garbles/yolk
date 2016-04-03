/* @flow */

import {Observable} from 'rxjs/Observable'
import {Observer} from 'rxjs/Observer'
import {Subject} from 'rxjs/Subject'
import {Subscription} from 'rxjs/Subscription'

import {isFunction} from './isFunction'
import {isDefined} from './isDefined'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/share'

function wrapMapFn (obs: Subject, mapFn?: any): Observable {
  const mapFnIsDefined: boolean = isDefined(mapFn)
  const mapFnIsFunction: boolean = isFunction(mapFn)

  if (mapFnIsDefined && mapFnIsFunction) {
    return obs.map(mapFn)
  } else if (mapFnIsDefined) {
    return obs.mapTo(mapFn)
  }

  return obs
}

export function createEventHandler (mapFn?: any, init?: any): Subject {
  const subject: Subject = new Subject()

  const observable: Observable = Observable.create((observer: Observer): Function => {
    const subscription: Subscription = wrapMapFn(subject, mapFn).subscribe(observer)

    if (isDefined(init)) {
      observer.next(init)
    }

    return () => {
      subscription.unsubscribe()
    }
  })

  return Subject.create(subject, observable.share())
}
