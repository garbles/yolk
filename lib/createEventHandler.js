'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEventHandler = createEventHandler;

var _Observable = require('rxjs/Observable');

var _Observer = require('rxjs/Observer');

var _Subject = require('rxjs/Subject');

var _Subscription = require('rxjs/Subscription');

var _is = require('./is');

require('rxjs/add/operator/map');

require('rxjs/add/operator/mapTo');

require('rxjs/add/operator/share');

/* @flow */

function wrapMapFn(obs /*: Subject*/, mapFn /*:: ?: any*/) /*: Observable*/ {
  var mapFnIsDefined /*: boolean*/ = (0, _is.isDefined)(mapFn);
  var mapFnIsFunction /*: boolean*/ = (0, _is.isFunction)(mapFn);

  if (mapFnIsDefined && mapFnIsFunction) {
    return obs.map(mapFn);
  } else if (mapFnIsDefined) {
    return obs.mapTo(mapFn);
  }

  return obs;
}

function createEventHandler(mapFn /*:: ?: any*/, init /*:: ?: any*/) /*: Subject*/ {
  var subject /*: Subject*/ = new _Subject.Subject();

  var observable /*: Observable*/ = _Observable.Observable.create(function (observer /*: Observer*/) /*: Function*/ {
    var subscription /*: Subscription*/ = wrapMapFn(subject, mapFn).subscribe(observer);

    if ((0, _is.isDefined)(init)) {
      observer.next(init);
    }

    return function () {
      subscription.unsubscribe();
    };
  });

  return _Subject.Subject.create(subject, observable.share());
}