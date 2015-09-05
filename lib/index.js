const Rx = require(`rx`)
const virtualDOM = require(`virtual-dom`)
const eventHandler = require(`eventHandler`)
const createElement = require(`createElement`)
const render = require(`render`)

function Yolk(){}
Yolk.prototype = {Rx, virtualDOM, eventHandler, createElement, render}

module.exports = new Yolk
