"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Rx = require("rx");
var create = require("virtual-dom/create-element");
var diff = require("virtual-dom/diff");
var h = require("virtual-dom/h");
var patch = require("virtual-dom/patch");
var wrapObject = require("./wrapObject");
var transformProperties = require("./transformProperties");
var isFunction = require("./isFunction");
var flatten = require("./flatten");
var mountable = require("./mountable");

function YolkBaseComponent(tag, props, children) {
  var _props = _extends({}, props);
  var _children = children || [];

  if (_props.key) {
    this.key = _props.key.toString();
    delete _props.key;
  }

  this.id = tag;
  this._props = _props;
  this._children = _children;
}

YolkBaseComponent.prototype = {
  name: "YolkBaseComponent",
  type: "Widget",

  init: function init() {
    var _this = this;

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

    var propObservable = wrapObject(propsSubject, { wrapToJS: true }).map(transformProperties);
    var childObservable = this._childSubject.flatMapLatest(function (c) {
      return wrapObject(c, { wrapToJS: true });
    });

    var vNode = h(this.id);
    this.node = create(vNode);

    this._patchSubscription = Rx.Observable.combineLatest(propObservable, childObservable, function (p, c) {
      return h(_this.id, p, flatten(c));
    }).scan(function (_ref, next) {
      var _ref2 = _slicedToArray(_ref, 1);

      var old = _ref2[0];
      return [next, diff(old, next)];
    }, [vNode, null]).subscribe(function (_ref3) {
      var _ref32 = _slicedToArray(_ref3, 2);

      var __ = _ref32[0];
      var patches = _ref32[1];
      return patch(_this.node, patches);
    }, function (err) {
      throw new Error(err.message);
    });

    mountable.emitMount(this.node);

    return this.node;
  },

  update: function update(previous) {
    this._propSubject = previous._propSubject;
    this._childSubject = previous._childSubject;
    this._patchSubscription = previous._patchSubscription;
    this._childSubject.onNext(this._children);

    var keys = Object.keys(previous._props);
    var length = keys.length;
    var i = -1;

    while (++i < length) {
      var key = keys[i];
      var value = this._props[key];
      this._propSubject[key].onNext(value || null);
    }
  },

  destroy: function destroy() {
    mountable.emitUnmount(this.node, this._props);
    this._patchSubscription.dispose();

    var children = this._children;
    var length = children.length;
    var i = -1;

    while (++i < length) {
      var child = children[i];
      isFunction(child.destroy) && child.destroy();
    }
  }
};

module.exports = YolkBaseComponent;