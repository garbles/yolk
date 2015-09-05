const Rx = require(`rx`)
const virtualDOM = require(`virtual-dom`)
const createEventHandler = require(`createEventHandler`)
const createElement = require(`createElement`)
const render = require(`render`)

function Yolk(){}
Yolk.prototype = {Rx, virtualDOM, createEventHandler, createElement, render}

module.exports = new Yolk
