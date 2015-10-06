"use strict";

var Rx = require("rx");
var isDefined = require("./isDefined");
var isFunction = require("./isFunction");
var addProperties = require("./addProperties");

module.exports = function createEventHandler(mapFn, init) {
  var initIsDefined = isDefined(init);
  var mapFnIsDefined = isDefined(mapFn);
  var mapFnIsFunction = isFunction(mapFn);
  var handler = undefined;

  if (mapFnIsDefined && mapFnIsFunction) {
    handler = function handlerWithFunctionMap(value) {
      handler.onNext(mapFn(value));
    };
  } else if (mapFnIsDefined) {
    handler = function handlerWithValueMap() {
      handler.onNext(mapFn);
    };
  } else {
    handler = function handlerWithoutMap(value) {
      handler.onNext(value);
    };
  }

  addProperties(handler, Rx.ReplaySubject.prototype);
  Rx.ReplaySubject.call(handler, 1);

  if (initIsDefined) {
    handler.onNext(init);
  }

  return handler;
};