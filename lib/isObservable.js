'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObservable;

var _yolk = require('./yolk');

function isObservable(obj) {
  return obj instanceof _yolk.Rx.Observable;
}