const eventHandler = require(`eventHandler`)
const createElement = require(`createElement`)
const render = require(`render`)

function Yolk(){}
Yolk.prototype = {eventHandler, createElement, render}

module.exports = new Yolk
