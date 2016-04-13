'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createComponentProps = createComponentProps;

var _BehaviorSubject = require('rxjs/BehaviorSubject');

var _is = require('./is');

/* @flow */

/*:: type ComponentProps = {
  asObject (): Object,
  next (v: Object): void,
}*/
function createComponentProps(_props /*: Object*/) /*: ComponentProps*/ {
  var keys /*: Array<string>*/ = Object.keys(_props);
  var plainValueKeys /*: Object*/ = {};

  var props /*: Object*/ = {};
  var len /*: number*/ = keys.length;
  var i /*: number*/ = -1;

  while (++i < len) {
    var key = keys[i];
    var value = _props[key];

    if ((0, _is.isObservable)(value)) {
      props[key] = value;
    } else {
      plainValueKeys[key] = true;
      props[key] = new _BehaviorSubject.BehaviorSubject(value);
    }
  }

  return {
    asObject: function asObject() {
      return props;
    },
    next: function (_next) {
      function next(_x) {
        return _next.apply(this, arguments);
      }

      next.toString = function () {
        return _next.toString();
      };

      return next;
    }(function (next /*: Object*/) {
      var j /*: number*/ = -1;

      while (++j < len) {
        var _key /*: string*/ = keys[j];
        var _value /*: any*/ = next[_key];
        var old /*: any*/ = props[_key];

        if (plainValueKeys[_key]) {
          old.next(_value);
        } else if (_value !== old) {
          throw new Error('Observable prop "' + _key + '" changed to different observable');
        }
      }
    })
  };
}