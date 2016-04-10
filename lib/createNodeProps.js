'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNodeProps = createNodeProps;

var _Observable = require('rxjs/Observable');

var _eventsList = require('./eventsList');

var _asObservable = require('./asObservable');

var _is = require('./is');

require('rxjs/add/observable/of');

require('rxjs/add/observable/combineLatest');

/* @flow */

var wrapValue = function wrapValue(key, value) {
  if (_eventsList.eventListMap[key] && (0, _is.isSubject)(value)) {
    return (0, _asObservable.asObservable)(value.next.bind(value));
  }

  return (0, _asObservable.asObservable)(value);
};

function createNodeProps(obj /*: Object*/) /*: Observable<Object>*/ {
  if ((0, _is.isEmptyObject)(obj)) {
    return _Observable.Observable.of(obj);
  }

  var keys /*: Array<string>*/ = Object.keys(obj);
  var len /*: number*/ = keys.length;
  var values /*: Array<Observable>*/ = Array(len);
  var i /*: number*/ = -1;

  while (++i < len) {
    var key /*: string*/ = keys[i];
    var value /*: any*/ = obj[key];
    values[i] = wrapValue(key, value);
  }

  return _Observable.Observable.combineLatest(values, function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var newObj /*: Object*/ = {};
    i = -1;

    while (++i < len) {
      var _key2 /*: string*/ = keys[i];
      newObj[_key2] = args[i];
    }

    return newObj;
  });
}