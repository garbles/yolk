"use strict";

require("document-register-element");

var Rx = require("rx");
var h = require("./createElement");
var registerElement = require("./registerElement");
var CustomComponent = require("./YolkCustomComponent");
var render = require("./YolkRootComponent").render;

function Yolk() {}
Yolk.prototype = { Rx: Rx, CustomComponent: CustomComponent, h: h, registerElement: registerElement, render: render };
Object.freeze(Yolk);

module.exports = new Yolk();