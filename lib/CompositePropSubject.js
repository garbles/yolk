'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CompositePropSubject;

var _yolk = require('./yolk');

function CompositePropSubject(obj) {
  this._keys = Object.keys(obj);
  this._length = this._keys.length;
  this._obj = {};

  var i = -1;

  while (++i < this._length) {
    var key = this._keys[i];
    var value = obj[key];
    this._obj[key] = new _yolk.Rx.BehaviorSubject(value);
  }
}

CompositePropSubject.prototype = {
  asSubjectObject: function asSubjectObject() {
    return this._obj;
  },
  asDistinctObservableObject: function asDistinctObservableObject() {
    var obsObj = {};

    var i = -1;

    while (++i < this._length) {
      var key = this._keys[i];
      var subject = this._obj[key];
      obsObj[key] = subject.flatMapLatest(function (v) {
        return (0, _yolk.wrapObject)(v, { base: false });
      }).distinctUntilChanged(); // eslint-disable-line no-loop-func
    }

    return obsObj;
  },
  asObservableObject: function asObservableObject() {
    var obsObj = {};

    var i = -1;

    while (++i < this._length) {
      var key = this._keys[i];
      var subject = this._obj[key];
      obsObj[key] = subject.flatMapLatest(function (v) {
        return (0, _yolk.wrapObject)(v, { base: false });
      }); // eslint-disable-line no-loop-func
    }

    return obsObj;
  },
  onNext: function onNext(obj) {
    var i = -1;

    while (++i < this._length) {
      var key = this._keys[i];
      var value = obj[key];
      this._obj[key].onNext(value || null);
    }
  },
  dispose: function dispose() {
    var i = -1;

    while (++i < this._length) {
      var key = this._keys[i];
      this._obj[key].dispose();
    }
  }
};