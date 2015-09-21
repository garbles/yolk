const createEventHandler = require(`./createEventHandler`)
const createElement = require(`./createElement`)
const render = require(`./render`)

function Yolk () {}
Yolk.prototype = {createEventHandler, createElement, render}

module.exports = Object.freeze(new Yolk)
