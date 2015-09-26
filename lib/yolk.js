const createEventHandler = require(`./createEventHandler`)
const createElement = require(`./createElement`)
const YolkRootComponent = require(`./YolkRootComponent`)
const {render} = YolkRootComponent

function Yolk () {}
Yolk.prototype = {createEventHandler, createElement, render}

module.exports = Object.freeze(new Yolk)
