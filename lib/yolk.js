"use strict";

require("document-register-element");

var Rx = require("rx");
var createElement = require("./createElement");
var registerElement = require("./registerElement");
var YolkRootComponent = require("./YolkRootComponent");
var render = YolkRootComponent.render;

function Yolk() {}
Yolk.prototype = { Rx: Rx, createElement: createElement, registerElement: registerElement, render: render };
Object.freeze(Yolk);

module.exports = new Yolk();