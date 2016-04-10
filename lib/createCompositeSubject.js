'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCompositeSubject = undefined;

var _Observable = require('rxjs/Observable');

var _Observer = require('rxjs/Observer');

var _Subject = require('rxjs/Subject');

var _Subscription = require('rxjs/Subscription');

var _BehaviorSubject = require('rxjs/subject/BehaviorSubject');

require('rxjs/add/operator/switchMap');

/* @flow */

var createCompositeSubject = exports.createCompositeSubject = function createCompositeSubject(switchMapFn /*: Function*/) /*: Function*/ {
  return function (value /*: any*/) /*: Subject<any>*/ {
    var behavior /*: BehaviorSubject*/ = new _BehaviorSubject.BehaviorSubject(value);

    var observable /*: Observable*/ = _Observable.Observable.create(function (observer /*: Observer*/) /*: Function*/ {
      var subscription /*: Subscription*/ = behavior.switchMap(switchMapFn).subscribe(observer);
      return function () {
        return subscription.unsubscribe();
      };
    });

    return _Subject.Subject.create(behavior, observable);
  };
};