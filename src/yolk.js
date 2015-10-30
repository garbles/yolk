require(`document-register-element`)

const Rx = require(`rx`)
const createEventHandler = require(`./createEventHandler`)
const createElement = require(`./createElement`)
const registerElement = require(`./registerElement`)
const YolkRootComponent = require(`./YolkRootComponent`)
const {render} = YolkRootComponent

function Yolk () {}
Yolk.prototype = {Rx, createEventHandler, createElement, registerElement, render}
Object.freeze(Yolk)

module.exports = new Yolk
