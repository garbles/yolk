/* @flow */

import {Observable} from 'rxjs/Observable'
import {Observer} from 'rxjs/Observer'
import {Subject} from 'rxjs/Subject'
import {Subscription} from 'rxjs/Subscription'
import {isObservable} from '../rx/isObservable'
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject'

import 'rxjs/add/observable/fromArray'
import 'rxjs/add/operator/switchMap'

export const createSubjectTemplate = (obj: Object): Subject<any> => {
}
