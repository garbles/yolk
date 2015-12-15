'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = registerElement;

var _YolkRootComponent = require('./YolkRootComponent');

var _createElement = require('./createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var _parseDOMNodeAttributes = require('./parseDOMNodeAttributes');

var _parseDOMNodeAttributes2 = _interopRequireDefault(_parseDOMNodeAttributes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INSTANCE_KEY = '__YOLK_INSTANCE_KEY__';

function registerElement(name, Component) {
  var prototype = Object.create(HTMLElement.prototype);

  prototype.createdCallback = function createdCallback() {
    var attrs = (0, _parseDOMNodeAttributes2.default)(this.attributes);
    var instance = (0, _createElement2.default)(Component, attrs);

    this[INSTANCE_KEY] = instance;
  };

  prototype.attachedCallback = function attachedCallback() {
    (0, _YolkRootComponent.render)(this[INSTANCE_KEY], this);
  };

  prototype.detachedCallback = function detachedCallback() {
    this[INSTANCE_KEY].destroy();
  };

  prototype.attributeChangedCallback = function attributeChangedCallback() {
    var attrs = (0, _parseDOMNodeAttributes2.default)(this.attributes);
    var instance = (0, _createElement2.default)(Component, attrs);
    instance.update(this[INSTANCE_KEY]);
    this[INSTANCE_KEY] = instance;
  };

  document.registerElement(name, { prototype: prototype });
}