'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asObservable = asObservable;

var _Observable = require('rxjs/Observable');

var _is = require('./is');

require('rxjs/add/observable/of');

function asObservable(obj /*: any*/) /*: Observable<any>*/ {
  if ((0, _is.isObservable)(obj)) {
    return obj;
  }

  return _Observable.Observable.of(obj);
} /* @flow */