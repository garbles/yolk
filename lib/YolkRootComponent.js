"use strict";

var create = require("virtual-dom/create-element");
var diff = require("virtual-dom/diff");
var patch = require("virtual-dom/patch");

var PREVIOUS_WIDGET_KEY = "__YOLK_PREVIOUS_WIDGET_KEY";

function YolkRootComponent(child) {
  this._child = child;
}

YolkRootComponent.prototype = {
  name: "YolkRootComponent",
  type: "Widget",

  init: function init() {
    return create(this._child);
  },

  update: function update(previous, node) {
    if (this._child.key !== previous._child.key) {
      return this.init();
    }

    var patches = diff(previous._child, this._child);
    patch(node, patches);
  }
};

YolkRootComponent.render = function render(instance, node) {
  var root = new YolkRootComponent(instance);
  var child = node.children[0];

  if (child) {
    var patches = diff(child[PREVIOUS_WIDGET_KEY], root);
    patch(child, patches);
  } else {
    child = create(root);
    node.appendChild(child);
  }

  child[PREVIOUS_WIDGET_KEY] = root;

  return root;
};

module.exports = YolkRootComponent;