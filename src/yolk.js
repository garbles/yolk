require(`document-register-element`)

const Rx = require(`rx`)
const createElement = require(`./createElement`)
const registerElement = require(`./registerElement`)
const YolkRootComponent = require(`./YolkRootComponent`)
const {render} = YolkRootComponent

function Yolk () {}
Yolk.prototype = {Rx, createElement, registerElement, render}
Object.freeze(Yolk)

module.exports = new Yolk
