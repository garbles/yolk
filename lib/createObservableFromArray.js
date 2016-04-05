'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createObservableFromArray = createObservableFromArray;

var _Observable = require('rxjs/Observable');

var _asObservable = require('./asObservable');

require('rxjs/add/observable/of');

require('rxjs/add/observable/combineLatest');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* @flow */

function createObservableFromArray(arr /*: Array<any>*/) /*: Observable<Array<any>>*/ {
  if (arr.length === 0) {
    return _Observable.Observable.of(arr);
  }

  var observables /*: Array<Observable>*/ = arr.map(_asObservable.asObservable);

  return _Observable.Observable.combineLatest.apply(_Observable.Observable, _toConsumableArray(observables));
}