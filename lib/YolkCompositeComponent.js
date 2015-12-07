"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Rx = require("rx");
var YolkCompositeFunctionWrapper = require("./YolkCompositeFunctionWrapper");
var CompositePropSubject = require("./CompositePropSubject");

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
    this._props$ = new CompositePropSubject(this._props);
    this._children$ = new Rx.BehaviorSubject(this._children);

    var props$ = this._props$.asObservableObject();
    var children$ = this._children$.asObservable();

    var fn = this._fn;
    this._component = YolkCompositeFunctionWrapper.create(fn, props$, children$);

    return this._component.vNode;
  },
  update: function update(previous) {
    this._props$ = previous._props$;
    this._children$ = previous._children$;
    this._component = previous._component;

    this._props$.onNext(this._props);
    this._children$.onNext(this._children);
  },
  destroy: function destroy() {
    YolkCompositeFunctionWrapper.destroy(this._component);

    var children = this._children;
    var length = children.length;
    var i = -1;

    while (++i < length) {
      var child = children[i];
      isFunction(child.destroy) && child.destroy();
    }
  }
};

YolkCompositeComponent.create = function createInstance(fn, props, children) {
  return new YolkCompositeComponent(fn, props, children);
};

module.exports = YolkCompositeComponent;