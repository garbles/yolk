const Bacon = require(`baconjs`)
const eventHandler = require(`eventHandler`)
const createElement = require(`createElement`)
const render = require(`render`)

function Yolk(){}

Yolk.prototype = {
  ...Yolk.prototype,
  ...{Bacon, eventHandler, createElement, render}
}

module.exports = new Yolk
