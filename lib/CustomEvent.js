"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = global.CustomEvent || (function () {
  var DEFAULT_PARAMS = { bubbles: false, cancelable: false, detail: undefined };

  function CustomEvent(_event, _params) {
    var params = _extends({}, DEFAULT_PARAMS, _params);
    var event = document.createEvent("CustomEvent");

    event.initCustomEvent(_event, params.bubbles, params.cancelable, params.detail);
    return event;
  }

  return CustomEvent;
})();