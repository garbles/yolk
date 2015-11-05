"use strict";

var Rx = require("rx");
var h = require("yolk-virtual-dom/h");
var create = require("yolk-virtual-dom/create-element");
var wrapObject = require("./wrapObject");
var addProperties = require("./addProperties");

function YolkCustomComponent() {}

YolkCustomComponent.prototype = {
  type: "Widget",
  onMount: function onMount() {},
  onUpdate: function onUpdate() {},
  onUnmount: function onUnmount() {},

  _initialize: function _initialize(props, children) {
    this._props = props;
    this._propsSubject$ = null;

    switch (children.length) {
      case 1:
        this._child = children[0];
        break;
      case 0:
        this._child = h("div");
        break;
      default:
        throw new Error(this.constructor.name + " may not have more than one child");
    }
  },

  init: function init() {
    var _this = this;

    this._propsSubject$ = new Rx.BehaviorSubject(this._props);

    var node = create(this._child);
    var props$ = wrapObject(this._propsSubject$);
    var mountDisposable = props$.take(1).subscribe(function (props) {
      return _this.onMount(props, node);
    });
    var updateDisposable = props$.skip(1).subscribe(function (props) {
      return _this.onUpdate(props, node);
    });

    this._onDestroy = function () {
      mountDisposable.dispose();
      updateDisposable.dispose();
    };

    return node;
  },

  update: function update(previous) {
    this._propsSubject$ = previous._propsSubject$;
    this._propsSubject$.onNext(this._props);
  },

  predestroy: function predestroy(node) {
    this.onUnmount(node);
  },

  destroy: function destroy() {
    this._onDestroy && this._onDestroy();
  }
};

YolkCustomComponent._isCustomComponent = true;

YolkCustomComponent.create = function createInstance(props, children) {
  var instance = new this(props, children);
  instance._initialize(props, children);

  return instance;
};

YolkCustomComponent.extend = function extend(obj) {
  function Component() {}
  Component.prototype = Object.create(YolkCustomComponent.prototype);
  addProperties(Component.prototype, obj);

  return Component;
};

module.exports = YolkCustomComponent;