'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDefined = isDefined;
exports.isEmptyObject = isEmptyObject;
exports.isFunction = isFunction;
exports.isNumber = isNumber;
exports.isObservable = isObservable;
exports.isString = isString;
exports.isSubject = isSubject;
exports.isVirtual = isVirtual;

var _Observable = require('rxjs/Observable');

var _Subject = require('rxjs/Subject');

var _symbol = require('./symbol');

function isDefined(obj /*: any*/) /*: boolean*/ {
  return typeof obj !== 'undefined';
} /* @flow */

function isEmptyObject(obj /*: any*/) /*: boolean*/ {
  return Object.keys(obj).length === 0;
}

function isFunction(obj /*: any*/) /*: boolean*/ {
  return Object.prototype.toString.call(obj) === '[object Function]';
}

function isNumber(obj /*: any*/) /*: boolean*/ {
  return typeof obj === 'number';
}

function isObservable(obj /*: any*/) /*: boolean*/ {
  return obj instanceof _Observable.Observable;
}

function isString(obj /*: any*/) /*: boolean*/ {
  return typeof obj === 'string';
}

function isSubject(obj /*: any*/) /*: boolean*/ {
  return obj instanceof _Subject.Subject;
}

function isVirtual(obj /*: any*/) /*: boolean*/ {
  return !!obj && obj[_symbol.$$virtual];
}