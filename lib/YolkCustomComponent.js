"use strict";

var create = require("yolk-virtual-dom/create-element");
var wrapObject = require("./wrapObject");
var addProperties = require("./addProperties");
var YolkBaseComponent = require("./YolkBaseComponent");
var CompositePropSubject = require("./CompositePropSubject");

function YolkCustomComponent() {}

YolkCustomComponent.prototype = {
  type: "Widget",
  onMount: function onMount() {},
  onUpdate: function onUpdate() {},
  onUnmount: function onUnmount() {},

  _initialize: function _initialize(props, children) {
    this._props = props;
    this._props$ = null;

    switch (children.length) {
      case 1:
        this._child = children[0];
        break;
      case 0:
        this._child = new YolkBaseComponent("div");
        break;
      default:
        throw new Error(this.constructor.name + " may not have more than one child");
    }
  },

  init: function init() {
    var _this = this;

    this._props$ = new CompositePropSubject(this._props);

    var node = create(this._child);
    var props$ = wrapObject(this._props$.asSubjectObject());
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
    this._props$ = previous._props$;
    this._props$.onNext(this._props);
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
  addProperties(Component, YolkCustomComponent);
  Component.prototype = Object.create(YolkCustomComponent.prototype);
  addProperties(Component.prototype, obj);

  return Component;
};

module.exports = YolkCustomComponent;