const Rx = require(`rx`)
const createEventHandler = require(`./createEventHandler`)
const createElement = require(`./createElement`)
const render = require(`./render`)

function yolk(){}
yolk.prototype = {Rx, createEventHandler, createElement, render}

module.exports = Object.freeze(new yolk)
