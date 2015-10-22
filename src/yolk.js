const Rx = require(`rx`)
const delegator = require(`./delegator`)
const createEventHandler = require(`./createEventHandler`)
const createElement = require(`./createElement`)
const YolkRootComponent = require(`./YolkRootComponent`)
const {render} = YolkRootComponent

function Yolk () {}
Yolk.prototype = {Rx, createEventHandler, createElement, render}
Object.freeze(Yolk)

module.exports = new Yolk
