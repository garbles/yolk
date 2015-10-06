"use strict";

var Rx = require("rx");
var createEventHandler = require("./createEventHandler");
var createElement = require("./createElement");
var YolkRootComponent = require("./YolkRootComponent");
var render = YolkRootComponent.render;

function Yolk() {}
Yolk.prototype = { Rx: Rx, createEventHandler: createEventHandler, createElement: createElement, render: render };
Object.freeze(Yolk);

module.exports = new Yolk();