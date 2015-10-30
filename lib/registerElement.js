"use strict";

var YolkRootComponent = require("./YolkRootComponent");
var createElement = require("./createElement");
var parseDOMNodeAttributes = require("./parseDOMNodeAttributes");

var INSTANCE_KEY = "__YOLK_INSTANCE_KEY__";

module.exports = function registerElement(name, Component) {
  var prototype = Object.create(HTMLElement.prototype);

  prototype.createdCallback = function createdCallback() {
    var attrs = parseDOMNodeAttributes(this.attributes);
    var instance = createElement(Component, attrs);

    this[INSTANCE_KEY] = instance;
  };

  prototype.attachedCallback = function attachedCallback() {
    YolkRootComponent.render(this[INSTANCE_KEY], this);
  };

  prototype.detachedCallback = function detachedCallback() {
    this[INSTANCE_KEY].destroy();
  };

  prototype.attributeChangedCallback = function attributeChangedCallback() {
    var attrs = parseDOMNodeAttributes(this.attributes);
    var instance = createElement(Component, attrs);
    instance.update(this[INSTANCE_KEY]);
    this[INSTANCE_KEY] = instance;
  };

  document.registerElement(name, { prototype: prototype });
};