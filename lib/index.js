const Rx = require(`rx`)
const eventHandler = require(`eventHandler`)
const createElement = require(`createElement`)
const render = require(`render`)

function Yolk(){}
Yolk.prototype = {Rx, eventHandler, createElement, render}

module.exports = new Yolk
