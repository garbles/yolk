"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Rx = require("rx");
var create = require("virtual-dom/create-element");
var wrapObject = require("./wrapObject");
var YolkCompositeFunctionWrapper = require("./YolkCompositeFunctionWrapper");

function YolkCompositeComponent(fn, props, children) {
  var _props = _extends({}, props);
  var _children = children || [];

  if (_props.key) {
    this.key = _props.key.toString();
    delete _props.key;
  }

  this.name = "YolkCompositeComponent_" + fn.name;
  this.id = fn.name;
  this._fn = fn;
  this._props = _props;
  this._children = _children;
  this._component = null;
}

YolkCompositeComponent.prototype = {
  type: "Widget",

  init: function init() {
    var keys = Object.keys(this._props);
    var length = keys.length;
    var propsSubject = {};
    var i = -1;

    this._propSubject = {};

    while (++i < length) {
      var key = keys[i];
      var value = this._props[key];
      this._propSubject[key] = new Rx.BehaviorSubject(value);
      propsSubject[key] = this._propSubject[key].flatMapLatest(wrapObject);
    }

    this._childSubject = new Rx.BehaviorSubject(this._children);

    var propObservable = propsSubject;
    var childObservable = this._childSubject.asObservable();

    this._component = YolkCompositeFunctionWrapper.create(this._fn, propObservable, childObservable);

    var node = create(this._component._result);
    return node;
  },

  update: function update(previous) {
    this._propSubject = previous._propSubject;
    this._childSubject = previous._childSubject;
    this._component = previous._component;
    this._childSubject.onNext(this._children);

    var keys = Object.keys(this._props);
    var length = keys.length;
    var i = -1;

    while (++i < length) {
      var key = keys[i];
      var value = this._props[key];
      this._propSubject[key].onNext(value || null);
    }
  },

  destroy: function destroy() {
    this._component.destroy();

    var children = this._children;
    var length = children.length;
    var i = -1;

    while (++i < length) {
      var child = children[i];
      isFunction(child.destroy) && child.destroy();
    }
  }
};

module.exports = YolkCompositeComponent;