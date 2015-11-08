"use strict";

var Rx = require("rx");
var wrapObject = require("./wrapObject");

function CompositePropSubject(obj) {
  this._keys = Object.keys(obj);
  this._length = this._keys.length;
  this._obj = {};

  var i = -1;

  while (++i < this._length) {
    var key = this._keys[i];
    var value = obj[key];
    this._obj[key] = new Rx.BehaviorSubject(value);
  }
}

CompositePropSubject.prototype = {
  asSubjectObject: function asSubjectObject() {
    return this._obj;
  },

  asObservableObject: function asObservableObject() {
    var obsObj = {};

    var i = -1;

    while (++i < this._length) {
      var key = this._keys[i];
      var subject = this._obj[key];
      obsObj[key] = subject.flatMapLatest(wrapObject);
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

module.exports = CompositePropSubject;