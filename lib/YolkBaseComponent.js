"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Rx = require("rx");
var wrapObject = require("./wrapObject");
var transformProperties = require("./transformProperties");
var isFunction = require("./isFunction");
var flatten = require("./flatten");
var mountable = require("./mountable");
var parseTag = require("./parseTag");
var CompositePropSubject = require("./CompositePropSubject");
var YolkBaseInnerComponent = require("./YolkBaseInnerComponent");

var TAG_IS_ONLY_LETTERS = /^[a-zA-Z]*$/;

function YolkBaseComponent(tag, props, children) {
  var _props = _extends({}, props);
  var _children = children || [];

  if (_props.key) {
    this.key = _props.key.toString();
    delete _props.key;
  }

  this.name = "YolkBaseComponent_" + tag;
  this.id = tag;
  this._props = _props;
  this._children = _children;
}

YolkBaseComponent.prototype = {
  type: "Widget",

  init: function init() {
    this._props$ = new CompositePropSubject(this._props);
    this._children$ = new Rx.BehaviorSubject(this._children);

    var props$ = wrapObject(this._props$.asDistinctObservableObject(), { wrapToJS: true }).map(transformProperties);
    var children$ = this._children$.flatMapLatest(function (c) {
      return wrapObject(c, { wrapToJS: true });
    }).map(flatten);
    var innerComponent = new YolkBaseInnerComponent(this.id);

    this._disposable = props$.combineLatest(children$).subscribe(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2);

      var props = _ref2[0];
      var children = _ref2[1];
      return innerComponent.update(props, children);
    }, function (err) {
      throw err;
    });

    var node = innerComponent.createNode();

    return node;
  },

  postinit: function postinit(node) {
    mountable.emitMount(node, this._props.onMount);
  },

  update: function update(previous) {
    this._props$ = previous._props$;
    this._children$ = previous._children$;
    this._disposable = previous._disposable;

    this._props$.onNext(this._props);
    this._children$.onNext(this._children);
  },

  predestroy: function predestroy(node) {
    mountable.emitUnmount(node, this._props.onUnmount);
  },

  destroy: function destroy() {
    this._disposable.dispose();

    var children = this._children;
    var length = children.length;
    var i = -1;

    while (++i < length) {
      var child = children[i];
      isFunction(child.destroy) && child.destroy();
    }
  }
};

YolkBaseComponent.create = function createInstance(_tag, _props, children) {
  var tag = undefined;
  var props = undefined;

  if (TAG_IS_ONLY_LETTERS.test(_tag)) {
    tag = _tag;
    props = _props;
  } else {
    var parsed = parseTag(_tag);
    tag = parsed.tag;
    props = _extends({}, _props, parsed.classIds);
  }

  return new YolkBaseComponent(tag, props, children);
};

module.exports = YolkBaseComponent;